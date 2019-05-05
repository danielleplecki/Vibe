import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import appReducer from './app';
import notesReducer from './notes';
import songsReducer from './songs';

const createReducer = (history) => combineReducers(
    {
        app: appReducer,
        router: connectRouter(history),
        notes: notesReducer,
        songs: songsReducer
    }
);

export default createReducer;