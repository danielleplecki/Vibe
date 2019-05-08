const initialState = {
    username: null,
    name: null,
    image: null,
    time_joined: null,
    num_notes: null,
    num_follows: null,
    authorized: null,
    token: null,
    graph: null,
    recommended: null,
    favorites: null,
    notifications: null,
    num_notifications: 0
};

const rootUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ROOT_USER:USER_AUTHORIZED':
            if(action.username) {
                return {
                    ...state,
                    authorized: true,
                    username: action.username,
                    name: action.name,
                    image: action.image,
                    time_joined: action.time_joined,
                    token: action.token
                };
            }

            else {
                return state;
            }


        case 'ROOT_USER:USER_LOADED':
            return {
                ...state,
                num_followers: action.user.num_followers,
                num_following: action.user.num_following,
                num_notes: action.user.num_notes
            };

        case 'ROOT_USER:GRAPH_LOADED':
            return {
                ...state,
                graph: action.graph
            };

        case 'ROOT_USER:RECOMMENDED_LOADED':
            return {
                ...state,
                recommended: action.recommended
            };

        case 'ROOT_USER:NOTIFICATIONS_LOADED':
            return {
                ...state,
                notifications: action.notifications,
                num_notifications: state.num_notifications + 1
            };

        case 'ROOT_USER:FAVORITES_LOADED':
            return {
                ...state,
                favorites: action.favorites
            };

        case 'ROOT_USER:FAVORITE_ADDED':
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.fav
                ]
            };

        default:
            return state;
    }
};

export default rootUserReducer;