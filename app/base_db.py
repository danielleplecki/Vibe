import mysql.connector as db


def get_conn_and_cursor():
    conn = db.connect(user='root', password='', database='vibe')
    cursor = conn.cursor()
    return conn, cursor

def close_conn_and_cursor(conn, cursor):
    conn.close()
    cursor.close()

def query(stmt, vals=()):
    conn, cursor = get_conn_and_cursor()
    cursor.execute(stmt, vals)
    results = []
    for row in cursor.fetchall():
        results.append({cursor.description[i][0] : value for i, value in enumerate(row)})
    close_conn_and_cursor(conn, cursor)
    return results

def delete(stmt, vals=()):
    conn, cursor = get_conn_and_cursor()
    cursor.execute(stmt, vals)
    conn.commit()
    rows_changed = cursor.rowcount
    close_conn_and_cursor(conn, cursor)
    return rows_changed

def update(stmt, vals=()):
    conn, cursor = get_conn_and_cursor()
    cursor.execute(stmt, vals)
    conn.commit()
    rows_updated = cursor.rowcount
    close_conn_and_cursor(conn, cursor)
    return rows_updated

def insert(stmt, vals=()):
    conn, cursor = get_conn_and_cursor()
    cursor.execute(stmt, vals)
    conn.commit()
    row_id = cursor.lastrowid
    close_conn_and_cursor(conn, cursor)
    return row_id
