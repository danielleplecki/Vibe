import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import '../styles/Main.css';
import Navbar from './Navbar';
import SideNav from './SideNav';
import HomePage from './HomePage';
import UserPage from './UserPage';
import GraphPage from './GraphPage';
import SearchUsersPage from './SearchUsersPage';

class App extends Component {
  render() {
      return (
          <div className="App">
              <Navbar />
              <div className="content">
                  <SideNav />
                  <Switch>
                      <Route exact path="/graph" component={GraphPage} />
                      <Route exact path="/search_results" component={SearchUsersPage} />
                      <Route exact path="/:id" component={UserPage} />
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
