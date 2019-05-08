const initialState = {};

const FollowReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FOLLOWS:FOLLOWS_LOADED':
            return {
                follows: action.follows
            };

        default:
            return state;
    }
};

export default FollowReducer;