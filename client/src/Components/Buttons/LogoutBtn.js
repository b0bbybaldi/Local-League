import React, { Component } from "react";

import helpers from "../../Utils/helpers.js";

import "./style.css";

class LogoutBtn extends Component {
  render() {
    return (
      <button className="btn nvBtn lgout" onClick={helpers.logout}>
        log out
      </button>
    );
  }
}

export default LogoutBtn;
