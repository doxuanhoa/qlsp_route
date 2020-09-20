import React from "react";
import "./App.css";
import Manage from "./components/Manage";
import FormInput from "./components/FormInput";
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
          <Route exact path="/" render={(props) => <Manage {...props} />} />
          <Route
            path="/input"
            component={(props) => <FormInput {...props} />}
          />
        </Switch>
        <Redirect to="/" />
      </div>
    </Router>
  );
}

export default App;
