import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Popup from '../components/Popup'
import Form from 'react-bootstrap/Form'
import AddForm from '../components/AddForm'


/**
 * 
 * @param {{
 *  name: string,
 *  students: [],
 *  id: string,
 *  AddStudent: function
 * }} props 
 */
export default function Educator(props) {
    const [showModal, setShowModal] = useState(0)

    function handleAddStudent() {
        setShowModal(1)
    }

    function handleClose() {
        setShowModal(0)
    }

    //TODO - POST add student to educator
    function AddStudent(value) {
        // ...
        //HTTP GET GOES HERE
        props.AddStudent(value)
        handleClose()
    }

    let name = 'YOU';

    if (props.name) {
        name = props.name
    }

    let students;
    if (props.students) {
        props.students.map((s) => {
            // TODO getStudent info
            return (
                <Row>
                    <Col>
                        <Button>{s.name}</Button>
                    </Col>
                    <Col>
                        In {s.classes.length} classes
                    </Col>
                </Row>
            )
        })
    }

    return (
        <Container>
            <h1>Hello {name}</h1>
            {students}
            <Button onClick={() => handleAddStudent()}>Add Student</Button>
            {showModal ?
                <Popup title="Add Student" handleClose={handleClose}>
                    <AddForm label="Add Student" handleSubmit={AddStudent} />
                </Popup> : ''}
        </Container>
    )
}
