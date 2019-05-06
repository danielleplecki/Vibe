import React, { Component } from 'react';
import '../styles/components/Notes.css';
import '../styles/components/UserPage.css';
import Notes from './Notes';
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Card from "@material-ui/core/Card/Card";
import user from './default-user-img.jpg';
import Avatar from "@material-ui/core/Avatar/Avatar";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";

class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            recents: [
                {name: 'Feel So Close - Radio Edit', artist: 'Calvin Harris', image_url: 'https://i.scdn.co/image/0c2d72aeb2d1a6d2026d791e2331abb8634fc536'},
                {name: 'One Dance', artist: 'Drake', image_url: 'https://i.scdn.co/image/53cade3f121243b5ba7a5747ff306bc220d41e59'},
                {name: 'Apparently', artist: 'J. Cole', image_url: 'https://i.scdn.co/image/176606ea8b00ee668e47de155c95a6fc1418bad6'},
                {name: 'Born To Be Yours', artist: 'Kygo', image_url: 'https://i.scdn.co/image/ba230e4737d90e652e42b7198b2c38157a3ed600'}
            ]
        };
    }

    render() {
        return(
            <Card className="page">
                <div className="profile-header">
                    <CardMedia className="profile-photo" title="User profile photo">
                        <Avatar src={user} className="profile-img"/>
                    </CardMedia>
                    <CardContent className="profile-details">
                        <Typography component="h2" variant="h2" align="left">
                            Jon Snow
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary" align="left">
                            Vibing since 5/4/19
                        </Typography>
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
                <Notes />
            </Card>
        );
    }
}

export default UserPage;