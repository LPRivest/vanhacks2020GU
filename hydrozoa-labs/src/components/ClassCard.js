import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import AddForm from './AddForm'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Popup from './Popup'


/**
 *
 * @param {{
 *  name: string,
 *  course: string,
 *  teacher: string,
 *  students: [],
 *  AddContent: function
 * }} props
 */
export default function ClassCard(props) {
    const [addContent, setAddContent] = useState(0)

    function handleSubmit() {
        setAddContent(0)
    }

    function handleAddContent() {
        setAddContent(1)
    }

    let students = "No students";
    if (props.students) {
        students = props.students.map((s) => {
            return <Dropdown.Item>{s.name}</Dropdown.Item>
        })
    }

    return (
        <Popup title={props.title} handleClose={props.toggleModal}>
            <Container>
                {addContent ?
                    <AddForm onSubmit={handleSubmit} label="Add Content" />
                    : <>
                        <Row>
                            <Col>
                                Subject:
                        </Col>
                            <Col>
                                {props.courseID}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Grade:
                        </Col>
                            <Col>
                                PROPS.GRADE?
                        </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DropdownButton title="Students">
                                    {students}
                                </DropdownButton>
                            </Col>

                        </Row>
                        <Row><Col sm={12}>
                            <Button onClick={handleAddContent}>Add Lesson</Button>
                        </Col>
                        </Row>
                    </>
                }
            </Container>
        </Popup>
    )
}
