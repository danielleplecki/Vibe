import React, { Component } from 'react';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase/InputBase";
import IconButton from "@material-ui/core/IconButton/IconButton";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Badge from "@material-ui/core/Badge/Badge";
import AppBar from "@material-ui/core/AppBar/AppBar";
import '../styles/components/Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <AppBar position="static">
                    <Toolbar>
                        <Typography className="title" variant="h6">
                            VIBE
                        </Typography>
                        <div className="grow" />
                        <div className="search">
                            <div className="search-icon">
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: "input-root",
                                    input: "input-input",
                                }}
                            />
                        </div>
                        <IconButton color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;