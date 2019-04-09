
import { history } from '../store';

const songsLoaded = songs => ({
    type: 'SONGS:LOADED',
    songs: songs
});

// search for the song
const searchSongs = (song) => (dispatch, getState) => {
    fetch(`http://sp19-cs411-52.cs.illinois.edu:5000/songs/${song.query}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((songs) => dispatch(songsLoaded(songs)))
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
    loadSongs
}
