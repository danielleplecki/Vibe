import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import '../styles/Main.css';
import Navbar from './Navbar';
import SideNav from './SideNav';
import HomePage from './HomePage';
import UserPage from './UserPage';
import UserResultsPage from './UserResultsPage';
import GraphPage from './GraphPage';
import DiscoverPage from "./DiscoverPage";
import FavoritesPage from './FavoritesPage';

class App extends Component {
  render() {
      return (
          <div className="App">
              <Navbar />
              <div className="content">
                  <SideNav />
                  <Switch>
                      <Route exact path="/graph" component={GraphPage} />
                      <Route exact path="/discover" component={DiscoverPage} />
                      <Route exact path="/favorites" component={FavoritesPage} />
                      <Route exact path="/search/:query" component={UserResultsPage} />
                      <Route exact path="/:username/:follow" component={UserResultsPage} />
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
