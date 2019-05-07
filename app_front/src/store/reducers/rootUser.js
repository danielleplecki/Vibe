const initialState = {
    username: null,
    name: null,
    image: null,
    time_joined: null,
    num_notes: null,
    num_follows: null,
    authorized: null,
    token: null,
    graph: null
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
                num_follows: action.user.num_follows,
                num_notes: action.user.num_notes
            };

        case 'ROOT_USER:GRAPH_LOADED':
            return {
                ...state,
                graph: action.graph
            };

        default:
            return state;
    }
};

export default rootUserReducer;