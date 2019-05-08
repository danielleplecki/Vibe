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
import SearchArtists from './SearchArtists';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import {loadSongs, searchSongs} from "../actions/songs";

class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: props.rootUser,
            msg: props.message || '',
            songOpen: false,
            song: {},
            artistOpen: false,
            artist: {},
            contentChosen: false,
            contentType: ''
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
            const { UID, msg, contentType } = this.state;
            const ID = this.state.contentType === "song"? this.state.song.spotify_id : this.state.artist.spotify_id;
            this.props.createNote({
                message: msg,
                type: contentType,
                contentId: ID
            });
    }

    handleSongClose = song => {
        this.setState({ song: song, songOpen: false, contentChosen: true, contentType: 'song', loading: false });
    };

    handleArtistClose = artist => {
        this.setState({ artist, artistOpen: false, contentChosen: true, contentType: 'artist' , loading: false});
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
                <SearchArtists
                    classes={{
                        paper: "paper",
                    }}
                    open={this.state.artistOpen}
                    onClose={this.handleArtistClose}
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
                    onClose={this.handleSongClose}
                    value={this.state.song}
                />
            </CardContent>
        );
    };

    getMessage = () => {
        if(this.state.loading) { return null; }
        let self = this;
        const content = self.state.contentType === 'song'? self.state.song : self.state.artist;
        return(
            <CardContent>
                <img src={content.image_url}/>
                <Typography component="h5" variant="h5">
                    {content.name}
                </Typography>
                <form>
                    <TextField
                        id="msg"
                        label="Add a note!"
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

export default connect(state => ({
    user: state.rootUser
}), {
    createNote
})(CreateNote);