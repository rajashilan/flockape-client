import React, { Component } from "react";
import "../styles/Album.css";

export class AlbumLoading extends Component {
  render() {
    return (
      <div className="album-albums-container">
        <div className="album-details-container">
          <div className="album-img-loading"></div>
          <div className="album-details">
            <div className="album-title-loading"></div>
          </div>
          <div className="album-metadata-loading"></div>
        </div>
      </div>
    );
  }
}

export default AlbumLoading;
