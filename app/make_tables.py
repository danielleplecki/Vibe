import mysql.connector as db

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def make_songs_tables():
    
    create_songs_table_sql = """ 
    CREATE TABLE songs( 
    ID varchar(255),
    name varchar(255), 
    artist varchar(255),
    album_name varchar(255)
    )
    """
    
    create_song_features_sql = """
    CREATE TABLE songFeatures(
    duration_ms int,
    preview_url varchar(255),
    track_key int,
    modality int,
    time_signature int,
    acousticness float,
    danceability float,
    energy float,
    instrumentalness float,
    liveness float,
    loudness float,
    speechiness float,
    valence float,
    tempo float,
    ID varchar(255),
    uri varchar(255)
    )"""
    
    cursor.execute(create_songs_table_sql)
    cursor.execute(create_song_features_sql)

def make_notes_table():

    create_notes_table_sql = """
    CREATE TABLE notes(
    ID varchar(255),
    UID varchar(255),
    time DATETIME,
    message varchar(255)
    )"""

    cursor.execute(create_notes_table_sql)
   
 
if __name__ == '__main__':
    make_songs_tables()
