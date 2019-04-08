from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin
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

@app.route("/")
def hello():
    cursor.execute("SELECT * FROM songtest")
    r = cursor.fetchall()
    print (r)
    output = {}
    for entry in r:
        output["id"] = entry[0]
        output["name"] = entry[1]
    return json.dumps(output)

@app.route("/notes", methods=['POST'])
def new_notes_handler():
    try:
        post_id = "test"
        user_id = request.form['UID']
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        message = request.form['message']
        cursor.execute("""
        INSERT into notes(ID, UID, time, message) values
        (%s, %s, %s, %s)
        """, (post_id, user_id, timestamp, message))
        conn.commit()
        return successReturn()
    except ValueError:
        abort(400, 'Error reading from post data')

@app.route("/notes/<user>", methods=['GET'])
def get_notes_handler(user):
    # for now just gets all notes
    # user will be necessary for later
    cursor.execute("""
    SELECT * FROM notes
    ORDER BY time DESC
    """)
    r = cursor.fetchall()
    output = []
    for entry in r:
        post_info = {}
        post_info['ID'] = entry[0]
        post_info['UID'] = entry[1]
        post_info['time'] = entry[2]
        post_info['message'] = entry[3]
        output.append(post_info)
    return json.dumps(output)

if __name__ == "__main__":
    app.run('0.0.0.0')


