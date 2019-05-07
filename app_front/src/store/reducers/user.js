const initialUserState = {
    username: null,
    name: null,
    image: null,
    time_joined: null,
    authorized: null,
    token: null
};

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case 'USER:USER_AUTHORIZED':
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

const initialUsersState = [];

const usersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case 'USERS:LOADED':
            return [
                ...action.users
            ];

            default:
                return state;
    }
};

export { userReducer, usersReducer };