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
import connect from "react-redux/es/connect/connect";
import { getNotifications } from "../actions/rootUser";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            loading: props.loading || false,
            query: props.query || '',
            songs: [],
            showResults: false,
            selectedIndex: -1,
            notifications: props.notifications || [],
            num_notifications: props.num_notifications
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    componentDidMount() {
        this.props.getNotifications();
    }

    componentDidUpdate(prevProps) {
        if (this.props.num_notifications !== prevProps.num_notifications) {
            this.setState({num_notifications: this.props.num_notifications, notifications: this.props.notifications});
        }
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
                            <Badge badgeContent={this.state.num_notifications} color="secondary">
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

export default connect(state => ({
    notifications: state.rootUser.notifications,
    num_notifications: state.rootUser.num_notifications
}), {
    getNotifications
})(Navbar);