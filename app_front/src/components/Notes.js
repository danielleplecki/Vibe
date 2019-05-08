import React from 'react';
import {connect} from 'react-redux';
import { loadTimelineNotes, loadProfileNotes, deleteNote, editNote } from '../actions/notes';
import { addFavorite } from '../actions/rootUser';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Avatar from "@material-ui/core/Avatar/Avatar";
import '../styles/components/Notes.css';

class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            rootUser: this.props.rootUser || {},
            edit: false,
            editUID: this.props.editUID || '',
            editID: this.props.editID || '',
            editMsg: this.props.editMsg || '',
            notes: this.props.notes,
            canEdit: false
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditOpen = this.handleEditOpen.bind(this);
        this.handleEditClose = this.handleEditClose.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFavorite = this.handleFavorite.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        if(this.props.feed === "timeline") {
            this.props.loadTimelineNotes();
        }
        else {
            let username = this.props.username;
            if(username === "me"){
                username = this.state.rootUser.username;
                this.setState({ canEdit: true });
            }
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

    handleFavorite(item) {
        item.favorited = true;
        this.props.addFavorite(item);
        this.setState({ newFav: true });
    }

    editButtons = (item) => {
        let self = this;
        return(
            <div>
                <IconButton color="secondary" onClick={() => {self.handleEditOpen(item)}}>
                    <EditIcon/>
                </IconButton>
                <IconButton onClick={() => {self.handleDelete(item)}}>
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Favorite" color="primary"
                            onClick={() => {self.handleFavorite(item)}}
                            component={item.favorited? FavoriteIcon : FavoriteBorder}>
                </IconButton>
            </div>
        );
    };

    songDetails = (item) => {
        return(
            <div className="content-details">
                <Typography component="h4" variant="h4" align="left" >
                    {item.name}
                </Typography>
                <Typography component="caption-text" variant="caption-text" align="left">
                    {item.album_name}
                </Typography>
                <br/>
                <Typography component="h5" variant="h5" align="left" >
                    {item.artist}
                </Typography>
            </div>
        );
    };

    artistDetails = (item) => {
        return(
            <div className="content-details">
                <Typography component="h4" variant="h4" align="left" >
                    {item.name}
                </Typography>
            </div>
        );
    };

    populateFeed = () => {
        let self = this;
        if(self.state.notes.length === 0) {
            return (
                <p>Currently no notes</p>
            );
        }

        return(
            <div>
                <div>{self.state.notes.map(function(item, key) {
                    item.favorited = true;
                    return (
                            <Card className="page">
                                <CardContent>
                                    <div className='notediv'>
                                        <Avatar src={item.image_url} className='note-img'/>
                                    </div>
                                    <div className='infodiv'>
                                    <Typography variant="subtitle2" align="left">
                                        {item.UID}
                                    </Typography>
                                    <Typography variant="caption text" align="left">
                                        {item.time}
                                    </Typography>
                                    <div className="note-content">
                                        <Avatar src={item.image_url} style={{ borderRadius: 0 }} className="content-image" />
                                        {item.type === "song"? self.songDetails(item): self.artistDetails(item)}
                                    </div>
                                    <Typography variant="body1">
                                        {item.message}
                                    </Typography>
                                    </div>
                                    <div className='messagediv'>
                                      <Typography variant="body1">
                                          {item.message}
                                      </Typography>
                                    </div>
                                    <div className='favoritediv'>
                                    {self.state.canEdit? self.editButtons(item) :
                                      <IconButton aria-label="Favorite" color="primary"
                                                  onClick={() => {self.handleFavorite(item)}}
                                                  component={item.favorited? FavoriteIcon : FavoriteBorder}>
                                      </IconButton>}
                                    </div>
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
    notes: state.notes,
    rootUser: state.rootUser
}), {
    loadTimelineNotes,
    loadProfileNotes,
    deleteNote,
    editNote,
    addFavorite
})(Notes);
