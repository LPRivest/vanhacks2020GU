import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavItem from 'react-bootstrap/esm/NavItem'
import { Switch, Route, Link } from 'react-router-dom'

export default function Navigation(props) {
    return (
        <Navbar bg="light" expand="md">
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    <Nav.Item eventkey={1} href="/">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item eventkey={2} href="/">
                        <Nav.Link as={Link} to="/student">Student</Nav.Link>
                    </Nav.Item>
                    <Nav.Item eventkey={3} href="/">
                        <Nav.Link as={Link} to="/parent">Parent</Nav.Link>
                    </Nav.Item>
                    <Nav.Item eventkey={4} href="/">
                        <Nav.Link as={Link} to="/educator">Educator</Nav.Link>
                    </Nav.Item>
                    <Nav.Item eventkey={5} >{props.name}</Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
