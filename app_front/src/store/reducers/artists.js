const initialState = [];

const ArtistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ARTISTS:LOADED':
            return [
                ...action.artists
            ];

        default:
            return state;
    }
};

export default ArtistsReducer;