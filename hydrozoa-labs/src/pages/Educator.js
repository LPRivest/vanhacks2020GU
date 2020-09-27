import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTemplate from '../components/PageTemplate'


export default function Educator(props) {

    let classes = props.classes.map((clas) => {
        return (
            <Row><Col>
                <ClassHelper
                    class={clas.name}
                    lastUpdated={clas.lastUpdated}
                />
            </Col></Row>
        )
    })

    return (
        <PageTemplate>
            {classes}
        </PageTemplate>
    )
}


function ClassHelper(props) {
    return <><Button>{props.class}</Button>Last Updated: {props.lastUpdated}</>
}