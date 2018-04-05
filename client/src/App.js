import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import helpers from "./Utils/helpers.js";

import { Login, Dashboard, CreateGame, JoinGame } from "./Pages";

class App extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {};
  }

  componentDidMount() {
    var t = this;
    helpers.getStatus(t);
  }

  render() {
    var isLoggedIn = document.cookie.length > 0;
    console.log("\n#####isLoggedIn", isLoggedIn, this.state.status);

    if (this.state.status === false) {
      return (
        <Router>
          <Switch>
            <Route path="*" component={Login} />
          </Switch>
        </Router>
      );
    }

    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/creategame" component={CreateGame} />
            <Route exact path="/joingame" component={JoinGame} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
