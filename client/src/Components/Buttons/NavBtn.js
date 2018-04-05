import React, { Component } from "react";
import "./style.css";

const NavBtn = props => {
  return (
    <button className="btn nvBtn" onClick={props.onClick}>
      {props.name}
    </button>
  );
};

export default NavBtn;
