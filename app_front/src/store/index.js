import {
    applyMiddleware,
    combineReducers,
    createStore,
    compose
} from 'redux';

import createHistory from 'history/createBrowserHistory';
import { routerMiddleware, routerReducer as routing } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const loggerMiddleware = store => next => action => {
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
        routerMiddleware(history),
    )
)(createStore);

const store = createStoreWithMiddleware(reducer, initialState);

export default store;
export { history, store };