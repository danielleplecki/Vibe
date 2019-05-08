const initialState = [];

const RecentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RECENTS:LOADED':
            return [
                ...action.recents
            ];
        default:
            return state;
    }
};

export default RecentsReducer;