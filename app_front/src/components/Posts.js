import React from 'react';
import {connect} from 'react-redux';
import { Card, GridList, GridListTile } from '@material-ui/core';


class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            posts: [
                {user: 'Danielle'},
                {user: 'Connor'},
                {user: 'Austin'},
                {user: 'Wyatt'}
            ]
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
    }

    componentDidUpdate(prevProps) {
        this.setState({posts: this.props.keys})
    }

    populateFeed = () => {
        let self = this;
        return(
            <GridList>
                {self.state.posts.map(function(item, key) {
                    return (
                        <GridListTile key={key}>
                            <Card>{item.user}</Card>
                        </GridListTile>
                    );
                })}
            </GridList>
        );
    };

    render() {
        return(
            <div className="Post">
                {this.populateFeed()}
            </div>
        );
    }
}

export default connect(state => ({
    posts: state.posts
}), {

})(Posts);