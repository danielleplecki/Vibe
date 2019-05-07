import React from "react";
import connect from "react-redux/es/connect/connect";
import {authorizeUser} from "../actions/user";
import {Redirect, Route} from "react-router";

class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authorized: props.authorized
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.authorized !== prevProps.authorized) {
            this.setState({authorized: this.props.authorized})
        }
    }


    render() {
        const { component: Component, ...other } = this.props;
        return(
            <Route
                {...other}
                render={props =>
                    this.state.authorized ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />)}
            />
        )
    }
}

export default connect(state => ({
    authorized: state.user.authorized
}), {
})(PrivateRoute);