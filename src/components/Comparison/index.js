import React, { Component } from 'react'
import {Container, Row, Jumbotron} from 'react-bootstrap';

import Search from './SearchBar';

export default class index extends Component {
    render() {
        return (
            // Rendering all components in container
            <Container style={{maxWidth: "1380px"}}>
                <Search style={{marginTop: '20px', marginBottom: '20px'}}/>
            </Container>
        )
    }
}
