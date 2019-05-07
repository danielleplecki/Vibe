import React, { Component } from 'react';
import Notes from './Notes';
import CreateNote from './CreateNote';
import SearchSongs from './SearchSongs';
import '../styles/Main.css';

class HomePage extends Component {
    render() {
        return(
            <div className="page">
                <CreateNote />
                <Notes feed="timeline"/>
            </div>
        );
    }
}

export default HomePage;