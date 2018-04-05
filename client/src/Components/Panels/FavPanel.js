import React, { Component } from "react";

import helpers from "../../Utils/helpers.js";

import { Panel } from "react-bootstrap";

import "./style.css";

class FavPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: null,
      team: null
    };
  }
  componentDidMount() {
    const t = this;
    helpers.getUserFav(t);
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.team}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="teamWrap">
            <img src={this.state.icon} alt={this.state.team} />
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default FavPanel;
