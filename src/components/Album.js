import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Album.css";

import moreButton from "./images/moreDisplayIcon@2x.png";
import likeButton from "./images/likeButton@2x.png";
import likedFullButton from "./images/likedFullButton@2x.png";
import heartDisplayIcon from "./images/heartDisplayIcon@2x.png";
import viewsDisplayIcon from "./images/viewsDisplayIcon@2x.png";
import privateDisplayIcon from "./images/privateDisplayIcon@2x.png";

export class Album extends Component {
  render() {
    const {
      album: {
        albumTitle,
        albumImg,
        likeCount,
        viewCount,
        createdAt,
        username,
        albumID,
      },
    } = this.props;
    return (
      <div className="album-albums-container">
        <Link to={`/album/${albumID}`}>
          <img src={albumImg} alt="" className="album-img" />
        </Link>
        <div className="album-details-container">
          <div className="album-details">
            <h2 className="album-title">{albumTitle}</h2>
            <div className="album-details-icons">
              <div className="album-icon-div">
                <img
                  src={privateDisplayIcon}
                  alt="private"
                  className="album-privateIcon"
                />
              </div>
              <div className="album-icon-div">
                <img src={moreButton} alt="more" className="album-moreButton" />
              </div>
              <div className="album-icon-div">
                <img src={likeButton} alt="like" className="album-likeButton" />
              </div>
            </div>
          </div>
          <div className="album-metadata">
            <div className="album-metadata-likes">
              <img src={heartDisplayIcon} alt="" className="album-likesIcon" />
              <p className="album-metadata-text">{likeCount}</p>
            </div>
            <div className="album-metadata-views">
              <img src={viewsDisplayIcon} alt="" className="album-viewsIcon" />
              <p className="album-metadata-text">{viewCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Album;
