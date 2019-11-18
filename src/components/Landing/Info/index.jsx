import React, { Component } from 'react'
import axios from 'axios';
import {Image, Col, Row, Card, Nav, Tab} from 'react-bootstrap';
import "../../../css/info.css";

export default class index extends Component {
    //constructor
    constructor(){
        super();
        this.state = {
            infodata: {},   //state to store the data from server
            err: {error: {}, message: ""}
        };
        this.fetchData = this.fetchData.bind(this); 
    }
    //Everytime when page renders
    componentDidMount(){
        this.fetchData();
    }
    // fetching data from server
    fetchData(){
        axios.get('https://masterblaster.herokuapp.com/sachin/info', {headers:{
            'Content-Type': 'application/json'
        }})
        .then(rslt=>{
            this.setState({
                infodata: rslt.data,
                err: {},
            })
        })
        .catch(err =>{
            this.setState({
                yeardata: {},
                err: {error: err, message: "data loading error"}
            })
        })
    }
    render() {
        return (
            <Card style={{marginBottom: '50px'}}>
            <Card.Body>
            <Row>
                
            {/* Sachin portfolio */}
            <Col xs={12} md={3} className="sachin-image">
                <div>
                    <center><Image src="./sachin.jpeg" roundedCircle thumbnail fluid /></center>
                    <br/>
                    <h2><center><p> Sachin Tendulkar </p></center></h2>
                </div>
            </Col>

            {/* sachin portfoli nav tabs */}
            <Col xs={12} md={9}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="bat">
                <Nav variant="tabs" className="flex-column info-tabs" bg="dark">
                    <Row>
                        <Col xs={6} id="nav-items-bat">
                            <Nav.Item>
                            <Nav.Link eventKey="bat"><center><h4>Batting</h4></center></Nav.Link>
                            </Nav.Item>
                        </Col>
                        <Col xs={6} id="nav-items-bowl">
                            <Nav.Item>
                            <Nav.Link eventKey="wicket"><center><h4>Wickets</h4></center></Nav.Link>
                            </Nav.Item>
                        </Col>
                    </Row>
                </Nav>
                <Tab.Content>

                    {/* batting tab content */}
                    <Tab.Pane eventKey="bat">
                        <Row style={{marginTop: '40px', marginBottom: '40px'}}>
                            <Col xs={4}>
                                <h5 className ="text-muted">Runs</h5>
                                <h4 style={{color: "#8ec74a"}}>{this.state.infodata.total_run}</h4>
                            </Col>

                            <Col xs={4}>
                                <h5 className ="text-muted">Highest Score</h5>
                                <h4 style={{color: "#8ec74a"}}>{this.state.infodata.hs}</h4>
                            </Col>

                            <Col xs={4}>
                                <h5 className ="text-muted">Batting Avg</h5>
                                <h4 style={{color: "#8ec74a"}}>{this.state.infodata.bat_avg}</h4>
                            </Col>
                        </Row>
                        <Row style={{marginTop: '40px', marginBottom: '40px'}}>
                            <Col xs={4}>
                                <h5 className ="text-muted">200s</h5>
                                <h4 style={{color: "#8ec74a"}}>{this.state.infodata.two_hundreds}</h4>
                            </Col>

                            <Col xs={4}>
                                <h5 className ="text-muted">Centuries</h5>
                                <h4 style={{color: "#8ec74a"}}>{this.state.infodata.centuries}</h4>
                            </Col>

                            <Col xs={4}>
                                <h5 className ="text-muted">Fifties</h5>
                                <h4 style={{color: "#8ec74a"}}>{this.state.infodata.fifties}</h4>
                            </Col>
                        </Row>
                    </Tab.Pane>

                    {/* bowling tab content */}
                    <Tab.Pane eventKey="wicket">
                    <Row style={{marginTop: '40px', marginBottom: '40px'}}>
                        <Col xs={6}>
                            <h5 className ="text-muted">Wickets</h5>
                            <h4 style={{color: "#8ec74a"}}>{this.state.infodata.wickets}</h4>
                        </Col>
                        <Col xs={6}>
                            <h5 className ="text-muted">Bowling Avg</h5>
                            <h4 style={{color: "#8ec74a"}}>{this.state.infodata.bowl_avg}</h4>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '40px', marginBottom: '40px'}}>
                        <Col xs={6}>
                            <h5 className ="text-muted">Catches</h5>
                            <h4 style={{color: "#8ec74a"}}>{this.state.infodata.catch}</h4>
                        </Col>
                        <Col xs={6}>
                            <h5 className ="text-muted">Stumps</h5>
                            <h4 style={{color: "#8ec74a"}}>{this.state.infodata.stump}</h4>
                        </Col>
                    </Row>
                    </Tab.Pane>
                </Tab.Content>    
            </Tab.Container>
            </Col>
            </Row>
            </Card.Body>
            </Card>
        )
    }
}
