import React from 'react';
import { Graph } from 'react-d3-graph';

class VisGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const d = {
            "nodes": [
                {
                    "id": "testuser1",
                    "name": "testuser1",
                    "svg": "https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg"
                },
                {
                    "id": "aebrown22",
                    "name": "aebrown22",
                    "svg": "https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg"
                },
                {
                    "id": "Red Hot Chili Peppers",
                    "name": "Red Hot Chili Peppers",
                    "svg": "https://i.scdn.co/image/9527e700b5c80aa67350d5de0da10a0aa754fcb1"
                },
                {
                    "id": "Tell Me Baby",
                    "name": "Tell Me Baby",
                    "svg": "https://i.scdn.co/image/49d5dd41404224772cecfff55233fbfeb4de8628"
                },
                {
                    "id": "Tear",
                    "name": "Tear",
                    "svg": "https://i.scdn.co/image/39577b5613c625bd98e53ba74963be0a98bdd857"
                },
                {
                    "id": "No Chump Love Sucker",
                    "name": "No Chump Love Sucker",
                    "svg": "https://i.scdn.co/image/b2f1380da5bf2b457f16e559d4c35dfec39e01fb"
                },
                {
                    "id": "testuser2",
                    "name": "testuser2",
                    "svg": "https://www.ibts.org/wp-content/uploads/2017/08/iStock-476085198.jpg"
                },
                {
                    "id": "Red Hot Chili Peppers",
                    "name": "Red Hot Chili Peppers",
                    "svg": "https://i.scdn.co/image/9527e700b5c80aa67350d5de0da10a0aa754fcb1"
                },
                {
                    "id": "My Friends",
                    "name": "My Friends",
                    "svg": "https://i.scdn.co/image/2888c8e1deee04f86182d3d5f1a9b3dd2d88f5d5"
                },
                {
                    "id": "No Chump Love Sucker",
                    "name": "No Chump Love Sucker",
                    "svg": "https://i.scdn.co/image/b2f1380da5bf2b457f16e559d4c35dfec39e01fb"
                }
            ],
            "links": [
                {
                    "source": "testuser1",
                    "target": "aebrown22",
                    "color": "red"
                },
                {
                    "source": "testuser1",
                    "target": "Red Hot Chili Peppers",
                    "color": "green"
                },
                {
                    "source": "testuser1",
                    "target": "Tell Me Baby",
                    "color": "blue"
                },
                {
                    "source": "testuser1",
                    "target": "Tear",
                    "color": "blue"
                },
                {
                    "source": "testuser1",
                    "target": "No Chump Love Sucker",
                    "color": "blue"
                },
                {
                    "source": "aebrown22",
                    "target": "testuser2",
                    "color": "red"
                },
                {
                    "source": "aebrown22",
                    "target": "Red Hot Chili Peppers",
                    "color": "green"
                },
                {
                    "source": "aebrown22",
                    "target": "My Friends",
                    "color": "blue"
                },
                {
                    "source": "aebrown22",
                    "target": "No Chump Love Sucker",
                    "color": "blue"
                }
            ]
        };

        const myconfig = {
            height: 800,
            width: 1250,
            directed: true,
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