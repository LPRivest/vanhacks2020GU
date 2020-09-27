import React, { useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PageTemplate from '../components/PageTemplate'
import ClassCard from '../components/ClassCard'


export default function Teacher(props) {
    const [showModal, setShowModal] = useState(0)

    function handleClassClick(clas) {
        setShowModal(clas);
    }

    function handleClose() {
        setShowModal('')
    }


    let classes = props.classes.map((clas) => {
        return (
            <Row><Col>
                <ClassHelper
                    class={clas.name}
                    lastUpdated={clas.lastUpdated}
                    onClick={handleClassClick}
                />
            </Col></Row>
        )
    })

    let classModal = '';
    if (showModal) {
        classModal = <ClassCard title={showModal} toggleModal={handleClose} />
    }

    return (
        <PageTemplate>
            {classes}
            {classModal}
        </PageTemplate>
    )
}


function ClassHelper(props) {
    return <>
        <Button
            onClick={() => props.onClick(props.class)}>
            {props.class}
        </Button>
        Last Updated: {props.lastUpdated}
    </>
}