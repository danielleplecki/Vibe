from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin
from base_db import query, delete, insert
from datetime import datetime
import mysql.connector as db
import json
import time

app = Flask(__name__)
CORS(app)

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def successReturn():
    return jsonify({"success": True})

def json_output(output):
    return json.dumps(output, default=str, indent=4)

@app.route("/")
def hello():
    cursor.execute("SELECT * FROM songtest")
    r = cursor.fetchall()
    print (r)
    output = {}
    for entry in r:
        output["id"] = entry[0]
        output["name"] = entry[1]
    return json_output(output)

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

@app.route("/songs/<name>", methods=['GET'])
def get_song_by_name(name):
    stmt = """SELECT * FROM songs WHERE name = %s"""
    vals = (name,)
    results = query(stmt, vals)
    return json_output(results)

if __name__ == "__main__":
    app.run('0.0.0.0')


