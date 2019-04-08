import mysql.connector as db

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def make_songs_tables():

    create_songs_table_sql = """
    CREATE TABLE if not exists songs(
    spotify_id varchar(255) PRIMARY KEY,
    name varchar(255),
    artist varchar(255),
    album_name varchar(255)
    )
    """

    create_song_features_sql = """
    CREATE TABLE if not exists songFeatures(
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
    uri varchar(255),
    spotify_id varchar(255),
    PRIMARY KEY (spotify_id),
    FOREIGN KEY (spotify_id) references songs(spotify_id)
    )"""

    cursor.execute(create_songs_table_sql)
    cursor.execute(create_song_features_sql)

def make_notes_table():

    create_notes_table_sql = """
    CREATE TABLE if not exists notes(
    ID int NOT NULL AUTO_INCREMENT,
    UID varchar(255),
    time DATETIME,
    message varchar(255),
    PRIMARY KEY (ID)
    )"""

    cursor.execute(create_notes_table_sql)

if __name__ == '__main__':
    make_songs_tables()
    make_notes_table()
