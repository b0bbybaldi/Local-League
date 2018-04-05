import React from "react";

import {
  AccountPanel,
  NavPanel,
  StatsPanel,
  CalendarPanel,
  FavPanel,
  WeatherPanel
} from "../Components/Panels";

import { Grid, Row, Col } from "react-bootstrap";

import "./style.css";

const Dashboard = props => {
  return (
    <div className="dashboardWrap">
      <Grid>
        <Row className="container">
          <Col xs={12} sm={12} md={4} lg={4}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <NavPanel />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <CalendarPanel />
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Row>
              <Col xs={12} m={12} md={12} lg={12}>
                <AccountPanel />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12}>
                <StatsPanel />
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
                <FavPanel />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
                <WeatherPanel />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
