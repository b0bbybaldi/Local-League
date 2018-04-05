import React, { Component } from "react";
import LoginForm from "../Components/Form";

class Login extends Component {
  render() {
    return (
      <div className="homeWrap">
        <div id="hero" align="center">
          <div className="content">
            <h1>Local League</h1>
          </div>
          <div className="container">
            <LoginForm />
          </div>
        </div>
        <div id="aboutApp" align="center" />
      </div>
    );
  }
}

export default Login;
