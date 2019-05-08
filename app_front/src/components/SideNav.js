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
import { getRootUser } from "../actions/rootUser";

class SideNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rootUser: undefined
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.getRootUser();
    }

    componentDidUpdate(prevProps) {
        if (this.props.rootUser !== prevProps.rootUser) {
            this.setState({rootUser: this.props.rootUser, loading: false});
        }
    }

    render() {
        if(this.state.loading){ return null; }
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
                    <Avatar src={this.state.rootUser.image} className="side-avatar" />
                    <ListItemText primary={this.state.rootUser.name} />
                    <ListItemText secondary={this.state.rootUser.num_followers + " followers"} />
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
                    <ListItem button key="followers" component={RouterLink} to="/me/followers">
                        <ListItemIcon> <FollowersIcon /> </ListItemIcon>
                        <ListItemText primary="Followers" />
                    </ListItem>
                </List>
            </Drawer>
        );
    }
}

export default connect(state => ({
    rootUser: state.rootUser,
}), {
    getRootUser
})(SideNav);