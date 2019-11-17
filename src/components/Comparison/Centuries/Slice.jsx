import React, { Component } from 'react'
import * as d3 from 'd3';

export default class Slice extends Component {
    render() {
        let {value, label, fill, innerRadius = 100, outerRadius, cornerRadius, padAngle} = this.props;
        // set all props to each arc
        let arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .cornerRadius(cornerRadius)
          .padAngle(padAngle);
        return (
          <g>
          {/* path for each arc */}
          <path d={arc(value)} fill={fill}
           onMouseOver={(e)=>{
            this.props.onMouseOverCallback({"name": this.props.playername});
            e.target.style.opacity = 0.5}
          }
          onMouseOut={(e)=>{
            this.props.onMouseOutCallback({});
            e.target.style.opacity = 1;
          }}>
          </path>
          {/* label for each arc */}
          <text transform={`translate(${arc.centroid(value)})`}
                dy=".35em"
                textAnchor="middle"
                fill="white"
                >
            {label}
          </text>
          </g>
        );
      }
}
