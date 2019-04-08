import requests
import base64

def get_auth_token():
	client_id = "8adbd806dc8e4c88803ef47802693e4e"
	client_secret = "048f1c57d1fe42db983f25153d87b0cf"
	auth_str = "{i}:{s}".format(i=client_id, s=client_secret)
	auth_url = "https://accounts.spotify.com/api/token"
	headers = {'Authorization': "Basic " + base64.b64encode(auth_str)}
	data = {'grant_type': 'client_credentials'}
	r = requests.post(auth_url, data=data, headers=headers)
	return r.json()['access_token']

def search(auth_token, keywords, search_type):
	api_url = "https://api.spotify.com/v1/search"
	params = {'q': keywords, 'type': search_type}
	headers = {'Authorization': 'Bearer ' + auth_token}
	r = requests.get(api_url, params=params, headers=headers)
	return r.json()

def search_for_one_song(auth_token, title):
	search_results = search(auth_token, title, 'track')
	return search_results['tracks']['items'][0]
