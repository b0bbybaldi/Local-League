import React, { Component } from "react";

import helpers from "../../Utils/helpers.js";

import { Panel } from "react-bootstrap";

import "./style.css";

class WeatherPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      description: null,
      icon: null
    };
  }

  componentDidMount() {
    const t = this;
    helpers.getWeather(t);
  }

  render() {
    return (
      <Panel>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Weather</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <div className="wIcon weather">
            <img
              src={`http://openweathermap.org/img/w/${this.state.icon}.png`}
              alt={this.state.description}
            />
          </div>
          <div className="wDetails weather">
            <p>{this.state.description}</p>
            <p>{this.state.temp}&#8457;</p>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

export default WeatherPanel;
