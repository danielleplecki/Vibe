
import { history } from '../store';

const songsLoaded = songs => ({
    type: 'SONGS:LOADED',
    songs: songs
});

const recentsLoaded = recents => ({
    type: 'RECENTS:LOADED',
    recents: recents
});

// search for the song
const searchSongs = (query) => (dispatch, getState) => {
    let url = new URL('http://sp19-cs411-52.cs.illinois.edu:5000/songs');
    JSON.stringify(query);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    console.log(url);
    fetch(url.href, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((songs) => dispatch(songsLoaded(songs)))
        .catch(err => {
            console.error(err);
        });
};

const loadRecents = (username) => (dispatch, getState) => {
    console.log("FEWOIIJFWEIOFJ");
    console.log(username);
    fetch(`http://sp19-cs411-52.cs.illinois.edu:5000/recents/${username.username}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(( recents ) => dispatch(recentsLoaded(recents)))
        .catch(err => {
            console.error(err);
        });
};

const loadSongs = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/songs", {
        method: 'GET'
    })
        .then(response => response.json())
        .then(( songs ) => dispatch(songsLoaded(songs)))
        .catch(err => {
            console.error(err);
        });
};


export {
    searchSongs,
    loadSongs,
    loadRecents
}
