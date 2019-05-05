import mysql.connector as db

conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def make_songs_tables():

    create_songs_table_sql = """
    CREATE TABLE if not exists songs(
    spotify_id varchar(255) PRIMARY KEY,
    name varchar(255),
    artist varchar(255),
    album_name varchar(255),
    image_url varchar(255)
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
    PRIMARY KEY (ID),
    FOREIGN KEY (UID) references users(username)
    )"""

    cursor.execute(create_notes_table_sql)

def make_artists_table():
    create_artists_table_sql = """
    CREATE TABLE if not exists artists(
    spotify_id varchar(255) PRIMARY KEY,
    name varchar(255),
    image_url varchar(255)
    )
    """
    cursor.execute(create_artists_table_sql)

def make_song_favorites_table():
    create_song_favs_sql = """
    CREATE TABLE if not exists songFavorites(
        username varchar(255),
        song_spotify_id varchar(255),
        PRIMARY KEY (username, song_spotify_id),
        FOREIGN KEY (username) references users(username),
        FOREIGN KEY (song_spotify_id) references songs(spotify_id)
    )
    """
    cursor.execute(create_song_favs_sql)

def make_users_table():
    create_user_sql = """
    CREATE TABLE if not exists users(
        username varchar(255) PRIMARY KEY,
        name varchar(255),
        password varchar(255)
    )
    """
    cursor.execute(create_user_sql)

def make_features_table():
    sql = """
    CREATE TABLE if not exists features(
        song_spotify_id varchar(255),
        artist_spotify_id varchar(255),
        PRIMARY KEY (song_spotify_id, artist_spotify_id),
        FOREIGN KEY (song_spotify_id) references songs(spotify_id),
        FOREIGN KEY (artist_spotify_id) references artists(spotify_id)
    )
    """
    cursor.execute(sql)

def make_follows_table():
    sql = """
    CREATE TABLE if not exists follows(
        followee varchar(255),
        follower varchar(255),
        PRIMARY KEY (followee, follower),
        FOREIGN KEY (followee) references users(username),
        FOREIGN KEY (follower) references users(username)
    )
    """
    cursor.execute(sql)

def make_spotify_users_table():
    sql = """
    CREATE TABLE if not exists spotifyUsers(
        username varchar(255) PRIMARY KEY,
        name varchar(255),
        image varchar(255),
        time_joined datetime
    )
    """
    cursor.execute(sql)

def make_artist_follows_table():
    sql = """
    CREATE TABLE if not exists artistFollows(
        artist_spotify_id varchar(255),
        follower varchar(255),
        PRIMARY KEY (artist_spotify_id, follower),
        FOREIGN KEY (artist_spotify_id) references artists(spotify_id),
        FOREIGN KEY (follower) references users(username)
    )"""
    cursor.execute(sql)

if __name__ == '__main__':
    make_users_table()
    make_songs_tables()
    make_notes_table()
    make_artists_table()
    make_song_favorites_table()
    make_follows_table()
    make_features_table()
    make_spotify_users_table()
    make_artist_follows_table()
