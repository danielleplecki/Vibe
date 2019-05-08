import React from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../actions/users';
import { getFollows } from '../actions/follow';
import { history } from '../store';
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
import Card from "@material-ui/core/Card/Card";

class UserResultsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            rootUser: this.props.rootUser || {},
            users: [],
            follows: [],
            selectedIndex: -1
        };

    }

    componentDidMount() {
        this.setState({ loading: true });
        if(this.props.match.params.follow) {
            let username = this.props.match.params.username;
            if(username === "me"){
                username = this.state.rootUser.username;
                this.setState({ canEdit: true });
            }

            this.props.getFollows(username);
            if(this.props.match.params.follow === "followers") {
                this.setState({ title: "Followers" });
            }

            else {
                this.setState({ title: "Following" });
            }
        }

        else {
            this.setState({ title: "Search Results" });
            const name = this.props.match.params.query;
            this.props.searchUsers({name});
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.users !== prevProps.users) {
            this.setState({users: this.props.users, loading: false})
        }

        if(this.props.rootUser !== prevProps.rootUser) {
            this.setState({rootUser: this.props.rootUser, loading: false})
        }

        if(this.props.follows !== prevProps.follows) {
            this.setState({follows: this.props.follows, loading: false})
        }
    }

    handleListItemClick = (event, index) => {
        if(this.state.title === "Search Results") {
            const user = this.state.users[index].username;
            history.push(`/${user}`);
        }

        else if(this.state.title === "Followers") {
            const user = this.state.follows.followers[index].username;
            history.push(`/${user}`);
        }

        else {
            const user = this.state.follows.following[index].username;
            history.push(`/${user}`);
        }
    };

    render() {
        let self = this;
        if(this.state.loading) { return null; }

        let results = this.state.users;
        if(this.state.title === "Followers") {
            results = this.state.follows.followers;
        }

        else if(this.state.title === "Following") {
            results = this.state.follows.following;
        }

        return(
            <Card className="page">
                <h1>{this.state.title}</h1>
                <List component="nav">
                    {results.map(function(item, key) {
                        return (
                            <ListItem button
                                      key={key}
                                      selected={self.state.selectedIndex === key}
                                      className="content-item"
                                      onClick={event => self.handleListItemClick(event, key)}>
                                <ListItemAvatar>
                                    <Avatar src={item.image} />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography component="subtitle2" variant="subtitle2" align="center" >
                                        {item.name}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </Card>
        )
    }
}

export default connect(state => ({
    users: state.users.users,
    rootUser: state.rootUser,
    follows: state.follows.follows
}), {
    searchUsers,
    getFollows
})(UserResultsPage);