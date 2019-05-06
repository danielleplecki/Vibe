import { history } from '../store';

const userAuthorized = (user, token) => (
    {
        type: 'auth:USER_AUTHORIZED',
        username: user.username,
        name: user.name,
        image: user.image,
        time_joined: user.time_joined,
        token: token
    }
);

const getTokenAndAuthorize = (code) => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/code", code)
        .then(response => response.json())
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
    }).then(response => response.json())
        .then(user => dispatch(userAuthorized(user, result.token)))
        .then(history.push('/'))
        .catch(err => {
            console.error(err);
        });
};

export {
    getTokenAndAuthorize,
    authorizeUser
};

