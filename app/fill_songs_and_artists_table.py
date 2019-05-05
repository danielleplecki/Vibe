import mysql.connector as db
import csv
import time
from get_spotify_data import get_auth_token, search_for_track_by_artist, search_for_one_artist, TooManyRequestsException


conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def get_tracks_and_artists_from_data_set():
    data_rows = []
    with open('data/songdata.csv') as f:
        reader = csv.reader(f)
        data_rows.extend([row for row in reader])
    artists = []
    tracks = []
    for row in data_rows[1:]:
        artists.append(row[0])
        tracks.append(row[1])
    return tracks, artists

def fill_songs_and_artists_table():
    auth_token = get_auth_token()
    tracks, artists = get_tracks_and_artists_from_data_set()
    tracks = tracks[51276:]
    artists = artists[51276:]
    song_sql = "INSERT INTO songs (spotify_id, name, artist, album_name) VALUES (%s, %s, %s, %s) on duplicate key update name=name"
    artist_sql = "INSERT INTO artists (spotify_id, name) VALUES (%s, %s) on duplicate key update name=name"
    for track_name, artist_name in zip(tracks, artists):
        try:
            track = search_for_track_by_artist(auth_token, track_name, artist_name)
        except TooManyRequestsException:
            print("Too many requests")
            exit(1)
        if track is None:
            print("SKIPPING song {}".format(track_name))
            continue
        song_id = track['id']
        name = track['name']
        artist = track['artists'][0]['name']
        album_name = track['album']['name']
        val = (song_id, name, artist, album_name)
        print("ADDING song {}".format(track_name))
        cursor.execute(song_sql, val)
        conn.commit()

        try:
            artist = search_for_one_artist(auth_token, artist_name)
        except TooManyRequestsException:
            print("Too many requests")
            exit(1)
        if artist is None:
            print("SKIPPING artist {}".format(artist_name))
            continue
        artist_id = artist['id']
        name = artist['name']
        val = (artist_id, name)
        print("ADDING artist {}".format(artist_name))
        cursor.execute(artist_sql, val)
        conn.commit()



if __name__ == '__main__':
    fill_songs_and_artists_table()