import { applyMiddleware, createStore, compose } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import createReducer from './reducers';

const loggerMiddleware = store => next => action => {
    console.info("Action type:", action.type);
    console.info("Action payload:", action.payload);
    console.info("State before:", store.getState());
    next(action);
    console.info("State after:", store.getState());
};

let initialState = {};
const history = createBrowserHistory();

const store = createStore(
    createReducer(history),
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk,
            loggerMiddleware
        ),
    ),
);

export default store;
export { history, store };