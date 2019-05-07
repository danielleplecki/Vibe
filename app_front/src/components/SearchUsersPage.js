import React from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../actions/users';
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

class SearchUsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            selectedIndex: -1
        };

    }

    componentDidMount() {
        this.setState({ loading: true });
        const name = this.props.match.params.query;
        this.props.searchUsers({name});
    }

    componentDidUpdate(prevProps) {
        if(this.props.users !== prevProps.users) {
            this.setState({users: this.props.users})
        }
    }

    handleListItemClick = (event, index) => {
        const user = this.state.users[index].username;
        history.push(`/${user}`);
    };

    render() {
        let self = this;
        return(
            <Card className="page">
                <List component="nav">
                    {self.state.users.map(function(item, key) {
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
    users: state.users.users
}), {
    searchUsers
})(SearchUsersPage);