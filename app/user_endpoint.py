import base_db
import bcrypt

def post_user(username, password, name):
    hash_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    sql = """INSERT INTO users (username, password, name) values (%s, %s, %s)"""
    vals = (username, hash_pw, name)
    result = base_db.insert(sql, vals)
    return result

def login_user(username, password):
    sql = """SELECT password from users where username = %s"""
    results = base_db.query(sql, (username,), with_description=False)
    if results == []:
        return False
    hash_pw = results[0]
    return bcrypt.checkpw(password.encode('utf-8'), hash_pw.encode('utf-8'))