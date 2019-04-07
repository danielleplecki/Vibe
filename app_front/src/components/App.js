import React, { Component } from 'react';
import '../App.css';
import Posts from './Posts';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Vibe</h1>
        <Posts/>
      </div>
    );
  }
}

export default App;
