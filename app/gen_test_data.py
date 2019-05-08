import mysql.connector as db
import names
from datetime import datetime
import random

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()
img_url = "https://upload.wikimedia.org/wikipedia/commons/1/1e/Default-avatar.jpg"
random.seed(12349)

def gen_data():

    for i in range(100):
        n = names.get_full_name()
        un = n.lower().replace(' ', '')
        q = "INSERT INTO spotifyUsers VALUES ('{}', '{}', '{}', '{}')".format(\
            un, n, img_url, datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

        cursor.execute(q)
        conn.commit()
    
    conn.close()
    cursor.close()

gen_data()
    

        
    





    

