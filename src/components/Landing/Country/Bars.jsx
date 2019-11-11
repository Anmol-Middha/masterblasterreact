import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { interpolateLab } from 'd3-interpolate'

export default class Bars extends Component {
  constructor(props) {
    super(props)

    this.colorScale = scaleLinear()
      .domain([0, 4000])
      .range(['#F3E5F5', '#7B1FA2'])
      .interpolate(interpolateLab)
  }

  render() {
    const { scales, margins, data, svgDimensions } = this.props
    const { xScale, yScale } = scales
    const { height } = svgDimensions

    // create bars for each data element
    const bars = (
      data.map(datum =>{
          for(let k in datum){
            return <rect
                key={k}
                x={xScale(k)}
                y={yScale(datum[k])}
                height={height - margins.bottom - scales.yScale(datum[k])}
                width={xScale.bandwidth()}
                fill={this.colorScale(datum[k])}
                onMouseOver={() => this.props.onMouseOverCallback(datum)}
                onMouseOut={() => this.props.onMouseOutCallback(null)}
            />
          }
      },)
    )
    
    // rendering bars
    return (
      <g>{bars}</g>
    )
  }
}