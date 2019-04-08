import mysql.connector as db

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def fill_songs_table():
    
    sql = "INSERT INTO songs (id, name, artist, album) VALUES (%s, %s, %s, %s)"

    for track in tracks:
	ID = track['id']
	name = track['name']
	artist = track['artists']['name']
	album_name = track['album']['name']	

    val = (ID, name, artist, album_name)
    cursor.execute(sql, val)

    
if __name__ == '__main__':
 
