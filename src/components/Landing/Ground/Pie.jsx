import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import Slice from './Slice.jsx';

export default class Pie extends React.Component {
    constructor(props) {
      super(props);
      this.colorScale = d3.scaleOrdinal(d3.schemeCategory10); //color palette for chart
      this.renderSlice = this.renderSlice.bind(this);
    }
  
    render() {
      let {x, y, data} = this.props;
      let pie = d3.pie(); //pie layout
      return (
        <g transform={`translate(${x}, ${y})`}>
          {/* Render a slice for each data point */}
          {pie(data).map(this.renderSlice)}
        </g>
      );
    }
  
    renderSlice(value, i) {
      //rendering Slice Component
      return (
        <Slice key={i}
               outerRadius={this.props.radius}
               cornerRadius={this.props.cornerRadius}
               padAngle={this.props.padAngle}
               label={value.data}
               value={value}
               fill={this.colorScale(i)} />
      );
    }
  }