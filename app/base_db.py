import mysql.connector as db
conn = db.connect(user='root', password='', database='vibe')
cursor = conn.cursor()

def query(stmt, vals=()):
    cursor.execute(stmt, vals)
    results = []
    for row in cursor.fetchall():
        results.append({cursor.description[i][0] : value for i, value in enumerate(row)})
    return results

def delete(stmt, vals=()):
    cursor.execute(stmt, vals)
    conn.commit()
    return cursor.rowcount

def insert(stmt, vals=()):
    cursor.execute(stmt, vals)
    conn.commit()
    return cursor.lastrowid
