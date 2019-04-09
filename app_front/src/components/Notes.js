import React from 'react';
import {connect} from 'react-redux';
import { loadNotes, deleteNote } from '../actions/notes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            notes: []
        };

        this.handleDelete = this.handleDelete.bind(this);
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

    handleDelete(note) {
        this.props.deleteNote(note.ID);
    }

    populateFeed = () => {
        let self = this;
        return(
                <div>{self.state.notes.map(function(item, key) {
                    return (
                            <Card>
                                <CardContent>
                                    <Typography variant="subtitle2" align="left">
                                        {item.UID}
                                    </Typography>
                                    <Typography variant="caption text" align="left">
                                        {item.time}
                                    </Typography>
                                    <Typography variant="body1">
                                        {item.message}
                                    </Typography>
                                    <IconButton color="secondary">
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {self.handleDelete(item)}}>
                                        <DeleteIcon />
                                    </IconButton>
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
    loadNotes,
    deleteNote
})(Notes);
