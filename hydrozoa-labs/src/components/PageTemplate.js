import React from 'react'
import Container from 'react-bootstrap/Container'

export default function PageTemplate(props) {
    return (
        <Container fluid className="page">
            {props.children}
        </Container>
    )
}
