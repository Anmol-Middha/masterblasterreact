import React, { Component } from 'react'
import {Card, Row} from 'react-bootstrap';
import axios from 'axios';
import * as d3 from 'd3';

import '../../../css/treemap.css';

export default class index extends Component {
    constructor(){
        super();
        this.state = {
            teamdata: {},
            err: {err: {}, message: ""}
        }
        this.fetchdata = this.fetchdata.bind(this);
    }
    componentDidMount(){
        this.fetchdata();
	}
	// fetching data from server
    fetchdata(){
        axios.post('https://masterblaster.herokuapp.com/sachin/team')
        .then(rslt=>{
            this.setState({
                teamdata: rslt.data,
                err: {}
            })
        })
        .catch(err=>{
            this.setState({
                teamdata: {},
                err: {err, message: "data loading error"}
            })
        })
	}
	componentDidUpdate(){
		console.log(this.state.teamdata);
	}
	
	//rendering component
	render() {
	// modifying the data in the heirarichal format for treemap	
	let chartdata = {
		"name": "teamdata",
		"children": []
	}
	let d = this.state.teamdata.data;
	for(let i in d){
		let b = {
			"name": i,
			"children": []
		}
		for(let j in d[i]){
			b.children.push({"name": j, "value":d[i][j]})
		}
		chartdata.children.push(b);
	}	

	// declaring properties of chart
    let width = 100,
		height = 100, // % of the parent element
		
		x = d3.scaleLinear().domain([0, width]).range([0, width]),
		y = d3.scaleLinear().domain([0, height]).range([0, height]),
		
		color = d3.scaleOrdinal()	//color palette for chart
			.range(d3.schemeDark2
				.map(function(c) { 
					c = d3.rgb(c); 
					
					return c; 
				})
			),
		
		treemap = d3.treemap()	//treemap layout
			.size([width, height])
			.paddingInner(0)
			.round(false),
		
		nodes = d3.hierarchy(chartdata)	//getting nodes of heirarichal data
		.sum(function(d) { return d.value ? d.value : 0; }),

	currentDepth;
	treemap(nodes);	//binding data to treemap

	let chart = d3.select("#chart");
	let cells = chart	//creating cells for each level of heirarchy
		.selectAll(".node")
		.data(nodes.descendants())
		.enter()
		.append("div")
		.attr("class", function(d) { return "node level-" + d.depth; })
		.attr("title", function(d) { return d.data.name ? d.data.name : "null"; });

		//arranging positions of each cell
		cells	
		.style("left", function(d) { return x(d.x0) + "%"; })
		.style("top", function(d) { return y(d.y0) + "%"; })
		.style("width", function(d) { return x(d.x1) - x(d.x0) + "%"; })
		.style("height", function(d) { return y(d.y1) - y(d.y0) + "%"; }) 
		.style("background-color", function(d) { while (d.depth > 2) d = d.parent; return color(d.data.name); })
		.on("click", zoom)
		.append("p")
		.attr("class", "label")
		.text(function(d) { return d.data.name ? d.data.name : "---"; });

	// setting zoom function to zoom button
	let parent = d3.select(".up")
		.datum(nodes)
		.on("click", zoom);

	//function to zoom into next level of heirarchy
	function zoom(d) {
		currentDepth = d.depth;
		parent.datum(d.parent || nodes);
		
		x.domain([d.x0, d.x1]);
		y.domain([d.y0, d.y1]);
		
		let t = d3.transition()	//out transitions
			.duration(800)
			.ease(d3.easeCubicOut);
		
		cells	//rearrang position of cells
			.transition(t)
			.style("left", function(d) { return x(d.x0) + "%"; })
			.style("top", function(d) { return y(d.y0) + "%"; })
			.style("width", function(d) { return x(d.x1) - x(d.x0) + "%"; })
			.style("height", function(d) { return y(d.y1) - y(d.y0) + "%"; });
		
		cells // hide this depth and above
			.filter(function(d) { return d.ancestors(); })
			.classed("hide", function(d) { return d.children ? true : false });
		
		cells // show this depth + 1 and below
			.filter(function(d) { return d.depth > currentDepth; })
			.classed("hide", false);
	}
	return (
		<Card id="team" style={{marginBottom: '50px', minWidth: '1200px', minHeight: '600px'}}>
		<Card.Header><center><h5>Sachin runs and India Victory</h5></center></Card.Header>
		<Card.Body>
			<Row>
			<nav>
				<div class="up">&larr; UP</div>
			</nav>
			<div class="feature" id="chart" style={{maxHeight: '541px'}}></div>
			</Row>
		</Card.Body>
		</Card>
	)
	}
}