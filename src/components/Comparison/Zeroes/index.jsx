import React, { Component } from 'react'
import {Card} from 'react-bootstrap';
import axios from 'axios';

import Pie from './Pie.jsx';

export default class index extends Component {
    constructor(props){
        super();
        this.state = {
            playersdata: [],
            foursdata:[],
            err: {err:{}, message:""}
        }
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
        axios.post('https://masterblaster.herokuapp.com/comparison/0s', {players})
        .then(rslt=>{
            this.setState({
                playersdata: rslt.data
            })
        })
        .catch(err=>{
            this.setState({
                err: {err, message:"data loading error"}
            })
        })
    }
    render() {
        let width = "400";
        let height = "600";
        let minViewportSize = Math.min(width, height);
        // This sets the radius of the pie chart to fit within
        // the current window size, with some additional padding
        let radius = (minViewportSize * .9) / 2;
        // Centers the pie chart
        let x = width / 2;
        let y = height / 2;
        return ( 
            <Card>
                <Card.Header><center><h5>Zeroes</h5></center></Card.Header>
                <Card.Body>
                <svg style={{marginLeft: "auto", marginRight: "auto",  minWidth: '300px', minHeight: '600px', width: '100%', height:'100%'}}>
                    {/* Pie component */}
                    <Pie x={x} y={y} 
                    radius={radius} 
                    data={ this.state.playersdata.map(d =>{ return d["zeroes"]}) } 
                    outerRadius={radius}
                    cornerRadius={7}
                    padAngle={.02}/>
                </svg>  
                </Card.Body>
            </Card>
        )
    }
}
