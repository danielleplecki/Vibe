import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IconButton from "@material-ui/core/IconButton/IconButton";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import DiscoverIcon from '@material-ui/icons/WifiTethering';
import Badge from "@material-ui/core/Badge/Badge";
import AppBar from "@material-ui/core/AppBar/AppBar";
import '../styles/components/Navbar.css';
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";
import { history } from '../store';
import TextField from "@material-ui/core/TextField/TextField";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            loading: props.loading || false,
            query: props.query || '',
            songs: [],
            showResults: false,
            selectedIndex: -1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            history.push(`/search/${this.state.query}`);
        }
    };

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div className="navbar">
                <AppBar position="static">
                    <Toolbar>
                        <Typography className="title" variant="h6">
                            VIBE
                        </Typography>
                        <Button color="inherit" component={RouterLink} to="/">
                            <HomeIcon/>
                            Home
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/discover">
                            <DiscoverIcon/>
                            Discover
                        </Button>
                        <div className="grow" />
                        <div className="search">
                            <div className="search-icon">
                                <SearchIcon  />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: "input-root",
                                    input: "input-input",
                                }}
                                onKeyDown={this.handleKeyDown}
                                id="query"
                                label="Song"
                                value={this.state.query}
                                onChange={this.handleChange}
                            />
                        </div>
                        <IconButton color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" component={RouterLink} to="/me">
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;