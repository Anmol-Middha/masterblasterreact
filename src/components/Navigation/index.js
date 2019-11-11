import React, { Component } from 'react'
import {Nav, Navbar} from 'react-bootstrap';

export default class index extends Component {
    render() {
        return (
            <div>
                {/* Navigation bar  */}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="./">
                    <img
                        src="/logo30.png"   //logo
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                    </Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="./">Home</Nav.Link>
                    <Nav.Link href="./comparison">Comparison</Nav.Link>
                    </Nav>
                </Navbar>
                <br />
            </div>
        )
    }
}
