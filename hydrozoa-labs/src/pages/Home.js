import React from "react";
import {Button, Form} from "react-bootstrap";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function Home() {
    function handleClick(e) {

        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                alert(xhr.responseText)
            }
        })
        xhr.open('POST', "http://localhost:3001/" + document.getElementById("endpointname").value)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(document.getElementById("endpointbody").value)
    }

    let data = "test";

    function getInfo(endpointType, JSONBody) {

        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                alert(xhr.responseText)
            }
        })
        xhr.open('POST', "http://localhost:3001/" + endpointType)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(JSONBody)
    }

    let results = {"id":2,"name":"Tessa","classes":[]}

    return <> <h2>Home</h2>
        Endpoint name: <input type="text" id="endpointname" /><br /><br />
        JSON body: <input type="text" id="endpointbody" /><br /><br />
        <button onClick={handleClick} style={{ marginTop: "40px" }}>Submit API request</button>
        <Row><Col><h3 style={{ marginTop: "40px" }}>User Login:</h3></Col></Row>

        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>User Type</Form.Label>
                <Form.Control as="select" custom>
                    <option>Educator</option>
                    <option>Teacher</option>
                    <option>Parent</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>


        <div>
            <Button
                variant={"outline-secondary"}
                onClick={ () => getInfo('geteducator', '{"educatorID": 1}')}
                style={{ marginTop: "40px" }}
            >
                Educator
            </Button>
        </div>
        <div>
            <Button
                variant={"outline-secondary"}
                onClick={ () => getInfo('getteacher', '{"teacherID": 2}')}
                style={{ marginTop: "40px" }}
            >
                Teacher
            </Button>
        </div>
        <div>
            <Button
                variant={"outline-secondary"}
                onClick={ () => getInfo('getteacher', '{"teacherID": 2}')} style={{ marginTop: "40px" }}
            >
                Parent
            </Button>
        </div>

    </>;



}
