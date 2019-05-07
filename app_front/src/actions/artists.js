const songsLoaded = artists => ({
    type: 'ARTISTS:LOADED',
    artists: artists
});

// search for the artist
const searchArtists = (query) => (dispatch, getState) => {
    let url = new URL('http://sp19-cs411-52.cs.illinois.edu:5000/artists');
    JSON.stringify(query);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    console.log(url);
    fetch(url.href, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((artists) => dispatch(songsLoaded(artists)))
        .catch(err => {
            console.error(err);
        });
};

export {
    searchArtists
}