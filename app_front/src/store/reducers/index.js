import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './app';
import notesReducer from './notes';
import songsReducer from './songs';

const reducer = combineReducers(
    {
        app: appReducer,
        router: routerReducer,
        notes: notesReducer,
        songs: songsReducer
    }
);

export default reducer;