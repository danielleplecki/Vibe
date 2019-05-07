import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import '../styles/Main.css';
import Navbar from './Navbar';
import SideNav from './SideNav';
import HomePage from './HomePage';
import UserPage from './UserPage';
import SearchUsersPage from './SearchUsersPage';
import GraphPage from './GraphPage';

class App extends Component {
  render() {
      return (
          <div className="App">
              <Navbar />
              <div className="content">
                  <SideNav />
                  <Switch>
                      <Route exact path="/graph" component={GraphPage} />
                      <Route exact path="/search/:query" component={SearchUsersPage} />
                      <Route exact path="/:username" component={UserPage} />
                      <Route exact path="/" component={HomePage} />
                  </Switch>
              </div>
          </div>
    );
  }
}

const ConnectedApp = connect(
    state => state
)(App);

export default ConnectedApp;
