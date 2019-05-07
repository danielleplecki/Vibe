import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import appReducer from './app';
import notesReducer from './notes';
import songsReducer from './songs';
import artistsReducer from './artists';
import rootUserReducer from './rootUser';
import usersReducer from './users';
import followReducer from './follow';

const createReducer = (history) => combineReducers(
    {
        app: appReducer,
        router: connectRouter(history),
        rootUser: rootUserReducer,
        users: usersReducer,
        notes: notesReducer,
        songs: songsReducer,
        artists: artistsReducer,
        followers: followReducer
    }
);

export default createReducer;