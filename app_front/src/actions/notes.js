
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
        credentials: 'include',
        body: JSON.stringify({
            message: note.message,
            contentId: note.contentId,
            type: note.type
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(dispatch(loadTimelineNotes()))
        .catch(err => {
            console.error(err);
        });
};

const loadTimelineNotes = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/timeline", {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(( notes ) => dispatch(notesLoaded(notes)))
        .catch(err => {
            console.error(err);
        });
};

const loadProfileNotes = (query) => (dispatch, getState) => {
    let url = new URL('http://sp19-cs411-52.cs.illinois.edu:5000/notes');
    JSON.stringify(query);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    console.log(url);
    fetch(url.href, {
        method: 'GET',
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
