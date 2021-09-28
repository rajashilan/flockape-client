import React, { Component } from "react";

export class PopUp extends Component {
  render() {
    return (
      <div className="popup">
        <span className="popup-text">{this.props.text}</span>
      </div>
    );
  }
}

export default PopUp;
