import React, { Component } from 'react';
import { history } from '../store';
import { loadProfileNotes } from '../actions/notes';
import '../styles/components/Notes.css';
import '../styles/components/UserPage.css';
import Notes from './Notes';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import Avatar from "@material-ui/core/Avatar/Avatar";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import { connect } from 'react-redux';
import { getUser } from '../actions/users';
import Link from "@material-ui/core/Link/Link";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedUser: null,
            rootUser: this.props.rootUser,
            notes: [],
            recents: [
                {name: 'Feel So Close - Radio Edit', artist: 'Calvin Harris', image_url: 'https://i.scdn.co/image/0c2d72aeb2d1a6d2026d791e2331abb8634fc536'},
                {name: 'One Dance', artist: 'Drake', image_url: 'https://i.scdn.co/image/53cade3f121243b5ba7a5747ff306bc220d41e59'},
                {name: 'Apparently', artist: 'J. Cole', image_url: 'https://i.scdn.co/image/176606ea8b00ee668e47de155c95a6fc1418bad6'},
                {name: 'Born To Be Yours', artist: 'Kygo', image_url: 'https://i.scdn.co/image/ba230e4737d90e652e42b7198b2c38157a3ed600'}
            ]
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        if(this.props.match.params.username === "me") {
            const username = this.props.rootUser.username;
            this.props.loadProfileNotes({username});
        }
        else {
            const name = this.props.match.params.username;
            const username = name;
            this.props.getUser(username);
            this.props.loadProfileNotes({username});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.rootUser !== prevProps.rootUser) {
            this.setState({rootUser: this.props.rootUser})
        }

        if (this.props.searchedUser !== prevProps.searchedUser) {
            this.setState({searchedUser: this.props.searchedUser})
        }

        if(this.props.notes !== prevProps.notes) {
            this.setState({notes: this.props.notes})
        }
    }



    render() {
        const username = this.props.match.params.username;
        const user =  username === "me"? this.state.rootUser : this.state.searchedUser;
        if(user == null) { return null; }
        return(
            <Card className="page">
                <div className="profile-header">
                    <CardMedia className="profile-photo" title="User profile photo" image="picture">
                        <Avatar src={user.image} className="profile-img"/>
                    </CardMedia>
                    <CardContent className="profile-details">
                        <Typography component="h2" variant="h2" align="left">
                            {user.name}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" align="left">
                            Vibing since {user.time_joined}
                        </Typography>
                        <Link component="button"
                              variant="body2"
                              onClick={() => {
                                  history.push(`/${username}/followers`);
                              }}>{user.num_followers} followers</Link>
                        <Link component="button"
                              variant="body2"
                              onClick={() => {
                                  history.push(`/${username}/following`);
                              }}>{user.num_following} following</Link>
                    </CardContent>
                </div>
                <Typography component="h4" variant="h4" align="left">
                    Recent Vibes
                </Typography>
                <div className="profile-recents">
                    {this.state.recents.map(function(item, key) {
                        return (
                            <Card className="recent-item">
                                <CardContent>
                                    <Avatar src={item.image_url} className="recent-img" />
                                    <Typography component="subtitle2" variant="subtitle2" align="center" >
                                        {item.name}
                                    </Typography>
                                    <Typography component="caption-text" variant="caption-text" align="center" >
                                        {item.artist}
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
                <Notes feed="profile" username={user.username} />
            </Card>
        );
    }
}

export default connect(state => ({
    rootUser: state.rootUser,
    notes: state.notes,
    searchedUser: state.users.searchedUser
}), {
    loadProfileNotes,
    getUser
})(UserPage);