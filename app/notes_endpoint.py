import base_db

def post_note(username, timestamp, message, type, content_id):
    stmt = """INSERT into notes(UID, time, message, type, content_id) values
     (%s, %s, %s, %s, %s) """
    vals = (username, timestamp, message, type, content_id)
    created_id = base_db.insert(stmt, vals)
    return created_id

def favorite_note(note_id, liker):
    stmt = """INSERT into noteFavorites (note_id, liker) VALUES (%s, %s)"""
    vals = (note_id, liker)
    result = base_db.insert(stmt, vals)
    favorite_song_from_note(note_id, liker)
    favorite_artist_from_note(note_id, liker)
    return result

def favorite_song_from_note(note_id, liker):
    stmt = """INSERT INTO songFavorites (username, song_spotify_id) VALUES
                (%s, (SELECT spotify_id from songs,notes WHERE content_id = spotify_id AND notes.ID = %s))"""
    vals = (liker, note_id)
    result = base_db.insert(stmt, vals)
    return result

def favorite_artist_from_note(note_id, liker):
    stmt = """INSERT INTO artistFollows (follower, artist_spotify_id) VALUES
                (%s, (SELECT spotify_id from artists,notes WHERE content_id = spotify_id AND notes.ID = %s))"""
    vals = (liker, note_id)
    result = base_db.insert(stmt, vals)
    return result


def update_note(id, message):
    stmt = """UPDATE notes SET message = %s WHERE ID = %s"""
    vals = (message, id)
    updated_rows = base_db.update(stmt, vals)
    return updated_rows

def delete_note(id):
    delete_note_favorites(id)
    stmt = """DELETE FROM notes WHERE ID = %s"""
    vals = (id,)
    rows_deleted = base_db.delete(stmt, vals)
    return rows_deleted

def delete_note_favorites(id, liker=None):
    stmt = None
    vals = ()
    if liker is None:
        vals = (id,)
        stmt = """DELETE FROM noteFavorites WHERE note_id = %s"""
    else:
        vals = (id, liker)
        stmt = """DELETE FROM noteFavorites WHERE note_id = %s and liker = %s"""
    rows_deleted = base_db.delete(stmt, vals)
    return rows_deleted


def get_notes(username):
    if username is None:
        stmt = """
                (SELECT * from notes, artists
                    WHERE type = 'artist' AND notes.content_id = artists.spotify_id
                    ORDER BY time DESC)
                """
        notes = base_db.query(stmt)
        stmt = """
                (SELECT * from notes, songs
                    WHERE type = 'song' AND notes.content_id = songs.spotify_id
                    ORDER BY time DESC)
                """
        song_notes = base_db.query(stmt)
        notes.extend(song_notes)
        return notes
    else:
        stmt = """
                (SELECT * from notes, artists
                    WHERE type = 'artist' AND notes.content_id = artists.spotify_id AND UID = %s
                    ORDER BY time DESC)
                """
        vals = (username,)
        notes = base_db.query(stmt, vals)
        stmt = """
                (SELECT * from notes, songs
                    WHERE type = 'song' AND notes.content_id = songs.spotify_id AND UID = %s
                    ORDER BY time DESC)
                """
        song_notes = base_db.query(stmt, vals)
        notes.extend(song_notes)
        return notes