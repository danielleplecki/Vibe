import { history } from '../store';

const usersLoaded = users => ({
    type: 'USERS:USERS_LOADED',
    users: users
});

const userLoaded = users => ({
    type: 'USER:USER_LOADED',
    user: users[0]
});

const getUser = (query) => (dispatch, getState) => {
    let url = new URL('http://sp19-cs411-52.cs.illinois.edu:5000/users');
    JSON.stringify(query);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    console.log(url);
    fetch(url.href, {
        method: 'GET'
    })
        .then(response => response.json())
        .then((users) => dispatch(userLoaded(users)))
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
    searchUsers,
    getUser
};