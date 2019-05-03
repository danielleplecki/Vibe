from flask import Flask, jsonify, request, abort, session, Response
from flask_cors import CORS, cross_origin
from base_db import query, delete, insert, update
from datetime import datetime
import user_endpoint
import mysql.connector as db
import json
import time

app = Flask(__name__)
app.secret_key = 'fjoiwefiowjefoiwej'
CORS(app)

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def successReturn():
    return jsonify({"success": True})

def json_output(output, status_code):
    if type(output) != str:
        outout = json.dumps(output, default=str, indent=4)
    return Response(output, status_code, mimetype='application/json')

@app.route("/login", methods = ['POST'])
def login_user():
    data = request.get_json()
    successful_login = user_endpoint.login_user(data['username'], data['password'])
    if successful_login:
        session['username'] = data['username']
        return json_output("Successful Login", 200)
    return json_output("Username or password is incorrect", 403)

@app.route("/logout", methods = ['POST'])
def logout_user():
    session.pop("username", None)
    return json_output("Successful logout", 200)

@app.route("/signup", methods = ['POST'])
def post_user():
    data = request.get_json()
    result = user_endpoint.post_user(data['username'], data['password'], data['name'])
    if result is not None:
        return json_output("Successful Sign-up", 201)
    return json_output("Username already exists", 403)


@app.route("/notes", methods=['POST'])
def new_notes_handler():
    data = request.get_json()
    user_id = data['UID']
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    message = data['message']
    stmt = """INSERT into notes(UID, time, message) values
     (%s, %s, %s) """
    vals = (user_id, timestamp, message)
    created_id = insert(stmt, vals)
    return json_output({"ID" : created_id})

@app.route("/notes/<user>", methods=['GET'])
def get_notes_handler(user):
    # for now just gets all notes
    # user will be necessary for later
    stmt = """SELECT * FROM notes ORDER BY time DESC"""
    results = query(stmt)
    return json_output(results)

@app.route("/notes/<id>", methods=['DELETE'])
def delete_notes_handler(id):
    stmt = """DELETE FROM notes WHERE ID = %s"""
    vals = (id,)
    rows_deleted = delete(stmt, vals)
    return "{n} row(s) successfully deleted".format(n=rows_deleted)


@app.route("/songs", methods=['GET'])
def get_all_songs():
    stmt = """SELECT * FROM songs"""
    results = query(stmt)
    return json_output(results)

@app.route("/notes/<id>", methods=['PUT'])
def update_notes_handler(id):
    data = request.get_json()
    message = data['message']
    stmt = """UPDATE notes SET message = %s WHERE ID = %s"""
    vals = (message, id)
    updated_rows = update(stmt, vals)
    return json_output("{n} row(s) successfully updated".format(n=updated_rows))

@app.route("/songs/<name>", methods=['GET'])
def get_song_by_name(name):
    stmt = """SELECT * FROM songs WHERE name = %s"""
    vals = (name,)
    results = query(stmt, vals)
    return json_output(results)

if __name__ == "__main__":
    app.run('0.0.0.0')


