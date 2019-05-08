const followsLoaded = users => ({
    type: 'FOLLOWS:FOLLOWS_LOADED',
    follows: users
});

const getFollows = (query) => (dispatch, getState) => {
    let url = new URL('http://sp19-cs411-52.cs.illinois.edu:5000/follows/');
    JSON.stringify(query);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    console.log(url);
    fetch(`http://sp19-cs411-52.cs.illinois.edu:5000/follows/${query}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((users) => dispatch(followsLoaded(users)))
        .catch(err => {
            console.error(err);
        });
};

export {
    getFollows
};