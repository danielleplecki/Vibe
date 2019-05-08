import React, { Component } from 'react';
import '../styles/Main.css';
import connect from "react-redux/es/connect/connect";
import {getRecommended} from "../actions/rootUser";

class DiscoverPage extends Component {
    render() {
        return(
            <div className="page">

            </div>
        );
    }
}

export default connect(state => ({
    rootUser: state.rootUser,
}), {
    getRecommended
})(DiscoverPage);