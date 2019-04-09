const initialState = [];

const NotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTES:LOADED':
            return [
                ...action.notes
            ];

        case 'NOTES:ERROR':
            return {
                ...state,
                popupType: action.popup.popupType,
                popupProps: action.popup.popupProps
            };

        case 'NOTES:CREATED':
            return [
                ...state,
                {
                    UID: action.note.UID,
                    msg: action.note.msg
                }
            ];

        case 'NOTES:UPDATED':
            return state.map(note => {
                return note.sourceId === action.note.noteID ?
                    {
                        sourceId: action.note.noteID
                    } : note;
            });


        default:
            return state;
    }
};

export default NotesReducer;