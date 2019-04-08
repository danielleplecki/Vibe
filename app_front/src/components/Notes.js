import React from 'react';
import {connect} from 'react-redux';
import { loadNotes } from '../actions/notes';
import Card from '@material-ui/core/Card';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            posts: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.loadNotes();
    }

    componentDidUpdate(prevProps) {
        this.setState({notes: this.props.notes})
    }

    populateFeed = () => {
        let self = this;
        return(
                <div>{self.state.notes.map(function(item, key) {
                    return (
                            <Card>{item.user}</Card>
                    );
                })}</div>
        );
    };

    render() {
        return(
            <div className="Notes">
                {this.populateFeed()}
            </div>
        );
    }
}

export default connect(state => ({
    notes: state.notes
}), {
    loadNotes
})(Notes);
