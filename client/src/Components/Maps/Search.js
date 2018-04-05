import React, { Component } from "react";

import { Panel } from "react-bootstrap";

import GMap from "./Map.js";

import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Checkbox
} from "react-bootstrap";

//import 'rc-time-picker/assets/index.css';

import DatePicker from "react-datepicker";

import moment from "moment";

//import TimePicker from 'rc-time-picker';
import "react-datepicker/dist/react-datepicker.css";

import helpers from "../../Utils/helpers.js";

import Modal from "react-responsive-modal";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: moment(),
      playerCount: 0,
      teamOne: "Team A",
      teamTwo: "Team B",
      checklist: [],
      searchLocation: {
        address: "",
        id: "",
        name: ""
      },
      open: false
    };
    this.dateTimeChange = this.dateTimeChange.bind(this);
  }
  componentDidMount() {
    // get current user loaction by calling helper getAccountData
    // set state of location
  }

  onMarkerClick = info => {
    // let that = this;
    // console.log(info);
    this.setState({
      searchLocation: {
        address: info.address,
        id: info.id,
        name: info.name,
        created: false
      }
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleGameItems = e => {
    const { value } = e.target;
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
    helpers
      .creatNewGame(this)
      // this.state.reset()
      // this.state.reset()
      .then(res => {
        console.log("create game", res);
        this.setState({
          DateTime: moment(),
          playerCount: 0,
          teamOne: "Team A",
          teamTwo: "Team B",
          checklist: [],
          searchLocation: {
            address: "",
            id: "",
            name: ""
          },
          create: true
        });
      })
      .catch(err => {
        this.setState({
          DateTime: moment(),
          playerCount: 0,
          teamOne: "Team A",
          teamTwo: "Team B",
          checklist: [],
          searchLocation: {
            address: "",
            id: "",
            name: ""
          },
          create: false
        });
      });
  };
  //console.log(this.state.dateTime);
  dateTimeChange = date => {
    this.setState({
      dateTime: date
    });
  };

  tt = () => {
    this.formSubmit();
    this.onOpenModal();
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    return (
      <div>
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
            <form onSubmit={this.preventDefault}>
              <FormGroup controlId="formBasicText">
                <ControlLabel>Select a date and time</ControlLabel>
                <DatePicker
                  selected={this.state.dateTime}
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
              <h3>{this.state.searchLocation.name}</h3>
              <h4>{this.state.searchLocation.address}</h4>
              <GMap onMarkerClick={this.onMarkerClick} />
              <hr />
              <Button
                className="submitBtn btn btn-default"
                type="button"
                onClick={this.tt}
              >
                Submit
              </Button>
            </form>
          </Panel.Body>
        </Panel>

        <Modal
          classNames="text-center"
          open={open}
          onClose={this.onCloseModal}
          classNames={{ overlay: "custom-overlay", modal: "custom-modal" }}
          little
        >
          {this.state.create ? (
            <h2>You have successfully created a game!</h2>
          ) : (
            <h2>Oh no, something went wrong try again!</h2>
          )}
        </Modal>
      </div>
    );
  }
}

export default Search;
