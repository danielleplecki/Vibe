
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

};

const loadNotes = () => (dispatch, getState) => {
    fetch("http://sp19-cs411-52.cs.illinois.edu:5000/notes/12345", {
        method: 'GET'
    })
        .then(response => response.json())
        .then(( {notes} ) => dispatch(notesLoaded(notes)))
        .catch(err => dispatch(noteError(null)));
};

const deleteNote = (noteID) => (dispatch, getState) => {

};


export {
    loadNotes,
    createNote,
    deleteNote,
    noteCreated
}