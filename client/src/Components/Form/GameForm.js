import React, { Component } from "react";

import GMap from "../Maps/Map.js";

import {
  Forms,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Checkbox
} from "react-bootstrap";

//import 'rc-time-picker/assets/index.css';

import DatePicker from "react-datepicker";

import moment from "moment";

//import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";

import helpers from "../../Utils/helpers.js";

const format = "h:mm a";

const now = moment()
  .hour(0)
  .minute(0);

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DateTime: moment(),
      playerCount: 0,
      teamOne: "Team A",
      teamTwo: "Team B",
      checklist: [],
      searchLocation: {
        address: "",
        id: "",
        name: ""
      }
    };
    this.dateTimeChange = this.dateTimeChange.bind(this);
  }

  onMarkerClick = info => {
    let that = this;
    // console.log(info);
    this.setState({
      searchLocation: {
        address: info.address,
        id: info.id,
        name: info.name
      }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleGameItems = e => {
    const { name, value } = e.target;
    let newelement = value;
    this.setState(prevState => ({
      checklist: [...prevState.checklist, newelement]
    }));
  };

  preventDefault = e => {
    e.preventDefault();
  };

  formSubmit = () => {
    //console.log("create", this.state)
    helpers.creatNewGame(this);
    // this.state.reset();
  };

  dateTimeChange = date => {
    this.setState({
      DateTime: date
    });
    //console.log(this.state.DateTime);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.preventDefault}>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Select a date and time</ControlLabel>
            <DatePicker
              selected={this.state.DateTime}
              onChange={this.dateTimeChange}
              showTimeSelect
              dateFormat="LLL"
            />
            <ControlLabel>Number of players required</ControlLabel>
            <FormControl
              type="number"
              value={this.state.playerCount}
              name="playerCount"
              placeholder={this.state.playerCount}
              onChange={this.handleChange}
            />
            <ControlLabel>Give a name for the first team</ControlLabel>
            <FormControl
              type="text"
              value={this.state.teamOne}
              name="teamOne"
              placeholder={this.state.teamOne}
              onChange={this.handleChange}
            />
            <ControlLabel>Give a name for the second team</ControlLabel>
            <FormControl
              type="text"
              value={this.state.teamTwo}
              name="teamTwo"
              placeholder={this.state.teamTwo}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Items needed for the game</ControlLabel>
            <br />
            <Checkbox
              name="item"
              inline
              onClick={this.handleGameItems}
              value="ball"
            >
              Ball
            </Checkbox>
            <Checkbox
              name="item"
              inline
              onClick={this.handleGameItems}
              value="goal"
            >
              Goal
            </Checkbox>{" "}
          </FormGroup>
          <ControlLabel>Game Location</ControlLabel>
          <p>{this.state.searchLocation.address}</p>
          <GMap onMarkerClick={this.onMarkerClick} />
          <Button type="button" onClick={this.formSubmit}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default GameForm;
