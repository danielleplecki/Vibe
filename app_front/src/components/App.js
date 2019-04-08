import React, { Component } from 'react';
import '../App.css';
import Notes from './Notes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Vibe</h1>
        <Notes />
      </div>
    );
  }
}

export default App;
