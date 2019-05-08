import React, { Component } from 'react';
import { history } from '../store';
import { loadProfileNotes } from '../actions/notes';
import { loadRecents } from '../actions/songs';
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
import Divider from "@material-ui/core/Divider/Divider";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedUser: null,
            rootUser: this.props.rootUser,
            notes: [],
            recents: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        if(this.props.match.params.username === "me") {
            const username = this.props.rootUser.username;
            this.props.loadProfileNotes({username});
            this.props.loadRecents({username})
        }
        else {
            const name = this.props.match.params.username;
            const username = name;
            this.props.getUser(username);
            this.props.loadProfileNotes({username});
            this.props.loadRecents({username})
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
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

        if(this.props.recents !== prevProps.recents){
          this.setState({recents: this.props.recents})
        }
    }

    populateRecents  = () => {
      let self = this;
          return (
            <div className="profile-recents">
            {self.state.recents.map(function(item, key){
              return(
                <Card className="recent-item">
                    <CardContent>
                        <Avatar src={item.image_url} className="recent-img" />
                        <Typography component="subtitle2" variant="subtitle2" align="left" >
                            {item.name}
                        </Typography>
                        <Typography component="caption-text" variant="caption-text" align="left" >
                            {item.artist}
                        </Typography>
                    </CardContent>
                </Card>
              );
            })}
            </div>
          );
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
                <div>
                <Typography component="h4" variant="h4" align="center" className="divider">
                    Recent Vibes
                </Typography>
                  {this.state.recents ?
                    this.populateRecents() :
                    null
                  }
                </div>
                <Typography component="h4" variant="h4" align="center" className="divider">
                    Notes
                </Typography>
                <Notes feed="profile" username={this.props.match.params.username} />
            </Card>
        );
    }
}

export default connect(state => ({
    rootUser: state.rootUser,
    notes: state.notes,
    searchedUser: state.users.searchedUser,
    recents: state.recents
}), {
    loadProfileNotes,
    loadRecents,
    getUser
})(UserPage);