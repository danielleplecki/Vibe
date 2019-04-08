import mysql.connector as db

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def fill_song_features_table():
    
    sql = """INSERT INTO songs (
    duration_ms, track_key, modality, time_signature,
    acousticness, danceability, energy, instrumentalness,
    liveness, loudness, speechiness, valence, tempo, ID, uri
    ) 
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""

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
    cursor.execute(sql, val)

    
if __name__ == '__main__':
 
