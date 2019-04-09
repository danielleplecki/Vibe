import React from 'react';
import {connect} from 'react-redux';
import { loadNotes, deleteNote, editNote } from '../actions/notes';
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
            editNote: {},
            notes: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleEditOpen(note) {
        this.setState({ edit: true , editNote: note});
    }

    handleEditClose() {
        this.setState({ edit: false , editNote: {}});
    }

    handleEditSubmit() {
        const note = this.state.editNote;
        this.setState({ edit: false });
        this.props.editNote(note);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
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
        );
    };

    render() {
        return(
            <div className="Notes">
                {this.populateFeed()}
                <Modal open={this.state.edit} onClose={this.handleEditClose}>
                    <Card>
                        <form>
                            <TextField
                                disabled
                                id="UID"
                                label="User"
                                defaultValue={this.state.editNote.UID}
                                margin="normal"
                                fullWidth={true}
                            />

                            <TextField
                                id="msg"
                                label="Note"
                                value={this.state.editNote.msg}
                                onChange={this.handleChange}
                                margin="normal"
                                multiline={true}
                                fullWidth={true}
                            />
                            <Button variant="contained" color="primary" onClick={this.handleEditSubmit}>
                                Save Changes
                            </Button>
                        </form>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default connect(state => ({
    notes: state.notes
}), {
    loadNotes,
    deleteNote,
    editNote
})(Notes);
