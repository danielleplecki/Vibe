import React from 'react';
import { getTokenAndAuthorize, authorizeUser } from '../actions/rootUser';
import { connect } from 'react-redux';
import '../styles/components/Login.css';
import { history } from '../store';


const querystring = require('querystring');
const redirect_uri = window.location.hostname === 'localhost' ? "http://localhost:3000/login" : "http://sp19-cs411-52.cs.illinois.edu/login"
const client_id = "8adbd806dc8e4c88803ef47802693e4e";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code : undefined,
            gotToken: false,
            token: null,
            authorized: false
        };

        this.getTokenLinkOptions = this.getTokenLinkOptions.bind(this);
        this.swapCodeForToken = this.swapCodeForToken.bind(this);
        this.getAuthorizeLink = this.getAuthorizeLink.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.search);
        const code = params.get('code');
        if (code){
            this.setState({code : code})
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.authorized !== prevProps.authorized) {
            this.setState({authorized: this.props.authorized});
            history.push("/");
        }

        if (this.props.token !== prevProps.token) {
            this.setState({token: this.props.token})
        }
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
      this.swapCodeForToken();
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

    swapCodeForToken(){
        if(this.state.token) {
            const { token } = this.state;
            this.props.authorizeUser(token);
        }

        else if (this.state.code) {
            this.props.getTokenAndAuthorize(this.getTokenLinkOptions(this.state.code));
        }
    }

    render() {
        return(
            <div className="login">
            {this.swapCodeForToken()}
            <img src="https://s3-us-west-2.amazonaws.com/vibe-411-dev/background.png" class="loginimage"/>
            <div className="loginlogo">
              <label class="loginlabel">Vibe</label>
            </div>
            <div className="loginlinkdiv">
                <a href={this.getAuthorizeLink()} class='loginlink'>"Login With Spotify"</a>
            </div>
            </div>
        )
    }
}

export default connect(state => ({
    authorized: state.rootUser.authorized,
    token: state.rootUser.token
}), {
    authorizeUser,
    getTokenAndAuthorize
})(Login);
