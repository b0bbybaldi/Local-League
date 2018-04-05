import React from "react";
import { LogoutBtn } from "../Components/Buttons";
import { Search } from "../Components/Maps";
import { NavPanel, CalendarPanel } from "../Components/Panels";
import { Grid, Row, Col } from "react-bootstrap";
//import { GameForm }from '../Components/Form';

const CreateGame = props => {
  return (
    <div className="gameWrap">
      <Grid>
        <Row className="container">
          <Col xs={12} sm={12} md={4} lg={4}>
            <NavPanel />
            <CalendarPanel />
          </Col>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Search />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default CreateGame;
