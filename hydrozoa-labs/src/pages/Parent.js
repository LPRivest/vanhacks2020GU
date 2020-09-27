import React, { useState } from 'react'
import Educator from './Educator'
import AddForm from '../components/AddForm'
import Button from 'react-bootstrap/Button'
import Popup from '../components/Popup'

export default function Parent() {
    const [showModal, setShowModal] = useState(0)
    //TODO - Parent needs to be able to see and create students

    function handleCreateStudent() {
        setShowModal(1)
    }
    function handleClose() {
        setShowModal(0)
    }
    function handleSubmit(value) {
        // ...
        //HTTP GET GOES HERE
        handleClose()
    }

    return (
        <div>
            <Educator />
            <Button onClick={() => handleCreateStudent()}>Create Student</Button>
            {showModal ?
                <Popup title="Create Student" handleClose={handleClose}>
                    <AddForm label="Create Student" handleSubmit={handleSubmit} />
                </Popup> : ''}
        </div>
    )
}
