import mysql.connector as db
from get_spotify_data import get_auth_token, search_for_one_song

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def fill_songs_table():

    sql = "INSERT INTO songs (id, name, artist, album) VALUES (%s, %s, %s, %s)"
    auth_token = get_auth_token()
    tracks = [
    'middle child'
    ]
    for track_name in tracks:
        track = search_for_one_song(track_name)
        ID = track['id']
        name = track['name']
        artist = track['artists']['name']
        album_name = track['album']['name']

        val = (ID, name, artist, album_name)
        cursor.execute(sql, val)
        
if __name__ == '__main__':
    fill_songs_table()