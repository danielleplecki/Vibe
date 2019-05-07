import React from 'react';
import {connect} from 'react-redux';
import { loadTimelineNotes, loadProfileNotes, deleteNote, editNote } from '../actions/notes';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            edit: false,
            editUID: this.props.editUID || '',
            editID: this.props.editID || '',
            editMsg: this.props.editMsg || '',
            notes: this.props.notes
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        if(this.props.feed === "timeline") {
            this.props.loadTimelineNotes();
        }
        else {
            const username = this.props.username;
            this.props.loadProfileNotes({username});
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.notes !== prevProps.notes) {
            this.setState({notes: this.props.notes, loading: false})
        }
    }

    handleDelete(note) {
        this.props.deleteNote(note.ID);
    }

    handleEditOpen(note) {
        this.setState({ edit: true , editUID: note.UID, editID: note.ID, editMsg: note.message});
    }

    handleEditClose() {
        this.setState({ edit: false });
    }

    handleEditSubmit() {
        const { editID, editMsg } = this.state;
        this.setState({ edit: false });
        this.props.editNote({ editID, editMsg });
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    populateFeed = () => {
        let self = this;
        return(
            <div>
                <div>{self.state.notes.map(function(item, key) {
                    return (
                            <Card className="note">
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
                                    <IconButton color="secondary" onClick={() => {self.handleEditOpen(item)}}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {self.handleDelete(item)}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                    );
                })}</div>
                <Modal open={self.state.edit} onClose={self.handleEditClose}>
                    <Card>
                        <form>
                            <TextField
                                disabled
                                id="editUID"
                                label="User"
                                defaultValue={self.state.editUID}
                                margin="normal"
                                fullWidth={true}
                            />

                            <TextField
                                id="editMsg"
                                label="Note"
                                value={self.state.editMsg}
                                onChange={self.handleChange}
                                margin="normal"
                                multiline={true}
                                fullWidth={true}
                            />
                            <Button variant="contained" color="primary" onClick={self.handleEditSubmit}>
                                Save Changes
                            </Button>
                        </form>
                    </Card>
                </Modal>
             </div>
        );
    };

    render() {
        return(
            <div className="Notes">
                {this.state.loading? null: this.populateFeed()}
            </div>
        );
    }
}

export default connect(state => ({
    notes: state.notes
}), {
    loadTimelineNotes,
    loadProfileNotes,
    deleteNote,
    editNote
})(Notes);
