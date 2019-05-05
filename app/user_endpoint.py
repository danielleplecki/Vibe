import base_db
from get_spotify_data import get_user
import bcrypt
import logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logging.basicConfig()

DEFAULT_USER_IMAGE = "https://s3-us-west-2.amazonaws.com/vibe-411-dev/default-person.jpg"

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

def spotify_login_user(access_token):
    user = get_user(access_token)
    logger.info("Got data for user from spotify: {}".format(user))
    try:
        username = user['id']
        name = user['display_name']
    except KeyError:
        return None
    sql = """SELECT * from spotifyUsers where username = %s"""
    vals = (username,)
    result = base_db.query(sql, vals)
    if len(result) > 0:
        return result[0]
    sql = """INSERT into spotifyUsers (username, name, image) values (%s, %s, %s)"""
    image_url = DEFAULT_USER_IMAGE
    if len(user['images']) > 0:
        image_url = user['images'][0]['url']
    vals = (username, name, image_url)
    base_db.insert(sql, vals)
    return {'username': username, 'name': name, 'image': image_url}
