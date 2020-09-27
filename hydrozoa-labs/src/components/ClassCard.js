import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Popup from './Popup'



export default function ClassCard(props) {


    let students = "No students";
    if (props.students) {
        students = props.students.map((s) => {
            return <Dropdown.Item>{s.name}</Dropdown.Item>
        })
    }

    return (
        <Popup title={props.title} handleClose={props.toggleModal}>
            <Container>
                <Row>
                    <Col>
                        Subject:
                        </Col>
                    <Col>
                        PROPS.SUBJECT
                        </Col>
                </Row>
                <Row>
                    <Col>
                        Grade:
                        </Col>
                    <Col>
                        PROPS.GRADE
                        </Col>
                </Row>
                <Row>
                    <Col>
                        <DropdownButton title="Students">
                            {students}
                        </DropdownButton>
                    </Col>
                    <Col>
                        <Button>Add Student</Button>
                    </Col>

                </Row>
                <Row><Col sm={12}>
                    <Button>Add Lesson</Button>
                </Col>
                </Row>
            </Container>
        </Popup>
    )
}
