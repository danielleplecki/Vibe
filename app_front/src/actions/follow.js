const followersLoaded = users => ({
    type: 'USERS:USERS_LOADED',
    followers: users
});

const getFollowers = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/me", {
        method: 'GET'
    })
        .then(response => response.json())
        .then((users) => dispatch(followersLoaded(users)))
        .catch(err => {
            console.error(err);
        });
};

export {
    getFollowers
};