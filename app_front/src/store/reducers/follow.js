const initialState = [];

const FollowReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FOLLOW:LOADED':
            return [
                ...action.followers
            ];

        default:
            return state;
    }
};

export default FollowReducer;