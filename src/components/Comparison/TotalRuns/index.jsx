import React, { Component } from 'react'
import { scaleBand, scaleLinear } from 'd3-scale';
import {Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';

import Axes from './Axes.jsx';
import Bars from './Bars.jsx';

export default class index extends Component {
    constructor(props){
        super();
        this.state = {
            playersdata: [],
            foursdata:[],
            err: {err:{}, message:""}
        }
        this.xScale = scaleBand()
        this.yScale = scaleLinear()
        this.fetchdata = this.fetchdata.bind(this);
    }
    componentDidMount(){
        this.fetchdata(["SR Tendulkar (INDIA)"]);
    }
    
    componentWillReceiveProps(){
        this.setState({
            playersdata: this.props.comparedata
        })
    }
    
    componentWillUpdate(){
        this.fetchdata(this.props.comparedata);
    }

    fetchdata(players){
        axios.post('https://masterblaster.herokuapp.com/comparison/totalruns', {players})
        .then(rslt=>{
            this.setState({
                playersdata: rslt.data
            })
        })
        .catch(err=>{
            this.setState({
                err: {err, message: "Data Loading Error"}
            })
        })
    }

    render() {
        const margins = { top: 50, right: 20, bottom: 100, left: 100 };
        const svgDimensions = { width: 1282, height: 500 };
        let maxValue = 0;
        this.state.playersdata.map(d => {
            if(d.total_runs > maxValue){
                maxValue = d.total_runs;
            }
        });
    
        // scaleBand type
        const xScale = this.xScale
        .padding(0.5)
        // scaleBand domain should be an array of specific values
        .domain(this.state.playersdata.map(d => {return d["name"]}))
        .range([margins.left, svgDimensions.width - margins.right])
  
        // scaleLinear type
        const yScale = this.yScale
        // scaleLinear domain required at least two values, min and max       
        .domain([0, 20000])
        .range([svgDimensions.height - margins.bottom, margins.top])

        return ( 
            <Card style={{marginBottom: '50px'}}>
            <Card.Header><center><h5>Sachin vs Every Team</h5></center></Card.Header>
            <Row>
            
            {/* Creating Svg for Chart */}
            <svg style={{marginLeft: "auto", marginRight: "auto",  minWidth: '300px', maxWidth: '1500px', minHeight: '600px', width: '100%', height:'100%'}}>
                {/* Component to define axes of the chart */}
                <Axes
                    scales={{ xScale, yScale }}
                    margins={margins}
                    svgDimensions={svgDimensions}
                />
                {/* Component to define bars of bar chart */}
                <Bars
                    scales={{ xScale, yScale }}
                    margins={margins}
                    data={this.state.playersdata}
                    maxValue={maxValue}
                    svgDimensions={svgDimensions}
                    // onMouseOverCallback={datum =>{ 
                    //     for(let key in datum){
                    //         this.setState({
                    //             hoveredBar: datum[key]
                    //         })
                    //     } 
                    // }}
                    // onMouseOutCallback={() => this.setState({hoveredBar: null})}
                />
                {/* Labels on axis of bar chart */}
                <g>    
                    <text x={(svgDimensions.width/2)} y={svgDimensions.height} fill="black" width="64" height="16" fontSize="20">Players</text>
                    <text x="0" y="0" fill="black" textAnchor="start" transform="rotate(-90,100,100) translate(-100, 50)" fontSize="20">Total runs</text>
                </g>
            </svg>
            </Row>
        </Card>
        )
    }
}
