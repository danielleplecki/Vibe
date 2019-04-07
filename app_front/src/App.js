import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Card, Col, Row} from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        song: {
          id: null, 
          name: null,
        },
    };
  }

  componentDidMount() {
    fetch('http://172.22.148.188:5000/')
      .then(response => response.json())
      .then(data => this.setState({song: data}));
  }

  render() {
    return (
      <div className="App">
        <h1>Vibe</h1>
        <Row>
          <Col className="m6 offset-m3 center-align">
            <Card horizontal className='blue-grey darken-3' header={<Card title="Song" className="blue-grey lighten-2"/>}>
            <div className="left-align white-text">{this.state.song.name}</div>
            <div className="left-align white-text">ID: {this.state.song.id}</div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
