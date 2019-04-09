import React from 'react';
import { connect } from 'react-redux';
import { searchSongs, loadSongs } from '../actions/songs';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from "@material-ui/core/TextField/TextField";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";

class SearchSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading || false,
            query: props.query || '',
            songs: [],
            showList: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.loadSongs();
    }

    componentDidUpdate(prevProps) {
        if(this.props.songs != prevProps.songs) {
            this.setState({songs: this.props.songs})
        }
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit() {
        const { query } = this.state;
        this.setState({showList: true});
    }

    populateList = () => {
        let self = this;
        const songList = self.state.songs.filter(song => song.name.toLowerCase() === self.query.toLowerCase());
        return(
            <div>{songList.map(function(item, key) {
                return (
                    <Card>
                        <CardContent>
                            <Typography variant="subtitle2">
                                {item.name}
                            </Typography>
                            <Typography variant="caption text">
                                {item.artist}
                            </Typography>
                            <Typography variant="body1">
                                {item.album_name}
                            </Typography>
                        </CardContent>
                    </Card>
                );
            })}</div>
        )};

    render() {
        return(
            <div className="SearchSongs">
                <Card>
                    <TextField
                        id="query"
                        label="Song"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                        Search
                    </Button>
                    {this.state.showList ?
                        this.populateList() :
                        null
                    }
                </Card>
            </div>
        )
    }
}

export default connect(state => ({
    songs: state.songs
}), {
    searchSongs,
    loadSongs
})(SearchSongs);
