import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import { Switch, Route, Link } from 'react-router-dom'
import Student from './pages/Student'
import Educator from './pages/Educator'
import Parent from './pages/Parent';

function App() {

  {/* API ENDPOINT TEST CODE: Uncomment the below to enable */ }




  return (
    <BrowserRouter>
      <div className="App">
        <Nav name="Joao"></Nav>
        <Switch>
          <Route path="/educator">
            <Educator classes={[
              {
                name: "Math A",
                course: "Mathematics",
                teacher: "You",
                lastUpdated: "Yesterday"
              },
              {
                name: "Math B",
                course: "Mathematics",
                teacher: "You",
                lastUpdated: "Last Week"
              }
            ]}
              userName="João" />
          </Route>
          <Route path="/parent">
            <Parent />
          </Route>
          <Route path="/student">
            <Student />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

        {/* API ENDPOINT TEST CODE: Uncomment the below to enable */}



      </div>
    </BrowserRouter>
  );
}
function Home() {
  function handleClick(e) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener('load', () => {
      if (xhr.status == 200) {
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

export default App;
