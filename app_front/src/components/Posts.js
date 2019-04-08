import React from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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

//    componentDidUpdate(prevProps) {
//        this.setState({posts: this.props.keys})
//    }

    populateFeed = () => {
        let self = this;
        return(
                <div>{self.state.posts.map(function(item, key) {
                    return (
                            <Card>{item.user}</Card>
                    );
                })}</div>
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
