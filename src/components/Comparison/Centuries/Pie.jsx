import React from 'react';
import * as d3 from 'd3';
import Slice from './Slice.jsx';

export default class Pie extends React.Component {
    constructor(props) {
      super(props);
      this.colorScale = d3.scaleOrdinal(d3.schemeCategory10); //color palette for chart
    }
  
    render() {
      let {x, y, data} = this.props;
      let pie = d3.pie(); //pie layout
      let player = data.reduce(function(result, d) {  //retreiving grounds name
        if (d) {
          result.push(d.name);
        }
        return result;
      }, []);

      let piedata = data.reduce(function(result, d) {  //retreiving grounds name
        if (d) {
          result.push(d.hundreds);
        }
        return result;
      }, []);
      
      return (
        <g transform={`translate(${x}, ${y})`}>
          {/* Render a slice for each data point */}
          {pie(piedata).map((d, i)=>{
            return (
              <Slice key={i}
                outerRadius={this.props.radius}
                cornerRadius={this.props.cornerRadius}
                padAngle={this.props.padAngle}
                playername={player[i]}
                label={d.data}
                value={d}
                fill={this.colorScale(i)} 
                onMouseOverCallback={datum=>{this.props.onMouseOverCallback2(datum)}}      
                onMouseOutCallback={datum=>{this.props.onMouseOutCallback2(datum)}}/>
            );
          })}
        </g>
      );
    }
  }