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
      </div>
    </BrowserRouter>
  );
}
function Home() {
  return <h2>Home</h2>;
}

export default App;
