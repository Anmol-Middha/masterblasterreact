import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

import Tooltip from './Tooltip';
import Pie from './Pie.jsx';

export default class index extends Component {
    constructor(){
        super();
        this.state={
            groundData: [],
            pieData: [],
            error: {err: {}, message:""},
            sachinruns: "300",
            hoveredSlice: null,
        }
        this.handleRunsChangeEvent = this.handleRunsChangeEvent.bind(this);
        this.fetchdata = this.fetchdata.bind(this);
    }
    componentDidMount(){
        this.fetchdata();
    }
    // fetching data from server
    fetchdata(){
        var arr = [];
        axios.post('https://masterblaster.herokuapp.com/sachin/ground')
        .then(rslt=>{
            this.setState({
                groundData: rslt.data.data
            })
        })
        .catch(err=>{
            this.setState({
                error: {err, message: "data loading error"}
            });
        })
    }

    // updating the runs input into state
    handleRunsChangeEvent(e){
        this.setState({
            sachinruns: e.target.value
        });
    }

    // rendering component
    render() {
        //setting width and height according to veiwport
        let width = 1350;
        let height = 600;
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * .9) / 2;
        // Centers the pie chart
        let x = width / 2;
        let y = height / 2;
        return (
            <Card>
                <Card.Header><center><h5>Grounds where Sachin scored more than &nbsp;
                    <span>
                        <input type="text" value={this.state.sachinruns} onChange={this.handleRunsChangeEvent}></input>
                    </span> &nbsp; runs in his career</h5></center></Card.Header>
                <Card.Body>
                <svg style={{marginLeft: "auto", marginRight: "auto",  minWidth: '300px', minHeight: '600px', width: '100%', height:'100%'}}>
                    {/* Pie component */}
                    <Pie x={x} y={y} 
                    radius={radius} 
                    data={ this.state.groundData.map(d =>{ return (d.runs > parseInt(this.state.sachinruns))? d : null}) } 
                    innerRadius={radius * .35}
                    outerRadius={radius}
                    cornerRadius={7}
                    padAngle={.02}
                    onMouseOverCallback2={datum => this.setState({hoveredSlice: {"ground":datum["ground"], "x": x, "y": y}})}
                    onMouseOutCallback2={datum => {this.setState({hoveredSlice: null})}}/>
                </svg>   
                {
                    this.state.hoveredSlice ?
                    <Tooltip
                        hoveredSlice={this.state.hoveredSlice}
                    /> :
                    null
                }
                </Card.Body>    
            </Card>
        )
    }
}
