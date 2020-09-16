import React from "react";
import "./App.css";
import Manage from "./components/Manage";
import FormInput from "./components/FormInput";
import Table from "./components/RenderTable";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route exact path="/table">
            <Table />
          </Route>
          <Route exact path="/home">
            <Manage />
          </Route>
          <Route exact path="/input">
            <FormInput />
          </Route>
        </div>
      </Switch>
      <Redirect from="/" to="/home" />
    </Router>
  );
}

export default App;
