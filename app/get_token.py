import requests
import base64

client_id = "8adbd806dc8e4c88803ef47802693e4e"
client_secret = "048f1c57d1fe42db983f25153d87b0cf"
auth_str = "{i}:{s}".format(i=client_id, s=client_secret)
auth_url = "https://accounts.spotify.com/api/token"
encoded_auth = base64.b64encode(auth_str)
headers = {'Authorization': "Basic " + base64.b64encode(auth_str)}
data = {'grant_type': 'client_credentials'}

def get_auth_token():
	r = requests.post(auth_url, data=data, headers=headers)
	return r.json()['access_token']
