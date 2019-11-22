import React, { Component } from 'react'
import axios from 'axios';
import * as d3 from 'd3';
import { Card, Form, Button, Row, Col} from 'react-bootstrap'; 

// importing all the components of comparison module
import Fifties from '../Fifties';
import Centuries from '../Centuries';
import Zeroes from '../Zeroes';
import BatAvg from '../BatAvg';
import TotalRuns from '../TotalRuns';

export default class index extends Component {
    constructor(){
        super();
        this.state = {
            comparebox: ["SR Tendulkar (INDIA)", "BL Cairns (NZ)", "Wasim Akram (PAK)", "RT Ponting (AUS/ICC)"],
            player: "",
            allplayernames: [],
        }
        this.playerChangeEvent = this.playerChangeEvent.bind(this);
        this.fetchplayernames = this.fetchplayernames.bind(this);
        this.addToCompare = this.addToCompare.bind(this);   
        this.removeComparison = this.removeComparison.bind(this);   
        this.removeAllComparison = this.removeAllComparison.bind(this); 
    }
    // executes when page renders
    componentDidMount(){
        this.fetchplayernames();
    }
    // handle the change event of player name
    playerChangeEvent(event){
        this.setState({
            player: event.target.value
        })
    }
    // fetch all player names from server
    fetchplayernames(){
        axios.get("https://masterblaster.herokuapp.com/comparison").
        then(rslt=>{
            this.setState({
                allplayernames: rslt.data
            })
        })
        .catch(err=>{
            this.setState({
                err: {err, message: "data loading error"}
            })
        })
    }
    // add selected player to comparison array
    addToCompare(e){
        e.preventDefault();
        let a = this.state.comparebox;
        if(!this.state.comparebox.includes(this.state.player)){
            a.push(this.state.player);
        }
        else{
            alert(`${this.state.player} already selected`);
        }
    
        this.setState({
            comparebox: a,
            player: ""
        })
    }
    // remove selected player from comparison array
    removeComparison(e){
        let a = this.state.comparebox;
        a.splice(e.target.value, 1);
        
        this.setState({
            comparebox: a
        })
    }
    // remove all players from comparison array
    removeAllComparison(){
        this.setState({
            comparebox: []
        })
    }
    render() {
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    return (
    <div>
    <Card>
        <Card.Body style={{padding: '20px'}}>
        {/* Form to add players for comparison */}
        <Form onSubmit={this.addToCompare}>
            <Form.Group as={Row}>
                <Col md={8} xs={12}>
                    <Form.Control as="select" placeholder="Enter name of player" value={this.state.player} onChange={this.playerChangeEvent}>
                    <option default>Select Player</option>
                    {this.state.allplayernames.map(d=>{
                        return <option>{d["name"]}</option>
                    })}
                    </Form.Control>
                </Col>
                <Col md={2} xs={12}>
                    <Button type="button" variant="outline-success" block onClick={this.addToCompare}>Add to Compare</Button>
                </Col>
                <Col md={2} xs={12}>
                    <Button type="button" variant="outline-danger" block onClick={this.removeAllComparison}>Delete All</Button>
                </Col>
            </Form.Group>
            <hr></hr>
            {/* Comparison List */}
            <div>
                <Row>
                {this.state.comparebox.map((data, index)=>{
                    return (<Col xs={2}>
                        <Button variant="outline-light" size="sm" disabled block style={{backgroundColor: colorScale(index), color: "white"}}>  
                        {data}
                        <span>
                            <Button style={{position: "absolute", top:"0px", right: "15px"}} 
                                variant="link" 
                                style ={{color: "white"}}
                                type="button" 
                                size="sm" 
                                value={index}
                                onClick={this.removeComparison}
                            >&#10005;
                            </Button>
                        </span>
                        </Button>
                    </Col>)
                })}
                </Row>
            </div>
        </Form>
        </Card.Body>
    </Card>
    {/* Rendering Components */}
    <Row style={{marginTop: "50px"}}>
        {/* Rendering Fifties Components */}
        <Col md={4} id="Fifties">
            <Fifties comparedata={this.state.comparebox}></Fifties>
        </Col>
        {/* Rendering Centuries Components */}
        <Col md={4}>
            <Centuries comparedata={this.state.comparebox}></Centuries>
        </Col>
        {/* Rendering Zeroes Components */}
        <Col md={4}>
            <Zeroes comparedata={this.state.comparebox}></Zeroes>
        </Col>
    </Row>
    {/* Rendering BatAvg Components */}
    <Row style={{marginTop: "50px"}}>
        <Col xs={12}><BatAvg comparedata={this.state.comparebox}></BatAvg></Col>
    </Row>
    {/* Rendering TotalRuns Components */}
    <Row style={{marginTop: "50px"}}>
        <Col xs={12}><TotalRuns comparedata={this.state.comparebox}></TotalRuns></Col>
    </Row>
    </div>
    )}
}
