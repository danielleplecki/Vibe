import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GraphIcon from '@material-ui/icons/Timeline';
import FavIcon from '@material-ui/icons/Favorite';
import PersonIcon from '@material-ui/icons/Person';
import FollowersIcon from '@material-ui/icons/People';
import '../styles/components/SideNav.css';
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import { connect } from "react-redux";

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.user !== prevProps.user) {
            this.setState({user: this.props.user})
        }
    }

    render() {
        return(
            <Drawer
                className="drawer sidenav"
                variant="permanent"
                classes={{
                    paper: "drawer-paper",
                }}
                anchor="left"
            >
                <div className="toolbar" />
                <List>
                    <Avatar src={this.state.user.image} className="side-avatar" />
                    <ListItemText primary={this.state.user.name} />
                    <ListItemText secondary="30 followers" />
                    <ListItemText secondary="53 notes" />
                </List>
                <Divider />
                <List subheader={<ListSubheader>YOUR VIBES</ListSubheader>}>
                    <ListItem button key="favorites" component={RouterLink} to="/favorites">
                        <ListItemIcon> <FavIcon /> </ListItemIcon>
                        <ListItemText primary="Favorites" />
                    </ListItem>
                    <ListItem button key="graph" component={RouterLink} to="/graph">
                        <ListItemIcon> <GraphIcon /> </ListItemIcon>
                        <ListItemText primary="Graph" />
                    </ListItem>
                    <ListItem button key="followers" component={RouterLink} to="/followers">
                        <ListItemIcon> <FollowersIcon /> </ListItemIcon>
                        <ListItemText primary="Followers" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default connect(state => ({
    user: state.user,
}), {
})(SideNav);