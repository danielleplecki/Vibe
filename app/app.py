from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin
from base_db import query, delete, insert, update
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
    stmt = """SELECT * FROM songtest"""
    result = query(stmt)
    return json_output(result)

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


