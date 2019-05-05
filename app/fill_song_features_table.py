import mysql.connector as db
from base_db import query
from get_spotify_data import get_auth_token, get_song_features
import time

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def fill_song_features_table():

    stmt = """SELECT * from songs where spotify_id not in (SELECT spotify_id from songFeatures)"""
    all_songs = query(stmt)
    auth_token = get_auth_token()
    sql = """INSERT INTO songFeatures (
    duration_ms, track_key, modality, time_signature,
    acousticness, danceability, energy, instrumentalness,
    liveness, loudness, speechiness, valence, tempo, spotify_id, uri
    )
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON DUPLICATE KEY UPDATE uri=uri"""
    for song in all_songs:
        features = get_song_features(auth_token, song['spotify_id'])
        duration_ms = features['duration_ms']
        track_key = features['key']
        modality = features['mode']
        time_signature = features['time_signature']
        acousticness = features['acousticness']
        danceability = features['danceability']
        energy = features['energy']
        instrumentalness = features['instrumentalness']
        liveness = features['liveness']
        loudness = features['loudness']
        speechiness = features['speechiness']
        valence = features['valence']
        tempo = features['tempo']
        ID = features['id']
        uri = features['uri']

        val = (duration_ms, track_key, modality, time_signature, acousticness,
    danceability, energy, instrumentalness, liveness, loudness, speechiness,
    valence, tempo, ID, uri)
        print("ADDING features for id {}".format(ID))
        cursor.execute(sql, val)
        conn.commit()

if __name__ == '__main__':
    fill_song_features_table()
