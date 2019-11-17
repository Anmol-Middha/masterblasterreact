import React, { Component } from 'react'
import axios from 'axios';
import * as d3 from 'd3';
import { Card, Form, Button, Row, Col} from 'react-bootstrap'; 

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
    componentDidMount(){
        this.fetchplayernames();
    }
    playerChangeEvent(event){
        this.setState({
            player: event.target.value
        })
    }
    fetchplayernames(){
        axios.post("https://masterblaster.herokuapp.com/comparison").
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
    removeComparison(e){
        let a = this.state.comparebox;
        a.splice(e.target.value, 1);
        
        this.setState({
            comparebox: a
        })
    }
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

    
    <Row style={{marginTop: "50px"}}>
        <Col md={4} id="Fifties">
            <Fifties comparedata={this.state.comparebox}></Fifties>
        </Col>
        <Col md={4}>
            <Centuries comparedata={this.state.comparebox}></Centuries>
        </Col>
        <Col md={4}>
            <Zeroes comparedata={this.state.comparebox}></Zeroes>
        </Col>
    </Row>

    <Row style={{marginTop: "50px"}}>
        <Col xs={12}><BatAvg comparedata={this.state.comparebox}></BatAvg></Col>
    </Row>

    <Row style={{marginTop: "50px"}}>
        <Col xs={12}><TotalRuns comparedata={this.state.comparebox}></TotalRuns></Col>
    </Row>
    
    </div>
    )}
}
