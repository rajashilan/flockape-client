import React, { Component } from "react";

import { Link } from "react-router-dom";

import backArrow from "../components/images/backArrow@2x.png";
import "../styles/BackButton.css";

class BackButton extends Component {
  render() {
    return (
      <div className="back-button-container">
        <Link to={this.props.to} className="back-button-link">
          <img src={backArrow} alt="back" className="back-button-img" />
        </Link>
      </div>
    );
  }
}

export default BackButton;
