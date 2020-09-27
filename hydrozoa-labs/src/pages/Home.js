import React from "react";

export default function Home() {
    function handleClick(e) {
        var xhr = new XMLHttpRequest()
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                alert(xhr.responseText)
            }
        })
        // TODO: Don't query localhost!!!
        xhr.open('POST', "http://localhost:3000/" + document.getElementById("endpointname").value)
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send(document.getElementById("endpointbody").value)
    }
    return <> <h2>Home</h2>
        Endpoint name: <input type="text" id="endpointname" /><br /><br />
        JSON body: <input type="text" id="endpointbody" /><br /><br />
        <button onClick={handleClick} style={{ marginTop: "40px" }}>Submit API request</button>
    </>;



}
