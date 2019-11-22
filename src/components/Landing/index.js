import React, { Component } from 'react'
import {Container} from 'react-bootstrap';

import Info from './Info';
import YearPerformance from './YearPerformance';
import Country from './Country'
import Team from './Team';
import Ground from './Ground';

export default class index extends Component {
    render() {
        return (
            // Rendering all components in container
            <Container style={{maxWidth: "1380px"}}>
                <Info style={{marginTop: '100px', marginBottom: '20px'}}/>  
                <YearPerformance style={{marginBottom: '20px'}}/>
                <Country style={{marginBottom: '20px'}}/>
                <Team style={{marginBottom: '20px'}}/>
                <Ground style={{marginBottom: '20px'}} />
                <div style={{height: '50px'}}></div>
            </Container>
        )
    }
}
