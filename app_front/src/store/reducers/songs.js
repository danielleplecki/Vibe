const initialState = [];

const SongsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SONGS:LOADED':
            return [
                ...action.songs
            ];

        default:
            return state;
    }
};

export default SongsReducer;