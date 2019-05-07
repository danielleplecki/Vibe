import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {Route, Switch} from 'react-router';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import App from './components/App';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { history } from './store';

const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
    insertionPoint: document.getElementById('jss-insertion-point'),
});


ReactDOM.render(
    <JssProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
            <ConnectedRouter history={history}>
              <Switch>
                  <Route exact path="/login" component={Login} />
                  <PrivateRoute path="/" component={App} />
              </Switch>
            </ConnectedRouter>
        </Provider>
    </JssProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
