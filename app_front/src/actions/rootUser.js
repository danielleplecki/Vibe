import { history } from '../store';

const userAuthorized = (user, token) => (
    {
        type: 'ROOT_USER:USER_AUTHORIZED',
        username: user.username,
        name: user.name,
        image: user.image,
        time_joined: user.time_joined,
        token: token
    }
);

const userLoaded = user => ({
    type: 'ROOT_USER:USER_LOADED',
    user: user
});

const graphLoaded = graph => ({
    type: 'ROOT_USER:GRAPH_LOADED',
    graph: graph
});

const notificationsLoaded = notifications => ({
    type: 'ROOT_USER:NOTIFICATIONS_LOADED',
    notifications: notifications
});

const recommendedLoaded = recommended => ({
    type: 'ROOT_USER:RECOMMENDED_LOADED',
    recommended: recommended
});

const favoriteAdded = fav => ({
    type: 'ROOT_USER:FAVORITE_ADDED',
    fav: fav
});

const getRootUser = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/me", {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(( user ) => dispatch(userLoaded(user)))
        .catch(err => {
            console.error(err);
        });
};

const getRecommended = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/recommended", {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(( recommended ) => dispatch(recommendedLoaded(recommended)))
        .catch(err => {
            console.error(err);
        });
};

const getGraph = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/graph", {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(( graph ) => dispatch(graphLoaded(graph)))
        .catch(err => {
            console.error(err);
        });
};

const getNotifications = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/notifications", {
        method: 'GET',
        credentials: 'include',
    })
        .then(response => response.json())
        .then(( notifications ) => dispatch(notificationsLoaded(notifications)))
        .catch(err => {
            console.error(err);
        });
};

const addFavorite = (note) => (dispatch, getState) => {
    fetch(`http://sp19-cs411-52.cs.illinois.edu:5000/notes/${note.ID}/favorites`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        }
    }).then(async response => response.json())
        .catch(err => {
            console.error(err);
        });
};

const getTokenAndAuthorize = (code) => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/code", code)
        .then(async response => response.json())
        .then(result => dispatch(authorizeUser(result)))
        .catch(err => {
            console.error(err);
        });
};

const authorizeUser = (result) => (dispatch, getState) => {
    if(result.token == null) { return; }
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

export {
    getTokenAndAuthorize,
    authorizeUser,
    getRootUser,
    getGraph,
    getRecommended,
    addFavorite,
    getNotifications
};