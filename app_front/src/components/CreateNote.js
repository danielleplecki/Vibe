import React from 'react';
import '../styles/components/Notes.css';
import { connect } from 'react-redux';
import { createNote } from '../actions/notes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import SongIcon from '@material-ui/icons/MusicNote';
import ArtistIcon from '@material-ui/icons/Person';
import SearchSongs from './SearchSongs';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading || false,
            UID: 'aebrown22',
            msg: props.message || '',
            songOpen: false,
            song: {},
            artistOpen: false,
            artist: '',
            contentChosen: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.addArtist = this.addArtist.bind(this);
        this.addSong = this.addSong.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    validate() {
        return !(this.state.UID === '' || this.state.msg === '');
    }

    handleSubmit() {
        //Validate that there are no empty fields
        if(!this.validate()) {
            //POPUP ERROR
        }

        else {
            const { UID, msg } = this.state;
            this.props.createNote({
                UID,
                msg
            });

        }
    }

    handleClose = song => {
        this.setState({ song, songOpen: false, contentChosen: true });
    };

    addArtist() {
        this.setState({ artistOpen: true });
    }

    addSong() {
        this.setState({ songOpen: true });
    }

    searchButton() {

    }

    submitButton() {

    }

    getContent = () => {
        let self = this;
        return(
            <CardContent className="content">
                <Card className="content-selector">
                    <ButtonBase
                        className="card-action"
                        onClick={self.addArtist}
                    >
                        <CardContent>
                            <ArtistIcon/>
                            <Typography component="h5" variant="h5">
                                Add an Artist
                            </Typography>
                        </CardContent>
                    </ButtonBase>
                </Card>
                <SearchSongs
                    classes={{
                        paper: "paper",
                    }}
                    open={this.state.artistOpen}
                    onClose={this.handleClose}
                    value={this.state.artist}
                />
                <Card className="content-selector">
                    <ButtonBase
                        className="card-action"
                        onClick={self.addSong}
                    >
                        <CardContent>
                            <SongIcon/>
                            <Typography component="h5" variant="h5">
                                Add a Song
                            </Typography>
                        </CardContent>
                    </ButtonBase>
                </Card>
                <SearchSongs
                    classes={{
                        paper: "paper",
                    }}
                    open={this.state.songOpen}
                    onClose={this.handleClose}
                    value={this.state.song}
                />
            </CardContent>
        );
    };

    getMessage = () => {
        let self = this;
        return(
            <CardContent>
                <img src={self.state.song.image_url}/>
                <Typography component="h5" variant="h5">
                    {self.state.song.name}
                </Typography>
                <form>
                    <TextField
                        id="msg"
                        label="Note"
                        value={this.state.msg}
                        onChange={this.handleChange}
                        margin="normal"
                        multiline={true}
                        fullWidth={true}
                    />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Post
                    </Button>
                </form>
            </CardContent>
        );
    };

    render() {
        return(
            <div className="note">
                <Card>
                    <CardHeader className="card-title" title="Create Note">Create Note</CardHeader>
                    {this.state.contentChosen ?
                        this.getMessage() :
                        this.getContent()
                    }

                </Card>
            </div>
        )
    }
}

export default connect(null, {
    createNote
})(CreateNote);
