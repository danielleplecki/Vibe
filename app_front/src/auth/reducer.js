const initialState = {
    username: null,
    name: null,
    image: null,
    time_joined: null,
    authorized: null,
    token: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'auth:USER_AUTHORIZED':
            return {
                ...state,
                authorized: true,
                username: action.username,
                name: action.name,
                image: action.image,
                time_joined: action.time_joined,
                token: action.token
            };

        default:
            return state;
    }
};

export default authReducer;