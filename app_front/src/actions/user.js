import { history } from '../store';

const userAuthorized = (user, token) => (
    {
        type: 'USER:USER_AUTHORIZED',
        username: user.username,
        name: user.name,
        image: user.image,
        time_joined: user.time_joined,
        token: token
    }
);

const usersLoaded = users => ({
    type: 'USERS:LOADED',
    users: users
});

const getTokenAndAuthorize = (code) => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/code", code)
        .then(async response => response.json())
        .then(result => dispatch(authorizeUser(result)))
        .catch(err => {
            console.error(err);
        });
};

const authorizeUser = (result) => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
            "accessToken": result.token
        })
    }).then(async response => response.json())
        .then(user => dispatch(userAuthorized(user, result.token)))
        .then(history.push('/'))
        .catch(err => {
            console.error(err);
        });
};

const searchUsers = (query) => (dispatch, getState) => {
    let url = new URL('http://sp19-cs411-52.cs.illinois.edu:5000/users');
    JSON.stringify(query);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    console.log(url);
    fetch(url.href, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((users) => dispatch(usersLoaded(users)))
        .catch(err => {
            console.error(err);
        });
};

export {
    getTokenAndAuthorize,
    authorizeUser,
    searchUsers
};