import React from 'react';
import { Graph } from 'react-d3-graph';
import { getGraph } from '../actions/rootUser';
import {connect} from "react-redux";
import {deleteNote, editNote, loadProfileNotes, loadTimelineNotes} from "../actions/notes";

class GraphPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            graph: null
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.props.getGraph();
    }

    componentDidUpdate(prevProps) {
        if(this.props.graph !== prevProps.graph) {
            this.setState({graph: this.props.graph, loading: false})
        }
    }

    render() {
        const myconfig = {
            height: 800,
            width: 1250,
            directed: true,
            link: {
                highlightColor: "lightblue"
            }
        };

        if(this.state.loading) { return null; }

        return(
            <div className="page">
                <div className="graph">
                    <Graph
                        id="graph"
                        data={this.state.graph}
                        config={myconfig}
                    />
                </div>
            </div>
        )
    }

}

export default connect(state => ({
    graph: state.rootUser.graph
}), {
    getGraph
})(GraphPage);