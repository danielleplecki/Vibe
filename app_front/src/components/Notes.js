import React from 'react';
import {connect} from 'react-redux';
import { loadNotes } from '../actions/notes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notes: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.loadNotes();
    }

    componentDidUpdate(prevProps) {
        if(this.props.notes != prevProps.notes) {
            this.setState({notes: this.props.notes})
        }
    }

    populateFeed = () => {
        let self = this;
        return(
                <div>{self.state.notes.map(function(item, key) {
                    return (
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {item.UID}
                                    </Typography>
                                    <Typography className={classes.pos}>
                                        {item.time}
                                    </Typography>
                                    <Typography component="p">
                                        {item.message}
                                    </Typography>
                                </CardContent>
                            </Card>
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
