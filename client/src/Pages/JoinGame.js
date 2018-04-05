import React, { Component } from "react";

import { Panel, Button, Grid, Row, Col } from "react-bootstrap";

import { NavPanel, JoinPanel, CalendarPanel } from "../Components/Panels";
//import { GameForm }from '../Components/Form';

class JoinGame extends Component {
  render() {
    return (
      <div className="gameWrap">
        <Grid>
          <Row className="container">
            <Col xs={12} sm={12} md={4} lg={4}>
              <NavPanel />
              <CalendarPanel />
            </Col>
            <Col xs={12} sm={12} md={8} lg={8}>
              <JoinPanel />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default JoinGame;
