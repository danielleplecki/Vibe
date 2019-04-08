import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import appReducer from './app';
import postsReducer from './posts';
import songsReducer from './songs';

const reducer = combineReducers(
    {
        app: appReducer,
        router: routerReducer,
        posts: postsReducer,
        songs: songsReducer
    }
);

export default reducer;