from flask import Flask, jsonify, request, abort, session, Response
#from flask.ext.session import Session
from flask_cors import CORS, cross_origin
from base_db import query, delete, insert, update
from datetime import datetime
from visual_data import prepare_data, graph_setup
import user_endpoint
import follows_endpoint
import notes_endpoint
import song_recommendation
import mysql.connector as db
import requests
import json
import time
import get_spotify_data

app = Flask(__name__)
#SESSION_TYPE = 'redis'
app.secret_key = 'fjoiwefiowjefoiwej'
CORS(app)
#Session(app)

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def json_output(output, status_code):
    if type(output) == str:
        output = {"message": output}
    output = json.dumps(output, default=str, indent=4)
    return Response(output, status_code, mimetype='application/json')

def json_error(message, status_code):
    response = {
        'error': {
            'status' : status_code,
            'message' : message
        }
    }
    return json_output(response, status_code)

def user_is_authenticated():
    return 'username' in session

def get_unauthenticated_response():
    return json_error("User not authenticated", 401)

@app.route("/login", methods = ['POST'])
@cross_origin(supports_credentials=True)
def login_user():
    # '''
    # THIS IS FOR DOING OUR OWN LOGIN
    # '''
    # data = request.get_json()
    # try:
    #     successful_login = user_endpoint.login_user(data['username'], data['password'])
    # except KeyError:
    #     return json_error("Endpoint requires 'username' and 'password' in body", 400)
    # if successful_login:
    #     session['username'] = data['username']
    #     return json_output("Successful Login", 200)
    # return json_error("Username or password is incorrect", 401)
    '''
    THIS IS FOR DOING SPOTIFY LOGIN
    '''
    data = request.get_json()
    try:
        access_token = data['accessToken']
    except KeyError:
        return json_error("Endpoint requires 'accessToken' in body", 400)
    result = user_endpoint.spotify_login_user(access_token)
    if result is None:
        return json_error("Invalid access token", 401)
    session['username'] = result['username']
    return json_output(result, 200)


@app.route("/logout", methods = ['POST'])
@cross_origin(supports_credentials=True)
def logout_user():
    session.pop("username", None)
    return json_output("Successful logout", 200)

@app.route("/code", methods = ['POST'])
@cross_origin(supports_credentials=True)
def swap_code():
    data = request.get_json()
    token = get_spotify_data.get_token_from_code(data['code'])
    if token is None:
        return json_error("Invalid access code", 401)
    print(token)
    return json_output({"token" : token}, 200)

@app.route("/signup", methods = ['POST'])
@cross_origin(supports_credentials=True)
def post_user():
    data = request.get_json()
    try:
        result = user_endpoint.post_user(data['username'], data['password'], data['name'])
    except KeyError:
        return json_error("Endpoint requires 'username', 'password', and 'name' in body", 400)
    if result is not None:
        return json_output("Successful Sign-up", 201)
    return json_error("Username already exists", 403)

@app.route("/follows", methods= ['POST', 'DELETE'])
@cross_origin(supports_credentials=True)
def follow_or_unfollow():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    if request.method == 'POST':
        data = request.get_json()
        try:
            result = follows_endpoint.follow_user(data['followee'], session['username'])
        except KeyError:
            return json_error("Endpoint requires 'followee' in body", 400)
        if result is not None:
            return json_output("User followed successfully", 201)
        return json_error("User is already followed", 400)
    elif request.method == 'DELETE':
        data = request.get_json()
        try:
            result = follows_endpoint.unfollow_user(data['followee'], session['username'])
        except KeyError:
            return json_error("Endpoint requires 'followee' in body", 400)
        if result:
            return json_output("User unfollowed successfully", 200)
        return json_error("Cannot delete non-existing follow", 400)

@app.route("/follows/<username>", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_follows(username):
    following = follows_endpoint.get_people_user_follows(username)
    followers = follows_endpoint.get_followers_for_user(username)
    results = {"following" : following, "followers" : followers}
    return json_output(results, 200)

@app.route("/notes", methods=['POST'])
@cross_origin(supports_credentials=True)
def new_notes_handler():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    data = request.get_json()
    try:
        username = session['username']
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        message = data['message']
        type = data['type']
        content_id = data['contentId']
    except KeyError:
        return json_error("Endpoint requires 'message', 'type', and 'contentId' in body", 400)
    created_id = notes_endpoint.post_note(username, timestamp, message, type, content_id)
    return json_output({"ID" : created_id}, 201)

@app.route("/notes/<id>/favorites", methods=['POST'])
@cross_origin(supports_credentials=True)
def favorite_note(id):
    if not user_is_authenticated():
        return get_unauthenticated_response()
    result = notes_endpoint.favorite_note(id, session['username'])
    if result is None:
        return json_error("Note with that ID does not exist or note is already liked by current user", 400)
    return json_output("Successfully favorited note", 201)

@app.route("/notes", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_notes_handler():
    username = request.args.get("username", None)
    notes = notes_endpoint.get_notes(username)
    return json_output(notes, 200)

@app.route("/notes/<id>", methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete_notes_handler(id):
    rows_deleted = notes_endpoint.delete_note(id)
    result = "{n} row(s) successfully deleted".format(n=rows_deleted)
    return json_output(result, 200)

@app.route("/notes/<id>", methods=['PUT'])
@cross_origin(supports_credentials=True)
def update_notes_handler(id):
    data = request.get_json()
    try:
        message = data['message']
    except KeyError:
        return json_error("Endpoint requires 'message' in body", 400)
    updated_rows = notes_endpoint.update_note(id, message)
    return json_output("{n} row(s) successfully updated".format(n=updated_rows), 200)

@app.route("/notifications", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_notifications():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    username = session['username']
    stmt = """SELECT * from notifications WHERE username = %s"""
    vals = (username,)
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/recents/<username>", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_recents(username):
    if not user_is_authenticated():
        return get_unauthenticated_response()
    notes = notes_endpoint.get_notes(username)
    notes = notes[:4]
    return json_output(notes, 200)

@app.route("/songs", methods=['GET'])
@cross_origin(supports_credentials=True)
def search_song_by_name():
    name = request.args.get("name", None)
    if name is None:
        return json_error("Endpoint requres 'name' query parameter\n", 400)
    stmt = """SELECT * FROM songs WHERE name LIKE %s"""
    vals = ("%" + name + "%",)
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/artists", methods=['GET'])
@cross_origin(supports_credentials=True)
def search_artist_by_name():
    name = request.args.get("name", None)
    if name is None:
        return json_error("Endpoint requres 'name' query parameter\n", 400)
    stmt = """SELECT * FROM artists WHERE name LIKE %s"""
    vals = ("%" + name + "%",)
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/users", methods=['GET'])
@cross_origin(supports_credentials=True)
def search_users_by_name_or_username():
    name = request.args.get("name", None)
    if name is None:
        return json_error("Endpoint requres 'name' query parameter\n", 400)
    stmt = """SELECT * FROM spotifyUsers WHERE name LIKE %s or username LIKE %s"""
    vals = ("%" + name + "%", "%" + name + "%")
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/users/<username>", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_user(username):
    user = username
    stmt = """SELECT * from spotifyUsers WHERE username = %s"""
    vals = (user,)
    user = query(stmt, vals)[0]
    stmt = """SELECT count(*) as num_followers from follows where followee = %s"""
    num_followers = query(stmt, vals)[0]
    stmt = """SELECT count(*) as num_following from follows where follower = %s"""
    num_following = query(stmt, vals)[0]
    stmt = """SELECT count(*) as num_notes from notes where UID = %s"""
    num_notes = query(stmt, vals)[0]
    user.update(num_followers)
    user.update(num_following)
    user.update(num_notes)
    return json_output(user, 200)

@app.route("/me", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_current_user():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    user = session['username']
    stmt = """SELECT * from spotifyUsers WHERE username = %s"""
    vals = (user,)
    user = query(stmt, vals)[0]
    stmt = """SELECT count(*) as num_followers from follows where followee = %s"""
    num_followers = query(stmt, vals)[0]
    stmt = """SELECT count(*) as num_following from follows where follower = %s"""
    num_following = query(stmt, vals)[0]
    stmt = """SELECT count(*) as num_notes from notes where UID = %s"""
    num_notes = query(stmt, vals)[0]
    user.update(num_followers)
    user.update(num_following)
    user.update(num_notes)
    return json_output(user, 200)


@app.route("/timeline", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_timeline():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    user = session['username']
    stmt = """
            (SELECT * from notes, artists
                WHERE type = 'artist' AND notes.content_id = artists.spotify_id
                AND UID in (SELECT followee from follows WHERE follower = %s UNION SELECT %s)
                ORDER BY time DESC)
            """
    vals = (user, user)
    notes = query(stmt, vals)
    stmt = """
            (SELECT * from notes, songs
                WHERE type = 'song' AND notes.content_id = songs.spotify_id
                AND UID in (SELECT followee from follows where follower = %s UNION SELECT %s)
                ORDER BY time DESC)
            """
    song_notes = query(stmt, vals)
    notes.extend(song_notes)
    notes = sorted(notes, key=lambda note: note['time'], reverse=True)
    return json_output(notes, 200)

@app.route("/recommended", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_recommended_songs():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    result = song_recommendation.get_song_recommendations(session['username'])
    return json_output(result, 200)

@app.route("/graph", methods=['GET'])
@cross_origin(supports_credentials=True)
def get_graph_vis():
    res = graph_setup(session['username'])
    return json_output(prepare_data(res[0], res[1]), 200)

if __name__ == "__main__":
    app.run('0.0.0.0')
