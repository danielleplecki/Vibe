from flask import Flask
from flask_cors import CORS, cross_origin
import mysql.connector as db
import json

app = Flask(__name__)
CORS(app)

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

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

if __name__ == "__main__":
    app.run('0.0.0.0')


