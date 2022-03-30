import React, { Component } from "react";

import "../styles/AlbumDetails.css";

export class AlbumDetailsLoading extends Component {
  render() {
    return (
      <div className="albumDetails-opacity-container-loading">
        <div className="albumDetails-inner-container-loading">
          <div className="albumDetails-details-container-loading">
            <div className="albumDetails-title-loading"></div>
            <div className="albumDetails-details-inner-container">
              <div className="albumDetails-details-loading"></div>
              <div className="albumDetails-details-loading"></div>
              <div className="albumDetails-details-loading"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumDetailsLoading;
