import React, { Component } from "react";

// import helpers from "../../Utils/helpers.js";

import { Panel } from "react-bootstrap";

import "./style.css";

class StatsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wins: 0,
      losses: 0,
      played: 0
    };
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Stats</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="statsWrap">
            <img src="/img/play1.png" alt="games played" />
            <p>{this.state.played}</p>
            <h5>Games Played</h5>
          </div>
          <div className="statsWrap">
            <img src="/img/wins2.png" alt="wins" />
            <p>{this.state.wins}</p>
            <h5>Games Won</h5>
          </div>
          <div className="statsWrap">
            <img src="/img/lose1.png" alt="losses" />
            <p>{this.state.losses}</p>
            <h5>Games Lost</h5>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default StatsPanel;
