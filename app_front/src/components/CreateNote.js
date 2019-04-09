import React from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions/notes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class CreateNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading || false,
            UID: 'aebrown22',
            msg: props.message || ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        let url = "http://sp19-cs411-52.cs.illinois.edu:5000/notes/" + this.props.UID;
        this.setState({ loading: true });
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => this.setState({
                loading: false,
                UID: data.UID,
                msg: data.msg
            }))
            .catch(err => {
                this.setState({ loading: false });
                console.error(err);
            });
    }


    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    validate() {
        return !(this.state.UID === '' || this.state.msg === '');
    }

    handleSubmit() {
        //Validate that there are no empty fields
        if(!this.validate()) {
            //POPUP ERROR
        }

        else {
            const { UID, msg } = this.state;
            this.props.createNote({
                UID,
                msg
            });

        }
    }

    render() {
        return(
            <div className="CreateNote">
                <Card>
                    <form>
                        <TextField
                            disabled
                            id="UID"
                            label="User"
                            defaultValue={this.state.UID}
                            margin="normal"
                            fullWidth={true}
                        />

                        <TextField
                            id="msg"
                            label="Note"
                            value={this.state.msg}
                            onChange={this.handleChange}
                            margin="normal"
                            multiline={true}
                            fullWidth={true}
                        />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Post
                        </Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default connect(null, {
    createNote
})(CreateNote);
