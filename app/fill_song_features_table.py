import mysql.connector as db

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def fill_song_features_table():
    
    sql = """INSERT INTO songs (
    duration_ms, preview_url, track_key, modality, time_signature,
    acousticness, danceability, energy, instrumentalness,
    liveness, loudness, speechiness, valence, tempo, ID, uri
    ) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

    for track in tracks:
	duration_ms = track[


	name = track['name']
	artist = track['artists']['name']
	album_name = track['album']['name']	

    val = (ID, name, artist, album_name)
    cursor.execute(sql, val)

    
if __name__ == '__main__':
 
