const initialState = [];

const SongsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SONGS:LOADED':
            return [
                ...action.orgs
            ];

        case 'SONGS:ERROR':
            return {
                ...state,
                popupType: action.popup.popupType,
                popupProps: action.popup.popupProps
            };

        case 'SONGS:CREATED':
            return [
                ...state,
                {
                    sourceId: action.org.orgID,
                    name: action.org.orgName,
                    description: action.org.orgDescription
                }
            ];

        case 'SONGS:UPDATED':
            return state.map(org => {
                return org.sourceId === action.org.orgID ?
                    {
                        sourceId: action.org.orgID,
                        name: action.org.orgName,
                        description: action.org.orgDescription
                    } : org;
            });


        default:
            return state;
    }
};

export default SongsReducer;