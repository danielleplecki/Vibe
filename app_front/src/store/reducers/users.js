const initialState = {
    users: [],
    searchedUser: null
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS:USERS_LOADED':
            return {
                ...state,
                users: [...action.users]
            };

        case 'USER:USER_LOADED':
            return {
                ...state,
                searchedUser: action.user
            };

            default:
                return state;
    }
};

export default usersReducer;