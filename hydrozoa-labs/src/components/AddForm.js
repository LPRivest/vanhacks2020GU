import React, { useState } from 'react'
import Popup from '../components/Popup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function AddForm(props) {
    const [formInput, setFormInput] = useState('')

    function handleSubmit() {
        // ...
        console.log(formInput)

        props.handleSubmit()
    }

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control value={formInput} type="text" size="sm" placeholder="1" onChange={(e) => setFormInput(e.target.value)} />
            <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
        </Form>
    )
}
