import requests
import base64

class TooManyRequestsException(Exception):
	pass

def get_token_from_code(code, redirect_uri):
	client_id = "8adbd806dc8e4c88803ef47802693e4e"
	client_secret = "048f1c57d1fe42db983f25153d87b0cf"
	auth_str = "{i}:{s}".format(i=client_id, s=client_secret)
	auth_url = "https://accounts.spotify.com/api/token"
	headers = {'Authorization': "Basic " + base64.b64encode(bytes(auth_str, 'utf-8')).decode('utf-8')}
	data = {'grant_type': 'authorization_code', 'code': code, 'redirect_uri': redirect_uri}
	r = requests.post(auth_url, data=data, headers=headers)
	return r.json().get('access_token', None)

def get_auth_token():
	client_id = "8adbd806dc8e4c88803ef47802693e4e"
	client_secret = "048f1c57d1fe42db983f25153d87b0cf"
	auth_str = "{i}:{s}".format(i=client_id, s=client_secret)
	auth_url = "https://accounts.spotify.com/api/token"
	headers = {'Authorization': "Basic " + base64.b64encode(bytes(auth_str, 'utf-8')).decode('utf-8')}
	data = {'grant_type': 'client_credentials'}
	r = requests.post(auth_url, data=data, headers=headers)
	return r.json()['access_token']

def search(auth_token, query, search_type):
	api_url = "https://api.spotify.com/v1/search"
	params = {'q': query, 'type': search_type}
	headers = {'Authorization': 'Bearer ' + auth_token}
	r = requests.get(api_url, params=params, headers=headers)
	if r.status_code == 429:
		raise TooManyRequestsException
	return r.json()

def search_for_one_song(auth_token, title):
	search_results = search(auth_token, title, 'track')
	return search_results['tracks']['items'][0] if search_results['tracks']['items'] else None

def search_for_one_artist(auth_token, name):
	search_results = search(auth_token, name, 'artist')
	return search_results['artists']['items'][0] if search_results['artists']['items'] else None

def search_for_track_by_artist(auth_token, track_name, artist_name):
	search_results = search(auth_token, "track:{0} artist:{1}".format(track_name, artist_name), 'track')
	return search_results['tracks']['items'][0] if search_results['tracks']['items'] else None

def get_song_features(auth_token, spotify_id):
	api_url = "https://api.spotify.com/v1/audio-features/{id}".format(id=spotify_id)
	headers = {'Authorization': 'Bearer ' + auth_token}
	r = requests.get(api_url, headers=headers)
	return r.json()

def get_song(auth_token, spotify_id):
	api_url = "https://api.spotify.com/v1/tracks/{id}".format(id=spotify_id)
	headers = {'Authorization': 'Bearer ' + auth_token}
	r = requests.get(api_url, headers=headers)
	return r.json()

def get_artist(auth_token, spotify_id):
	api_url = "https://api.spotify.com/v1/artists/{id}".format(id=spotify_id)
	headers = {'Authorization': 'Bearer ' + auth_token}
	r = requests.get(api_url, headers=headers)
	return r.json()

def get_album(auth_token, spotify_id):
	api_url = "https://api.spotify.com/v1/albums/{id}".format(id=spotify_id)
	headers = {'Authorization': 'Bearer ' + auth_token}
	r = requests.get(api_url, headers=headers)
	return r.json()

def get_user(personal_auth_token):
	api_url = "https://api.spotify.com/v1/me"
	headers = {'Authorization': 'Bearer ' + personal_auth_token}
	r = requests.get(api_url, headers=headers)
	return r.json()