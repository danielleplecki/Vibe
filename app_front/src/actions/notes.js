
import { history } from '../store';

const notesLoaded = notes => ({
    type: 'NOTES:LOADED',
    notes: notes
});

const noteCreated = note => ({
    type: 'NOTES:CREATED',
    note: note
});

const notesUpdated = note => ({
    type: 'NOTES:UPDATED',
    note: note
});

// create the note
const createNote = (note) => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/notes", {
        method: 'POST',
        body: JSON.stringify({
            UID: note.UID,
            message: note.msg
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(note => {
            dispatch(noteCreated(note));
        })
        .catch(err => {
            console.error(err);
        });
};

const loadTimelineNotes = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/timeline", {
        method: 'GET'
    })
        .then(response => response.json())
        .then(( notes ) => dispatch(notesLoaded(notes)))
        .catch(err => {
            console.error(err);
        });
};

const loadProfileNotes = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/notes", {
        method: 'GET'
    })
        .then(response => response.json())
        .then(( notes ) => dispatch(notesLoaded(notes)))
        .catch(err => {
            console.error(err);
        });
};

const editNote = (note) => (dispatch, getState) => {
    fetch(`http://sp19-cs411-52.cs.illinois.edu:5000/notes/${note.editID}`, {
        method: 'PUT',
        body: JSON.stringify({
            message: note.editMsg
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
};

const deleteNote = (noteID) => (dispatch, getState) => {
    fetch(`http://sp19-cs411-52.cs.illinois.edu:5000/notes/${noteID}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
};


export {
    loadTimelineNotes,
    loadProfileNotes,
    createNote,
    deleteNote,
    noteCreated,
    editNote
}
