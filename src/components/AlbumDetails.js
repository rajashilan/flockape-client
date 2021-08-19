import React, { Component } from "react";
import { Link } from "react-router-dom";

import moreIcon from "./images/moreDisplayIcon@2x.png";
import likeIcon from "./images/likeButton@2x.png";
import likedFullIcon from "./images/likedFullButton@2x.png";
import heartDisplayIcon from "./images/heartDisplayIcon@2x.png";
import viewsDisplayIcon from "./images/viewsDisplayIcon@2x.png";
import privateDisplayIcon from "./images/privateDisplayIcon@2x.png";

import BackButton from "./BackButton";

import "../styles/AlbumDetails.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { likeAlbum, deleteAlbum } from "../redux/actions/dataActions";

export class AlbumDetails extends Component {
  likeAlbum = () => {
    this.props.likeAlbum(this.props.albumID);
  };

  likedAlbum = () => {
    if (
      this.props.user.likesAlbum &&
      this.props.user.likesAlbum.find(
        (like) => like.albumID === this.props.albumID
      )
    )
      return true;
    else return false;
  };
  render() {
    const {
      user: { authenticated, credentials },
      albumTitle,
      albumImg,
      likeCount,
      viewCount,
      albumID,
      security,
      linkCount,
      username,
      options,
      history,
      UI: { loading },
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <div className="albumDetails-icon-div">
          <img src={likeIcon} className="albumDetails-likeButton" />
        </div>
      </Link>
    ) : this.likedAlbum() ? (
      <div onClick={this.likeAlbum} className="albumDetails-icon-div">
        <img src={likedFullIcon} className="albumDetails-likeButton" />
      </div>
    ) : (
      <div onClick={this.likeAlbum} className="albumDetails-icon-div">
        <img src={likeIcon} className="albumDetails-likeButton" />
      </div>
    );

    const privateIcon =
      authenticated &&
      credentials.username === username &&
      security === "private" ? (
        <img src={privateDisplayIcon} className="albumDetails-privateIcon" />
      ) : null;

    const moreButton =
      options && authenticated && credentials.username === username ? (
        <div className="albumDetails-icon-div">
          <img src={moreIcon} className="albumDetails-moreButton" />
        </div>
      ) : null;

    const backToUrl = {
      pathname: history,
      state: { from: "component" },
    };

    const loadingAlbumDetails = !loading ? (
      <div
        className="albumDetails-container"
        style={{
          backgroundImage: `url(${albumImg})`,
        }}
      >
        <div className="albumDetails-opacity-container">
          <div className="albumDetails-inner-container">
            {authenticated && <BackButton to={backToUrl} />}
            <div className="albumDetails-details-container">
              <h3 className="albumDetails-title">{albumTitle}</h3>
              <div className="albumDetails-details-inner-container">
                <p className="albumDetails-details">{likeCount} likes</p>
                <p className="albumDetails-details">{viewCount} views</p>
                <p className="albumDetails-details">{linkCount} links</p>
              </div>
            </div>
            <div className="albumDetails-icon-container">
              {likeButton}
              {moreButton}
              {privateIcon}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );

    return <div>{loadingAlbumDetails}</div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  likeAlbum,
  deleteAlbum,
};

AlbumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  likeAlbum: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(AlbumDetails);
