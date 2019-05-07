import React from 'react';
import { connect } from 'react-redux';
import { searchArtists } from '../actions/artists';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import '../styles/components/Search.css';

class SearchArtists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            loading: props.loading || false,
            query: props.query || '',
            artists: [],
            showResults: false,
            selectedIndex: -1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.setState({ loading: true });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.artists !== prevProps.artists) {
            this.setState({artists: this.props.artists})
        }
    }

    searchButton() {
        let self = this;
        return(<Button onClick={self.handleSearch} color="primary">
                Search
            </Button>
        );
    }

    handleSearch() {
        const  name  = this.state.query;
        this.props.searchArtists({name});
        this.setState({showResults: true});
    }

    submitButton() {
        let self = this;
        return(<Button onClick={self.handleSubmit} color="primary">
                Add Song
            </Button>
        );
    }

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };

    handleSubmit() {
        const artist = this.state.artists[this.state.selectedIndex];
        this.props.onClose(artist);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    populateResults = () => {
        let self = this;
        return(
            <List component="nav">
                {self.state.artists.map(function(item, key) {
                    return (
                        <ListItem button
                                  key={key}
                                  selected={self.state.selectedIndex === key}
                                  className="content-item"
                                  onClick={event => self.handleListItemClick(event, key)}>
                            <ListItemAvatar>
                                <Avatar src={item.image_url} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="subtitle2" variant="subtitle2" align="center" >
                                    {item.name}
                                </Typography>
                                <Typography component="caption-text" variant="caption-text" align="center" >
                                    {item.artist}
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    );
                })}
            </List>
        )};

    render() {
        const { value, ...other } = this.props;
        return(
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Search an Artist</DialogTitle>
                <DialogContent>
                    <TextField
                        id="query"
                        label="Artist"
                        value={this.state.query}
                        onChange={this.handleChange}
                    />
                    {this.state.showResults ?
                        this.populateResults() :
                        null
                    }
                </DialogContent>
                <DialogActions>
                    {this.state.showResults ?
                        this.submitButton() :
                        this.searchButton()
                    }
                </DialogActions>
            </Dialog>
        )
    }
}

export default connect(state => ({
    artists: state.artists
}), {
    searchArtists
})(SearchArtists);
