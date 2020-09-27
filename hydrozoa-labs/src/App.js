import React from 'react';
import logo from './logo.svg';
import './App.css';

var STATUS_OK = 200

function App() {

  function handleClick(e) {
      var xhr = new XMLHttpRequest()
      xhr.addEventListener('load', () => {
          if (xhr.status == STATUS_OK){
              alert(xhr.responseText)
          }
      })
      // TODO: Don't query localhost!!!
      xhr.open('POST', "http://localhost:3000")
      xhr.send()
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={handleClick} style={{marginTop: "40px"}}>Send test request</button>
      </header>
    </div>
  );
}

export default App;
