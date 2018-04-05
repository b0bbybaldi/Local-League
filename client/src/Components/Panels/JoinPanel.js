import React, { Component } from "react";

import helpers from "../../Utils/helpers.js";

import { Panel, Button } from "react-bootstrap";

import moment from "moment";

import "./style.css";

class WeatherPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selectedGameId: null,
      joinedGame: false,
      currentUser: null
    };
  }

  componentWillMount() {
    const t = this;
    helpers.getGameInformation(t);
    helpers.getUserId(t);
  }

  joinGameClick = e => {
    console.log("clicked");
    this.setState({
    	selectedGameId:e.target.getAttribute("id"),
    	joinedGame:false
    })

    helpers.joinNewGame(this)
  };

  render() {
    console.log("join state", this.state);
    let gameComp = this.state.results.map((game, i) => {
      return parseInt(game.NumPlayer) > game.players.length ? (
        <div>
          <Panel>
            <Panel.Body className="joinWrap">
              <p key={i}>
                <strong>Location:</strong> {game.address}
              </p>
              <p key={i}>
                <strong>Time:</strong>{" "}
                {moment(game.dateAndTime).format("MM-DD-YYYY hh:mmA")}
              </p>
              <p key={i}>
                <strong>Current player count:</strong> {game.players.length}
              </p>
              <p>
                <strong>Items needed:</strong>
              </p>

              <p key={i}>{game.itemsNeeded[0]}</p>
              <p key={i}>{game.itemsNeeded[1]}</p>

              {game.players.includes(this.state.currentUser) ? (
                <Button
                  className="selectBtn submitBtn btn btn-default disabled"
                  disabled="true"
                  key={i}
                >
                  already joined
                </Button>
              ) : (
                <Button
                  className="submitBtn btn btn-default"
                  key={i}
                  id={game._id}
                  onClick={this.joinGameClick}
                >
                  join
                </Button>
              )}
            </Panel.Body>
          </Panel>
        </div>
      ) : (
        ""
      );
    });
    return <div>{gameComp}</div>;
  }
}

export default WeatherPanel;
