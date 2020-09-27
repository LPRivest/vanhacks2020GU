import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Modal from 'react-bootstrap/Modal'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/esm/Dropdown';



export default function ClassCard(props) {
    let title = '';
    if (props.title) {
        title = props.title;
    }

    const [show, setShow] = useState(1)

    function handleClose() {
        setShow(false);
        props.toggleModal('')
    }

    let students = "No students";
    if (props.students) {
        students = props.students.map((s) => {
            return <Dropdown.Item>{s.name}</Dropdown.Item>
        })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
