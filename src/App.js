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
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Manage {...props} />}
          ></Route>
          {/* <Route path="/table" render={(props) => <Table {...props} />} /> */}
          <Route path="/table" />
          <Route
            path="/input"
            component={(props) => <FormInput {...props} />}
          />
          <Route
            path="/input"
            component={(props) => <FormInput {...props} />}
          />
          {/* <Route exact path="/home">
            <Manage  />
          </Route> */}
          <Route exact path="/home">
            <Manage />
          </Route>
        </Switch>
        <Redirect to="/home" />
      </div>
    </Router>
  );
}

export default App;
