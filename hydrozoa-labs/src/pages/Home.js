import React from "react";
import {Button} from "react-bootstrap";

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

    function getInfo(request, JSONString){
        alert('clicked')
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                alert(xhr.responseText)
            }
        })

        xhr.open('POST', "http://localhost:3001/" + request)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(JSONString)

    }

    let results = {"id":2,"name":"Tessa","classes":[]}

    return <> <h2>Home</h2>
        Endpoint name: <input type="text" id="endpointname" /><br /><br />
        JSON body: <input type="text" id="endpointbody" /><br /><br />
        <button onClick={handleClick} style={{ marginTop: "40px" }}>Submit API request</button>
        <div>
            <h2 style={{ marginTop: "40px" }}>Account Type:</h2>
        </div>
        <div>
            <Button variant={"outline-secondary"} onClick={getInfo('getteacher', {"teacherID": 2})} style={{ marginTop: "40px" }}>Educator</Button>
        </div>
        <div>
            <Button variant={"outline-secondary"} onClick={getInfo} style={{ marginTop: "40px" }}>Teacher</Button>
        </div>
        <div>
            <Button variant={"outline-secondary"} onClick={getInfo} style={{ marginTop: "40px" }}>Parent</Button>
        </div>

    </>;



}
