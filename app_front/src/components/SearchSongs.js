import React from 'react';
import { connect } from 'react-redux';
import { searchSongs } from '../actions/songs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

class SearchSongs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: props.loading || false,
            query: props.message || '' // props.message might need changed?
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    validate() {
        return !(this.state.query === '');
    }

    handleSubmit() {
        //Validate that there are no empty fields
        if(!this.validate()) {
            //POPUP ERROR
        }

        else {
            const { query } = this.state;
            this.props.searchSongs({
                query
            });

        }
    }

    render() {
        return(
            <div className="SearchSongs">
                <Card>
                    <form>
                        <TextField
                            id="songQuery"
                            label="Search.."
                            value={this.state.query}
                            onChange={this.handleChange}
                            margin="normal"
                            multiline={true}
                            fullWidth={true}
                        />
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Search
                        </Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default connect(null, {
    searchSongs
})(SearchSongs);
