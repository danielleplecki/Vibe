from base_db import query

USER_TYPE = 0
SONG_TYPE = 1
ARTIST_TYPE = 2

def prepare_data():
    output = {}
    node_data = init_node_data()
    edge_data = populate_edge_data()
    output["nodes"] = node_data
    output["links"] = edge_data
    print(output)
    return output

def init_node_data():
    data = []
    users = query("SELECT * FROM users")
    artists = query("SELECT * FROM artists")
    songs = query("SELECT * FROM songs")

    for u in users:
        # 1 index is username in users table
        add_node(data, u[1], USER_TYPE)
    for a in artists:
        # 1 index is name in our artists table
        add_node(data, a[1], ARTIST_TYPE)
    for s in songs:
        # 1 index is name in our songs table
        add_node(data, s[1], SONG_TYPE)
    
    return data

def populate_edge_data():
    data = []
    user_following = query("SELECT * FROM userFollowing")
    artist_following = query("SELECT * FROM artistFollowing")
    song_faves = query("SELECT * FROM songFavorites")

    for uf in user_following:
        add_edge(data, uf[1], uf[0], USER_TYPE)
    for af in artist_following:
        # Need artist following table?
        add_edge(data, af[0], af[1], ARTIST_TYPE)
    for sf in song_faves:
        # song name needs to be added, assuming index for now
        add_edge(data, sf[0], sf[2], SONG_TYPE)
    
    return data

def add_node(node_data, name, ntype):
    node = {}
    node["id"] = name
    node["color"] = gen_color(ntype)
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
    elif ntype == "green":
        return "green"
    else:
        return "blue"
