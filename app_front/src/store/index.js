import {
    applyMiddleware,
    combineReducers,
    createStore,
    compose
} from 'redux';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';
import createLogger from 'redux-logger';

/**const loggerMiddleware = store => next => action => {
    console.info("Action type:", action.type);
    console.info("Action payload:", action.payload);
    console.info("State before:", store.getState());
    next(action);
    console.info("State after:", store.getState());
};

let initialState = {};
const history = createHistory();

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk,

    )
)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);*/

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
    return createStore(
        reducer,
        preloadedState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    )
}

const store = configureStore();

export default store;