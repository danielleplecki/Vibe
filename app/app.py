from flask import Flask, jsonify, request, abort, session, Response
from flask_cors import CORS, cross_origin
from base_db import query, delete, insert, update
from datetime import datetime
from visual_data import prepare_data, graph_setup
import user_endpoint
import follows_endpoint
import song_recommendation
import mysql.connector as db
import requests
import json
import time
import get_spotify_data

app = Flask(__name__)
app.secret_key = 'fjoiwefiowjefoiwej'
CORS(app)

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def json_output(output, status_code):
    if type(output) != str:
        output = json.dumps(output, default=str, indent=4)
    return Response(output, status_code, mimetype='application/json')

def user_is_authenticated():
    return 'username' in session

def get_unauthenticated_response():
    return Response("User not authenticated", 403, mimetype='application/json')

@app.route("/login", methods = ['POST'])
def login_user():
    # '''
    # THIS IS FOR DOING OUR OWN LOGIN
    # '''
    # data = request.get_json()
    # try:
    #     successful_login = user_endpoint.login_user(data['username'], data['password'])
    # except KeyError:
    #     return json_output("Endpoint requires 'username' and 'password' in body", 400)
    # if successful_login:
    #     session['username'] = data['username']
    #     return json_output("Successful Login", 200)
    # return json_output("Username or password is incorrect", 403)
    '''
    THIS IS FOR DOING SPOTIFY LOGIN
    '''
    data = request.get_json()
    try:
        access_token = data['accessToken']
    except KeyError:
        return json_output("Endpoint requires 'accessToken' in body", 400)
    result = user_endpoint.spotify_login_user(access_token)
    if result is None:
        return json_output("Invalid access token", 401)
    session['username'] = result['username']
    return json_output(result, 200)


@app.route("/logout", methods = ['POST'])
def logout_user():
    session.pop("username", None)
    return json_output("Successful logout", 200)

@app.route("/code", methods = ['POST'])
def swap_code():
    data = request.get_json()
    token = get_spotify_data.get_token_from_code(data['code'])
    if token is None:
        return json_output("Invalid access code", 401)
    print(token)
    return json_output({"token" : token}, 200)

@app.route("/signup", methods = ['POST'])
def post_user():
    data = request.get_json()
    try:
        result = user_endpoint.post_user(data['username'], data['password'], data['name'])
    except KeyError:
        return json_output("Endpoint requires 'username', 'password', and 'name' in body", 400)
    if result is not None:
        return json_output("Successful Sign-up", 201)
    return json_output("Username already exists", 403)

@app.route("/follows", methods= ['GET', 'POST', 'DELETE'])
def follow():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    if request.method == 'POST':
        data = request.get_json()
        try:
            result = follows_endpoint.follow_user(data['followee'], session['username'])
        except KeyError:
            return json_output("Endpoint requires 'followee' in body", 400)
        if result is not None:
            return json_output("User followed successfully", 201)
        return json_output("User is already followed", 400)
    elif request.method == 'DELETE':
        data = request.get_json()
        try:
            result = follows_endpoint.unfollow_user(data['followee'], session['username'])
        except KeyError:
            return json_output("Endpoint requires 'followee' in body", 400)
        if result:
            return json_output("User unfollowed successfully", 200)
        return json_output("Cannot delete non-existing follow", 400)
    else:
        try:
            following = request.args['following']
            assert following.lower() == 'true' or following.lower() == 'false'
        except (KeyError, AssertionError):
            return json_output("Endpoint requires 'following' query param set to 'true' if following is desired, 'false' if followers is desired", 400)
        if following == 'true':
            results = follows_endpoint.get_people_user_follows(session['username'])
            return json_output(results, 200)
        results = follows_endpoint.get_followers_for_user(session['username'])
        return json_output(results, 200)

@app.route("/notes", methods=['POST'])
def new_notes_handler():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    data = request.get_json()
    try:
        user = session['username']
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        message = data['message']
        type = data['type']
        content_id = data['contentId']
    except KeyError:
        return json_output("Endpoint requires 'message', 'type', and 'contentId' in body", 400)
    stmt = """INSERT into notes(UID, time, message, type, content_id) values
     (%s, %s, %s, %s, %s) """
    vals = (user, timestamp, message, type, content_id)
    created_id = insert(stmt, vals)
    return json_output({"ID" : created_id}, 201)

@app.route("/notes", methods=['GET'])
def get_notes_handler():
    # for now just gets all notes
    # user will be necessary for later
    stmt = """SELECT * FROM notes ORDER BY time DESC"""
    results = query(stmt)
    return json_output(results, 200)

@app.route("/notes/<id>", methods=['DELETE'])
def delete_notes_handler(id):
    stmt = """DELETE FROM notes WHERE ID = %s"""
    vals = (id,)
    rows_deleted = delete(stmt, vals)
    result = "{n} row(s) successfully deleted".format(n=rows_deleted)
    json_output(result, 200)

@app.route("/notes/<id>", methods=['PUT'])
def update_notes_handler(id):
    data = request.get_json()
    message = data['message']
    stmt = """UPDATE notes SET message = %s WHERE ID = %s"""
    vals = (message, id)
    updated_rows = update(stmt, vals)
    return json_output("{n} row(s) successfully updated".format(n=updated_rows), 200)

@app.route("/songs", methods=['GET'])
def search_song_by_name():
    name = request.args.get("name", None)
    if name is None:
        return json_output("Endpoint requres 'name' query parameter\n", 400)
    stmt = """SELECT * FROM songs WHERE name LIKE %s"""
    vals = ("%" + name + "%",)
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/artists", methods=['GET'])
def search_artist_by_name():
    name = request.args.get("name", None)
    if name is None:
        return json_output("Endpoint requres 'name' query parameter\n", 400)
    stmt = """SELECT * FROM artists WHERE name LIKE %s"""
    vals = ("%" + name + "%",)
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/users", methods=['GET'])
def search_users_by_name_or_username():
    name = request.args.get("name", None)
    if name is None:
        return json_output("Endpoint requres 'name' query parameter\n", 400)
    stmt = """SELECT username, name FROM spotifyUsers WHERE name LIKE %s or username LIKE %s"""
    vals = ("%" + name + "%", "%" + name + "%")
    results = query(stmt, vals)
    return json_output(results, 200)

@app.route("/timeline", methods=['GET'])
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
    return json_output(notes, 200)

@app.route("/recommended", methods=['GET'])
def get_recommended_songs():
    if not user_is_authenticated():
        return get_unauthenticated_response()
    result = song_recommendation.get_song_recommendations(session['username'])
    return json_output(result, 200)

@app.route("/graph", methods=['GET'])
def get_graph_vis():
    # should pass session['username]
    res = graph_setup("testuser1")
    return json_output(prepare_data(res[0], res[1]), 200)

if __name__ == "__main__":
    app.run('0.0.0.0')


