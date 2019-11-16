import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScalea = scaleLinear()
        .domain([0, 100])
        .range(['#c0dff7', '#085aa2'])
        .interpolate(interpolateLab)

    this.colorScaleb = scaleLinear()
        .domain([0, 100])
        .range(['#e0f3c9', '#6cb313'])
        .interpolate(interpolateLab)
    };
  

    render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    // create bars for each data element
    const barsa = (
      data.map(datum =>{
            return <rect
                key={datum["name"]}
                x={xScale(datum["name"])}
                y={yScale(datum["strike_rate"])}
                height={height - margins.bottom - scales.yScale(datum["strike_rate"])}
                width={xScale.bandwidth()}
                fill={this.colorScalea(datum["strike_rate"])}
                onMouseOver={(e) => {
                  this.props.onMouseOverCallback({"name":datum["name"], "value":datum["strike_rate"], "label":"Strike rate"})
                  e.target.style.opacity = 0.8;
                }}
                onMouseOut={(e) => {
                  this.props.onMouseOutCallback(null)
                  e.target.style.opacity = 1;
                }}
            />
      },)
    )
    const barsb=(
        data.map(datum=>{
            return <rect
                key={datum["name"]}
                x={xScale(datum["name"])}
                y={yScale(datum["bat_avg"])}
                height={height - margins.bottom - scales.yScale(datum["bat_avg"])}
                width={xScale.bandwidth()}
                fill={this.colorScaleb(datum["bat_avg"])}
                onMouseOver={(e) => {
                  this.props.onMouseOverCallback({"name":datum["name"], "value":datum["bat_avg"], "label":"Bat avg"})
                  e.target.style.opacity = 0.8;
                }}
                onMouseOut={(e) => {
                  this.props.onMouseOutCallback(null)
                  e.target.style.opacity = 1;
                }}
            />
        },)
    )
    
    // rendering bars
    return (
      <g>{barsa}{barsb}</g>
    )
  }
}