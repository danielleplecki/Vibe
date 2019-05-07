from base_db import query

# recurse once on your follower

USER_TYPE = 0
SONG_TYPE = 1
ARTIST_TYPE = 2

def prepare_data(node_data, edge_data):
    output = {}
    output["nodes"] = node_data
    output["links"] = edge_data
    print(output)
    return output

def graph_setup(username):
    node_data = []
    edge_data = []
    return gen_data(username, node_data, edge_data, layers=True)

def gen_data(username, node_data, edge_data, layers=False):
    user_data = query(userQuery(username), with_description=False)
    artist_data = query(artistQuery(username), with_description=False)
    song_data = query(songQuery(username), with_description=False)

    for u in user_data:
        if layers:
            add_node(node_data, u[0], USER_TYPE, u[2])
        add_node(node_data, u[1], USER_TYPE, u[2])
        add_edge(edge_data, u[0], u[1], USER_TYPE)

    for a in artist_data:
        add_node(node_data, a[0], ARTIST_TYPE, a[1])
        add_edge(edge_data, username, a[0], ARTIST_TYPE)

    for s in song_data:
        add_node(node_data, s[0], SONG_TYPE, s[1])
        add_edge(edge_data, username, s[0], SONG_TYPE)

    if layers:
        for u in user_data:
            gen_data(u[1], node_data, edge_data)

    return (node_data, edge_data)


def add_node(node_data, name, ntype, img):
    node = {}
    node["id"] = name
    node["name"] = name
    node["svg"] = img
    node_data.append(node)

def add_edge(edge_data, source, target, ntype):
    edge = {}
    edge["source"] = source
    edge["target"] = target
    edge["color"] = gen_color(ntype)
    edge_data.append(edge)

def gen_color(ntype):
    if ntype == USER_TYPE:
        return "red"
    elif ntype == ARTIST_TYPE:
        return "green"
    else:
        return "blue"

def userQuery(username):
    return "SELECT username, followee, image FROM spotifyUsers, follows\
    WHERE username='"+username+"' AND username=follower"

def artistQuery(username):
    return "SELECT artists.name, artists.image_url FROM artists, artistFollows\
    WHERE artists.spotify_id = artistFollows.artist_spotify_id\
    AND artistFollows.follower='"+username+"'"

def songQuery(username):
    return "SELECT songs.name, songs.image_url FROM songs, songFavorites\
    WHERE songs.spotify_id=songFavorites.song_spotify_id\
    AND songFavorites.username='"+username+"'"

