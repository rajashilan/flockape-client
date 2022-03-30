import React, { Component } from "react";

import "../styles/Link.css";

export class LinkLoading extends Component {
  render() {
    return (
      <div className="link-container-loading">
        <div className="link-img-loading" />
        <div className="link-details-container">
          <div className="link-title-loading"></div>
          <div className="link-desc-loading"></div>
        </div>
      </div>
    );
  }
}

export default LinkLoading;
