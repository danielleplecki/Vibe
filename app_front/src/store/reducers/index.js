import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import appReducer from './app';
import notesReducer from './notes';
import songsReducer from './songs';
import artistsReducer from './artists';
import userReducer from './user';

const createReducer = (history) => combineReducers(
    {
        app: appReducer,
        router: connectRouter(history),
        user: userReducer,
        notes: notesReducer,
        songs: songsReducer,
        artists: artistsReducer
    }
);

export default createReducer;