import React, { Component } from 'react';
import Graph from './graph';
import '../styles/Main.css';

class GraphPage extends Component {
    render() {
        return(
            <div className="page">
                <Graph />
            </div>
        );
    }
}

export default GraphPage;