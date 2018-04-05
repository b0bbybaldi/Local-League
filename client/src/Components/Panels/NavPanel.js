import React, { Component } from "react";

// import helpers from "../../Utils/helpers.js";

import { Panel } from "react-bootstrap";

import { LogoutBtn, NavBtn } from "../Buttons";

import "./style.css";

class NavPanel extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {}
  handleClick = e => {
    // access to e.target here
    let route = e.target.textContent.split(" ");
    route = route.join("").toLowerCase();
    if (route === "localleague") {
      window.location.href = "dashboard";
    } else {
      window.location.href = route;
    }
  };

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title
            className="logo"
            componentClass="h3"
            onClick={this.handleClick}
          >
            Local League
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <NavBtn name="create game" onClick={this.handleClick} />
          <NavBtn name="join game" onClick={this.handleClick} />
          <NavBtn name="game history" />
          <NavBtn name="soccer news" />
          <NavBtn name="local feed" />
          <LogoutBtn />
        </Panel.Body>
      </Panel>
    );
  }
}

export default NavPanel;
