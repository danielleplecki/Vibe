import React, { Component } from 'react';
import '../styles/components/DiscoverPage.css';
import connect from "react-redux/es/connect/connect";
import { getFavorites } from "../actions/rootUser";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";

class FavoritesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rootUser: this.props.rootUser || {},
            showResults: false,
            favorites: this.props.favorites || []
        };
    }

    componentDidMount() {
        this.props.getFavorites();
    }

    componentDidUpdate(prevProps) {
        if(this.props.favorites !== prevProps.favorites) {
            this.setState({favorites: this.props.favorites, showResults: true})
        }
    }

    songDetails = (item) => {
        return(
            <div className="content-details">
                <Typography component="h4" variant="h4" align="left" >
                    {item.name}
                </Typography>
                <Typography component="caption-text" variant="caption-text" align="left">
                    {item.album_name}
                </Typography>
                <br/>
                <Typography component="h5" variant="h5" align="left" >
                    {item.artist}
                </Typography>
            </div>
        );
    };

    artistDetails = (item) => {
        return(
            <div className="content-details">
                <Typography component="h4" variant="h4" align="left" >
                    {item.name}
                </Typography>
            </div>
        );
    };

    populateResults = () => {
        let self = this;
        return(
            <div className="profile-recommended">
            {self.state.favorites.map(function(item, key){
              return (
                <Card className="recommended-item">
                    <CardContent>
                        <Avatar src={item.image_url} className="recommended-img" />
                        {item.type === "song"? self.songDetails(item): self.artistDetails(item)}
                    </CardContent>
                </Card>
              );
            })}
            </div>
        )};

    render() {
        return(
            <div className="page">
                <Typography component="h4" variant="h4" align="left">
                    Your Favorite Vibes
                </Typography>
                {this.state.showResults ?
                    this.populateResults() :
                    null
                }
            </div>
        );
    }
}

export default connect(state => ({
    favorites: state.rootUser.favorites,
}), {
    getFavorites
})(FavoritesPage);