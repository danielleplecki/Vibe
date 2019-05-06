import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';

const querystring = require('querystring');
const redirect_uri = "http://localhost:3000/login"
const client_id = "8adbd806dc8e4c88803ef47802693e4e";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          code : undefined,
          gotToken: false
        }
        this.getTokenLinkOption = this.getTokenLinkOptions.bind(this);
        this.swapCodeForToken = this.swapCodeForToken.bind(this);
        this.getAuthorizeLink = this.getAuthorizeLink.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getAuthorizeLink(){
      const scope = "user-read-private";
      const url = "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri
      });
      return url;
    }

    getTokenLinkOptions(code){
      return {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          code: code,
        })
      }
    }

    componentDidMount() {
      const params = new URLSearchParams(this.props.location.search);
      const code = params.get('code')
      if (code){
        this.setState({"code" : code})
      }
    }

    swapCodeForToken(){
      if (this.state.code) {
        fetch("http://sp19-cs411-52.cs.illinois.edu:5000/code", this.getTokenLinkOptions(this.state.code))
          .then(async response => {
            response.json().then( result => {
                fetch("http://sp19-cs411-52.cs.illinois.edu:5000/login", {
                  method: "POST",
                  credentials: 'include',
                  headers: {
                    "Content-Type": "application/json; charset=utf-8",
                  },
                  body: JSON.stringify({
                    "accessToken": result.token
                  })}).then(async response => {
                    //user has successfully logged in, maybe need to dispatch that somehow?
                    this.props.history.push("/");
                  }).catch(error => {
                    console.warn(error);
                  })
            }).catch(error => {
              console.warn(error);
            });
          })
      }
    }

    render() {
        return(
            <div className="Login">
            {this.swapCodeForToken()}
            <a href={this.getAuthorizeLink()}>"Login With Spotify"</a>
            </div>
        )
    }
}

export default Login
