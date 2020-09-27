import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Nav from './components/Nav'
import { Switch, Route, Link } from 'react-router-dom'
import Educator from './pages/Educator'
import Teacher from './pages/Teacher'
import Parent from './pages/Parent';
import Student from "./pages/Student";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Switch>
          <Route path="/educator">
            <Educator />
          </Route>
          <Route path="/parent">
            <Parent />
          </Route>
          <Route path="/teacher">
            <Teacher classes={[
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

            ]}/>
          </Route>
          <Route path="/parent">
            <Parent />
          </Route>
          <Route path="/student">
            <Student studentProgress={[
                {
                    class: "Math A",
                    course: "Mathematics",
                    outcome: "Trigonometry",
                    lesson: "Unit circle",
                    status: "completed"
                },
                {
                    class: "Math B",
                    course: "Mathematics",
                    outcome: "Trigonometry",
                    lesson: "Special Angle Triangles",
                    status: "completed"
                }
            ]}  />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
