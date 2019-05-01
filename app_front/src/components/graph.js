import React from 'react';
import { Graph } from 'react-d3-graph';

class VisGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const d = {
            nodes: [{id: "user", color: "red"}, {id: "artist",color: "blue"}],
            links: [{source: "user", target: "artist", color:"blue"}]
        };

        const myconfig = {
            link: {
                highlightColor: "lightblue"
            }
        };

        return(
            <div className="graph">
                <Graph
                    id="graph"
                    data={d}
                    config={myconfig}
                />
            </div>
        )
    }

}

export default VisGraph;