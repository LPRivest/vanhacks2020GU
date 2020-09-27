import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'


export default function ClassCard(props) {
    let title = '';
    if (props.title) {
        title = props.title;
    }

    const [show, setShow] = useState(1)

    // const handleClose = () => setShow(false);
    function handleClose() {
        setShow(false);
        props.toggleModal('')
    }
    // const handleOpen = () => setShow(true);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Yay it's working?
            </Modal.Body>
        </Modal>
    )
}
