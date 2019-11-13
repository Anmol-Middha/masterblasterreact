import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import { interpolateLab } from 'd3-interpolate';

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, 20000])
      .range(['#f5ccd1', '#d13f56'])
      .interpolate(interpolateLab)
  }

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
                y={yScale(datum["total_runs"])}
                height={height - margins.bottom - scales.yScale(datum["total_runs"])}
                width={xScale.bandwidth()}
                fill={this.colorScale(datum["total_runs"])}
                // onMouseOver={() => this.props.onMouseOverCallback(datum)}
                // onMouseOut={() => this.props.onMouseOutCallback(null)}
            />
      },)
    )
    
    // rendering bars
    return (
      <g>{barsa}</g>
    )
  }
}