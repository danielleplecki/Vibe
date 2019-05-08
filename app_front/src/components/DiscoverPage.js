import React, { Component } from 'react';
import '../styles/components/DiscoverPage.css';
import connect from "react-redux/es/connect/connect";
import {getRecommended} from "../actions/rootUser";
import List from "@material-ui/core/List/List";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Typography from "@material-ui/core/Typography/Typography";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Card from "@material-ui/core/Card/Card";

class DiscoverPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rootUser: this.props.rootUser || {},
            showResults: false
        };

        this.getSongs = this.getSongs.bind(this);

    }

    getSongs() {
        this.props.getRecommended();
        // this.setState({showResults: true});
    }

    componentDidMount() {
        this.getSongs();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.rootUser !== prevProps.rootUser) {
            this.setState({rootUser: this.props.rootUser})
        }
    }

    populateResults = () => {
        let self = this;
        return(
            <div className="profile-recommended">
            {self.state.rootUser.recommended.map(function(item, key){
              return (
                <Card className="recommended-item">
                    <CardContent>
                        <Avatar src={item.image_url} className="recommended-img" />
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

            // <List component="nav">
            //     {self.state.rootUser.recommended.map(function(item, key) {
            //         return (
            //             <ListItem button
            //                       key={key}
            //                       selected={self.state.selectedIndex === key}
            //                       className="content-item"
            //                       onClick={event => self.handleListItemClick(event, key)}>
            //                 <ListItemAvatar>
            //                     <Avatar src={item.image_url} style={{ borderRadius: 0 }} />
            //                 </ListItemAvatar>
            //                 <ListItemText>
            //                     <Typography component="subtitle2" variant="subtitle2" align="center" >
            //                         {item.name}
            //                     </Typography>
            //                     <Typography component="caption-text" variant="caption-text" align="center" >
            //                         {item.artist}
            //                     </Typography>
            //                 </ListItemText>
            //             </ListItem>
            //         );
            //     })}
            // </List>
        )};

    render() {
        return(
            <div className="page">
            <Typography component="h4" variant="h4" align="left">
                Recommended Vibes
            </Typography>
            {this.state.rootUser.recommended ?
                this.populateResults() :
                null
            }
            </div>
        );
    }
}

export default connect(state => ({
    rootUser: state.rootUser,
}), {
    getRecommended
})(DiscoverPage);