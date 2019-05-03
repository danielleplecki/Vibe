import base_db

def follow_user(followee, follower):
    sql = "INSERT into follows (followee, follower) VALUES (%s, %s)"
    vals = (followee, follower)
    result = base_db.insert(sql, vals)
    return result

def unfollow_user(followee, follower):
    sql = "DELETE from follows WHERE followee = %s and follower = %s"
    vals = (followee, follower)
    result = base_db.delete(sql, vals)
    return result

def get_people_user_follows(user):
    sql = "SELECT followee AS username, name from follows, users where follower = %s AND users.username = followee"
    vals = (user,)
    return base_db.query(sql, vals)

def get_followers_for_user(user):
    sql = "SELECT follower AS username, name from follows, users where followee = %s AND users.username = follower"
    vals = (user,)
    return base_db.query(sql, vals)