from scipy.spatial import KDTree
from collections import OrderedDict
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
import base_db

NUM_RECOMMENDATIONS_PER_CLUSTER = 5
NUM_CLUSTERS = 5

def get_favorite_song_ids_and_features_for_user(user):
    sql = """SELECT spotify_id, duration_ms, track_key, modality, time_signature, acousticness,
            danceability, energy, instrumentalness, liveness, loudness, speechiness,
            valence, tempo
            FROM songFeatures
            WHERE spotify_id
            IN
            (SELECT song_spotify_id FROM songFavorites WHERE username = %s)"""
    full_results = base_db.query(sql, (user,), with_description=False)
    song_ids = [result[0] for result in full_results]
    song_features = [result[1:] for result in full_results]
    return song_ids, song_features

def get_song_ids_and_feature_data():
    sql = """SELECT spotify_id, duration_ms, track_key, modality, time_signature, acousticness,
                        danceability, energy, instrumentalness, liveness, loudness, speechiness,
                        valence, tempo
                        FROM songFeatures"""
    full_results = base_db.query(sql, with_description=False)
    song_ids = [result[0] for result in full_results]
    song_features = [result[1:] for result in full_results]
    return song_ids, song_features

def cluster_favorite_songs(song_features, num_clusters):
    # kmeans = KMeans(n_clusters=num_clusters, random_state=None)
    # kmeans.fit(song_features)
    # return kmeans
    max_score = 0
    best_k = -1
    for k in range(int(len(song_features)/2),len(song_features)):
        kmeans = KMeans(n_clusters=k)
        kmeans.fit(song_features)
        labels = kmeans.labels_
        score = silhouette_score(song_features, labels)
        if score > max_score:
            max_score = score
            best_k = k
    kmeans = KMeans(n_clusters=best_k)
    kmeans.fit(song_features)
    return kmeans

def build_song_kd_tree(data):
    return KDTree(data)

def scale_song_feature_data(song_feats, fav_feats):
    scaler = StandardScaler()
    scaler.fit(song_feats)
    new_song_feats = scaler.transform(song_feats)
    new_fav_feats = scaler.transform(fav_feats)
    return new_song_feats, new_fav_feats

def get_songs_from_ids(ids):
    sql_ids = '(' + ','.join(["'" + id + "'" for id in ids]) + ')'
    sql = """SELECT * from songs where spotify_id in %s""" % sql_ids
    return base_db.query(sql)

def print_results(favorite_songs, rec_songs, favorite_label_dict, rec_label_dict):
    favorites_included_dict = { label : [] for label in favorite_label_dict.values()}
    rec_songs_dict = { label : [] for label in rec_label_dict.values()}
    for song in favorite_songs:
        label = favorite_label_dict[song['spotify_id']]
        favorites_included_dict[label].append(song)
    for song in rec_songs:
        label = rec_label_dict[song['spotify_id']]
        rec_songs_dict[label].append(song)
    print("--- RECOMMENDATION RESULTS ---")
    for label in favorites_included_dict:
        print("CLUSTER # {}:".format(label))
        print("FAVORITES INCLUDED:")
        for song in favorites_included_dict[label]:
            print(song)
        print()
        print("RECOMMENDED SONGS:")
        for song in rec_songs_dict[label]:
            print(song)
        print()


def get_song_recommendations(user):
    song_ids, song_features = get_song_ids_and_feature_data()
    favorite_ids, favorite_song_features = get_favorite_song_ids_and_features_for_user(user)

    song_features, favorite_song_features = scale_song_feature_data(song_features, favorite_song_features)
    kmeans_results = cluster_favorite_songs(favorite_song_features, NUM_CLUSTERS)
    cluster_centers = kmeans_results.cluster_centers_
    favorite_label_dict = {}
    for id, label in zip(favorite_ids, kmeans_results.labels_):
        favorite_label_dict[id] = label

    kd_tree = build_song_kd_tree(song_features)
    recommendation_indexes = []
    label_dict = {}
    for label, cluster_center in enumerate(cluster_centers):
        distances, indexes_of_matches = kd_tree.query(cluster_center, k=NUM_RECOMMENDATIONS_PER_CLUSTER)
        recommendation_indexes.extend(indexes_of_matches)
        for index in indexes_of_matches:
            label_dict[index] = label

    recommended_song_ids = []
    recommended_label_dict = {}
    for index in recommendation_indexes:
        if song_ids[index] not in favorite_ids:
            recommended_song_ids.append(song_ids[index])
            recommended_label_dict[song_ids[index]] = label_dict[index]
    recommended_songs = get_songs_from_ids(recommended_song_ids)
    favorite_songs = get_songs_from_ids(favorite_ids)
    print_results(favorite_songs, recommended_songs, favorite_label_dict, recommended_label_dict)
    return recommended_songs

get_song_recommendations("aebrown22")


