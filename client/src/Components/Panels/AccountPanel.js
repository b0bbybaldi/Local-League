import React, { Component } from "react";
// import Autocomplete from 'react-google-autocomplete';

import helpers from "../../Utils/helpers.js";

import {
  Panel,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";

import "./style.css";

class AccountPanel extends Component {
  constructor(props) {
    super(props);

    // Assign state itself, and a default value for items
    this.state = {
      loading: true,
      loadingLocation: true,
      loadingAccount: true,
      user: {
        location: {
          city: null
        },
        name: null,
        email: null,
        number: null,
        favorite: null
      }
    };
    this.formSubmit = this.formSubmit.bind(this);
    //console.log("*******",this.state);
  }

  componentDidMount() {
    const t = this;

    helpers.getAccountData(t);
    setTimeout(function() {
      helpers.getCurrentLocation(t);
    }, 2000);
  }

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    const test = re.test(email);
    if (!test) {
      return "error";
    }
    return true;
  }

  preventDefault = e => {
    e.preventDefault();
  };

  formSubmit = e => {
    // console.log(
    //   document.querySelector("#name").value,
    //   document.querySelector("#favorite").value
    // )

    let userProps = this.state.user;

    const email = document.querySelector("#email").value.trim();
    if (this.validateEmail(email)) userProps.email = email;

    const name = document.querySelector("#name").value.trim();
    if (name && name.length > 0) userProps.name = name;

    const phoneNumber = document.querySelector("#number").value.trim();
    if (phoneNumber && phoneNumber.length > 0) userProps.number = phoneNumber;

    const favorite = document.querySelector("#favorite").value.trim();
    if (favorite && favorite.length > 0) userProps.favorite = favorite;

    this.setState({
      user: userProps
    });
    // console.log(this.state.user);
    helpers.updateAccountData(this);
  };
  render() {
    // console.log('STATE:')
    if (this.state.loading) {
      return "LOADING...";
    } else {
      // console.log("location", this.state.location)
      return (
        <div>
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Account</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <form
                onSubmit={this.preventDefault}
                ref={el => (this.updateUser = el)}
              >
                <FormGroup>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    defaultValue={
                      this.state.user.email ? this.state.user.email : ""
                    }
                    id="email"
                    type="text"
                    name="email"
                    placeholder="email@example.com"
                  />
                  <ControlLabel>name</ControlLabel>
                  <FormControl
                    id="name"
                    defaultValue={
                      this.state.user.name ? this.state.user.name : ""
                    }
                    type="text"
                    name="name"
                    placeholder="your name here"
                  />
                  <ControlLabel>number</ControlLabel>
                  <FormControl
                    defaultValue={
                      this.state.user.number ? this.state.user.number : ""
                    }
                    id="number"
                    type="text"
                    name="number"
                    placeholder="555-555-5555"
                  />
                  <ControlLabel>favorite team</ControlLabel>
                  <FormControl
                    id="favorite"
                    componentClass="select"
                    placeholder="select a team"
                    name="favorite"
                  >
                    <option>
                      {this.state.user.favorite
                        ? this.state.user.favorite
                        : "Select a team"}
                    </option>
                    <option value="Spurs">Spurs</option>
                    <option value="Bournemouth">Bournemouth</option>
                    <option value="Aston Villa">Aston Villa</option>
                    <option value="Everton">Everton</option>
                    <option value="Watford">Watford</option>
                    <option value="Foxes">Foxes</option>
                    <option value="Sunderland">Sunderland</option>
                    <option value="Norwich">Norwich</option>
                    <option value="Crystal">Crystal</option>
                    <option value="Chelsea">Chelsea</option>
                    <option value="Swans">Swans</option>
                    <option value="Newcastle">Newcastle</option>
                    <option value="Southampton">Southampton</option>
                    <option value="Arsenal">Arsenal</option>
                    <option value="West Ham">West Ham</option>
                    <option value="Stoke">Stoke</option>
                    <option value="Liverpool">Liverpool</option>
                    <option value="ManCity">ManCity</option>
                    <option value="ManU">ManU</option>
                    <option value="West Bromwich">West Bromwich</option>
                  </FormControl>
                  <ControlLabel>location</ControlLabel>
                  <p id="location">{this.state.user.location.city}</p>
                </FormGroup>
                <hr />
                <Button
                  className="submitBtn"
                  type="button"
                  onClick={this.formSubmit}
                >
                  Submit
                </Button>
              </form>
            </Panel.Body>
          </Panel>
        </div>
      );
    }
  }
}
export default AccountPanel;
