import React, { Component } from "react";
import "../styles/PrimaryButton.css";

export class PrimaryButton extends Component {
  render() {
    return (
      <button type={this.props.type} className="primary-button">
        {this.props.text}
      </button>
    );
  }
}

export default PrimaryButton;
