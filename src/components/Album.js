import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/Album.css";
import "../styles/ProgressSpinnerLikeButton.css";

import moreIcon from "./images/moreDisplayIcon@2x.png";
import likeIcon from "./images/likeButton@2x.png";
import likedFullIcon from "./images/likedFullButton@2x.png";
import heartDisplayIcon from "./images/heartDisplayIcon@2x.png";
import viewsDisplayIcon from "./images/viewsDisplayIcon@2x.png";
import privateDisplayIcon from "./images/privateDisplayIcon@2x.png";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { likeAlbum, deleteAlbum } from "../redux/actions/dataActions";

export class Album extends Component {
  state = {
    showMoreButton: false,
    showDeleteDialog: false,
  };

  likedAlbum = () => {
    if (
      this.props.user.likesAlbum &&
      this.props.user.likesAlbum.find(
        (like) => like.albumID === this.props.album.albumID
      )
    )
      return true;
    else return false;
  };

  handleMoreButton = () => {
    this.setState({
      showMoreButton: !this.state.showMoreButton,
      showDeleteDialog: false,
    });
  };

  handleDeleteButton = () => {
    this.setState({
      showDeleteDialog: !this.state.showDeleteDialog,
    });
  };

  likeAlbum = () => {
    this.props.likeAlbum(this.props.album.albumID);
  };

  deleteAlbum = () => {
    this.props.deleteAlbum(this.props.album.albumID);
    this.setState({
      showMoreButton: !this.state.showMoreButton,
    });
  };

  MoreContainer = () => {
    return (
      <div className="album-more-container">
        <button className="album-more-primary-button">Edit Album</button>
        <button
          onClick={this.handleDeleteButton}
          className="album-more-secondary-button"
        >
          Delete Album
        </button>
        <h3
          onClick={this.handleMoreButton}
          className="album-more-cancel-button"
        >
          Cancel
        </h3>
      </div>
    );
  };

  DeleteDialog = () => {
    return (
      <div className="album-more-container">
        <div className="album-more-delete-text-container">
          <h4 className="album-more-delete-text">
            Are you sure to delete this album?
          </h4>
        </div>
        <button onClick={this.deleteAlbum} className="album-more-delete-button">
          Delete
        </button>
        <h3
          onClick={this.handleDeleteButton}
          className="album-more-cancel-button"
        >
          Cancel
        </h3>
      </div>
    );
  };

  render() {
    const {
      user: { authenticated, credentials },
      album: {
        albumTitle,
        albumImg,
        likeCount,
        viewCount,
        albumID,
        username,
        profileImg,
        security,
      },
      options,
    } = this.props;

    let isLikeLoading = false;
    let findIndexLike = -1;
    findIndexLike = this.props.UI.loadingLikeAlbum.find(
      (like) => like.albumID === this.props.album.albumID
    );

    if (findIndexLike) {
      isLikeLoading = true;
    }

    const likeButton = !authenticated ? (
      <Link to="/login">
        <div className="album-icon-div">
          <img src={likeIcon} className="album-likeButton" />
        </div>
      </Link>
    ) : this.likedAlbum() ? (
      isLikeLoading ? (
        <div className="album-icon-div">
          <progress className="pure-material-progress-circular-unlike-button" />
        </div>
      ) : (
        <div onClick={this.likeAlbum} className="album-icon-div">
          <img src={likedFullIcon} className="album-likeButton" />
        </div>
      )
    ) : isLikeLoading ? (
      <div className="album-icon-div">
        <progress className="pure-material-progress-circular-like-button" />
      </div>
    ) : (
      <div onClick={this.likeAlbum} className="album-icon-div">
        <img src={likeIcon} className="album-likeButton" />
      </div>
    );

    const moreButton =
      options && authenticated && credentials.username === username ? (
        <div onClick={this.handleMoreButton} className="album-icon-div">
          <img src={moreIcon} className="album-moreButton" />
        </div>
      ) : null;

    const privateIcon =
      authenticated &&
      credentials.username === username &&
      security === "private" ? (
        <img src={privateDisplayIcon} className="album-privateIcon" />
      ) : null;

    const toAlbumDetails = {
      pathname: `/album/${albumID}`,
      state: { history: window.location.pathname },
    };

    function AlbumImage() {
      return (
        <Link to={toAlbumDetails}>
          <img src={albumImg} className="album-img" />
        </Link>
      );
    }

    let albumDisplay = this.state.showMoreButton ? (
      this.state.showDeleteDialog ? (
        <this.DeleteDialog />
      ) : (
        <this.MoreContainer />
      )
    ) : (
      <AlbumImage />
    );

    let userDisplay =
      !authenticated || credentials.username !== username ? (
        <Link to={`/${username}`}>
          <div className="album-user-display-container">
            <img src={profileImg} className="album-user-display-img" />
            <h3 className="album-user-display-name">@{username}</h3>
          </div>
        </Link>
      ) : null;

    return (
      <div className="album-albums-container">
        {userDisplay}
        <div className="album-details-container">
          {albumDisplay}
          <div className="album-details">
            <h3 className="album-title">{albumTitle}</h3>
            <div className="album-details-icons">
              {privateIcon}
              {moreButton}
              {likeButton}
            </div>
          </div>
          <div className="album-metadata">
            <div className="album-metadata-likes">
              <img src={heartDisplayIcon} className="album-likesIcon" />
              <p className="album-metadata-text">{likeCount}</p>
            </div>
            <div className="album-metadata-views">
              <img src={viewsDisplayIcon} className="album-viewsIcon" />
              <p className="album-metadata-text">{viewCount}</p>
            </div>
          </div>
        </div>
      </div>
    );
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

Album.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  likeAlbum: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Album);
