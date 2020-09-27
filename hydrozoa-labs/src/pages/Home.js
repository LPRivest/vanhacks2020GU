import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
    const [state, setstate] = useState('')

    function UpdateReq(val) {
        setstate(val)
    }

    let res;


    function handleClick(e) {
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                alert(xhr.responseText)
            }
        })
        // TODO: Don't query localhost!!!
        xhr.open('POST', "http://localhost:3001/" + document.getElementById("endpointname").value)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(document.getElementById("endpointbody").value)
    }

    function getInfo(request, JSONString) {

        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                alert(xhr.responseText);
                setstate(xhr.responseText)
            }
        })

        xhr.open('POST', "http://localhost:3001/" + request)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(JSONString);
    }

    let results = { "id": 2, "name": "Tessa", "classes": [] }

    return <> <h2>Home</h2>
        Endpoint name: <input type="text" id="endpointname" /><br /><br />
        JSON body: <input type="text" id="endpointbody" /><br /><br />
        <button onClick={handleClick} style={{ marginTop: "40px" }}>Submit API request</button>
        <div>
            <h2 style={{ marginTop: "40px" }}>Account Type:</h2>
        </div>
        <div>
            <Link as={Button} onClick={() => setTimeout(function () { getInfo('getteacher', '{ "teacherID": 2 }') }, 3000)
            } to={{ pathname: "/teacher", aboutProps: { res: state } }}>Educator</Link>
            {/* <Button variant={"outline-secondary"} onClick={() => getInfo('getteacher', '{ "teacherID": 2 }')} style={{ marginTop: "40px" }}>Educator</Button> */}
        </div>
        <div>
            <Link as={Button} onClick={getInfo} to={{ pathname: "/teacher", aboutProps: { name: 'Jakob' } }}>Teacher</Link>
            {/* <Button as={Link} to={{ pathname: "/teacher", aboutProps: { name: 'Jakob' } }} variant={"outline-secondary"} onClick={getInfo} style={{ marginTop: "40px" }}>Teacher</Button> */}
        </div>
        <div>
            <Button variant={"outline-secondary"} onClick={getInfo} style={{ marginTop: "40px" }}>Parent</Button>
        </div>

    </>;



}
