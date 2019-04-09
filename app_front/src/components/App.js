import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Notes from './Notes';
import CreateNote from './CreateNote';
import SearchSongs from './SearchSongs';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Vibe</h1>
          <CreateNote />
          <Notes />
          <SearchSongs />
      </div>
    );
  }
}

const ConnectedApp = connect(
    state => state
)(App);

export default ConnectedApp;
