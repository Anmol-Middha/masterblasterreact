import React, { Component } from 'react'
import axios from 'axios';
import {Image, Col, Row, Card, Nav, Tab, Table} from 'react-bootstrap';

import '../../../css/year.css'

export default class index extends Component {
    constructor(){
        super();
        this.state = {
            yeardata: [],
            err: {error: {}, message: ""}
        };
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData();
    }
    // fetching data from server
    fetchData(){
        axios.get('https://masterblaster.herokuapp.com/sachin/year', {headers:{
            'Content-Type': 'application/json'
        }})
        .then(rslt=>{
            this.setState({
                yeardata: rslt.data.yeardata,
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
            <Card style={{marginBottom: '50px', height: '500px', overflow: 'scroll'}}>
                <Card.Header><center><h5>Sachin's Every Year Performance</h5></center></Card.Header>
                <Table responsive bordered style={{margin: '0px'}}>
                <thead>
                    <th><center>YEAR</center></th>
                    <th><center>RUNS</center></th>
                    <th><center>MATCHES</center></th>
                    <th><center>BATTING AVG.</center></th>
                    <th><center>CENTURIES</center></th>
                </thead>
                <tbody>
                    {this.state.yeardata.map((record, index)=>{
                        for(var key in record){    
                        return <tr>
                        <td>{key}</td>
                        <td>{record[key].total_run}</td>
                        <td>{record[key].matches}</td>
                        <td>{record[key].bat_avg}</td>
                        <td>{record[key].centuries}</td>
                        </tr>
                    }})}
                </tbody>    
                </Table>    
            </Card>
        )
    }
}
