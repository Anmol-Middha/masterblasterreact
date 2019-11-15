import React, { Component } from 'react'
import axios from 'axios';
import Axes from './Axes.jsx';
import Bars from './Bars.jsx';
import Tooltip from './Tooltip.jsx';
import { scaleBand, scaleLinear } from 'd3-scale';
import {Row, Card} from 'react-bootstrap';

export default class index extends Component {   
    constructor(){
        super();
        this.state = {
            countrydata: [],
            hoveredBar: null,
            err:{err:{}, message: ""},
        }
        this.fetchdata = this.fetchdata.bind(this);
        this.xScale = scaleBand()
        this.yScale = scaleLinear()
        this.renderTooltip = this.renderTooltip.bind(this);
    }
    renderTooltip(props){
        console.log(this.state.hoveredBar);
        return <Tooltip {...props}>{"hello"}</Tooltip>
    }
    componentDidMount(){
        this.fetchdata();
    }
    fetchdata(){
        axios.post('https://masterblaster.herokuapp.com/sachin/country', {headers:{
            'Content-Type': 'application/json'
        }})
        .then(rslt=>{
            this.setState({
                countrydata: rslt.data,
                err: {err:{}, messsage:""}
            })
        })
        .catch(err=>{
            this.setState({
                countrydata: [],
                err: {err:{}, message:"data loading error"}
            })
        });
    }
    render() {
        const margins = { top: 50, right: 20, bottom: 100, left: 60 };
        const svgDimensions = { width: 1282, height: 500 };
        let maxValue = 0;
        this.state.countrydata.map(d => {
            for(let key in d){
                if(d[key]>maxValue){
                    maxValue = d[key];
                }
            }
        });
    
        // scaleBand type
        const xScale = this.xScale
        .padding(0.5)
        // scaleBand domain should be an array of specific values
        .domain(this.state.countrydata.map(d => {
            for(let key in d){
                return key;
            }
        }))
        .range([margins.left, svgDimensions.width - margins.right])
  
        // scaleLinear type
        const yScale = this.yScale
        // scaleLinear domain required at least two values, min and max       
        .domain([0, (maxValue+1000)-(maxValue%1000)])
        .range([svgDimensions.height - margins.bottom, margins.top])

        return (
        <Card style={{marginBottom: '50px'}}>
        <Card.Header><center><h5>Sachin vs Every Team</h5></center></Card.Header>
            <Row>
            
            {/* Creating Svg for Chart */}
            <svg style={{marginLeft: "auto", marginRight: "auto",  minWidth: '300px', maxWidth: '1250px', minHeight: '600px', width: '100%', height:'100%'}}>
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
                    data={this.state.countrydata}
                    maxValue={maxValue}
                    svgDimensions={svgDimensions}
                    onMouseOverCallback={datum => this.setState({hoveredBar: datum})}
                    onMouseOutCallback={datum => this.setState({hoveredBar: null})}
                />
                {/* Labels on axis of bar chart */}
                <g>    
                    <text x={(svgDimensions.width/2)} y={svgDimensions.height} fill="#7B1FA2" width="64" height="16">Opposition Team</text>
                    <text x="0" y="0" fill="#7B1FA2" textAnchor="start" transform="rotate(-90,100,100) translate(-100, 12)">Total runs by sachin</text>
                </g>
            </svg>
            {/* Tooltip on bars of chart */}
            { this.state.hoveredBar ?
            <Tooltip
                hoveredBar={this.state.hoveredBar}
                scales={{ xScale, yScale }}
            /> :
            null
            }
            </Row>
        </Card>
        )
    }
}
