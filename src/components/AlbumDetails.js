import React, { Component } from "react";
import { Link } from "react-router-dom";

import moreIcon from "./images/moreDisplayIcon@2x.png";
import likeIcon from "./images/likeButton@2x.png";
import likedFullIcon from "./images/likedFullButton@2x.png";
import followButton from "./images/followButton@2x.png";
import followedButton from "./images/followedButton@2x.png";
import privateDisplayIcon from "./images/privateDisplayIcon@2x.png";

import BackButton from "./BackButton";
import { PopUp } from "./PopUp";

import "../styles/AlbumDetails.css";
import "../styles/ProgressSpinnerLikeButton.css";
import "../styles/ProgressSpinnerFollowButton.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { likeAlbum, deleteAlbum } from "../redux/actions/dataActions";

export class AlbumDetails extends Component {
  state = {
    showMoreButton: false,
    showDeleteDialog: false,
    showPopUp: false,
  };

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

  deleteAlbum = () => {
    this.props.deleteAlbum(this.props.albumID);
    this.setState({
      showMoreButton: !this.state.showMoreButton,
    });
  };

  copyBook = async () => {
    await navigator.clipboard.writeText(
      `https://sharesite-test.web.app/${this.props.user.credentials.username}/book/${this.props.albumID}`
    );

    this.setState(
      {
        showPopUp: true,
        showMoreButton: false,
        showDeleteDialog: false,
      },
      () => {
        if (this.state.showPopUp) this.setPopUpTimer();
      }
    );
  };

  setPopUpTimer = () => {
    setTimeout(() => {
      this.setState({
        showPopUp: false,
      });
    }, 2000);
  };

  MoreContainer = () => {
    return (
      <div className="albumDetails-more-container">
        <div className="albumDetails-more-button-container">
          <Link to="/edit-book" className="albumDetails-more-primary-button">
            Edit
          </Link>
          <button
            onClick={this.copyBook}
            className="albumDetails-more-primary-button"
          >
            Share
          </button>
          <button
            onClick={this.handleDeleteButton}
            className="albumDetails-more-secondary-button"
          >
            Delete
          </button>
        </div>
        <h3
          onClick={this.handleMoreButton}
          className="albumDetails-more-cancel-button"
        >
          Cancel
        </h3>
      </div>
    );
  };

  DeleteDialog = () => {
    return (
      <div className="albumDetails-more-container">
        <div className="albumDetails-more-delete-text-container">
          <h4 className="albumDetails-more-delete-text">
            Are you sure to delete this Book?
          </h4>
        </div>
        <div className="albumDetails-more-delete-button-container">
          <button
            onClick={this.deleteAlbum}
            className="albumDetails-more-delete-button"
          >
            Delete
          </button>
          <h3
            onClick={this.handleDeleteButton}
            className="albumDetails-more-cancel-delete-button"
          >
            Cancel
          </h3>
        </div>
      </div>
    );
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
      UI: { loading, navActive },
    } = this.props;

    const popup = this.state.showPopUp ? (
      <PopUp text="Book URL copied successfully" />
    ) : null;

    let isLikeLoading = false;
    let findIndexLike = -1;
    findIndexLike = this.props.UI.loadingLikeAlbum.find(
      (like) => like.albumID === this.props.albumID
    );

    if (findIndexLike) {
      isLikeLoading = true;
    }

    let loadingClassFollow = !navActive
      ? "pure-material-progress-circular-follow-button"
      : "hidden";

    let loadingClassUnfollow = !navActive
      ? "pure-material-progress-circular-unfollow-button"
      : "hidden";

    const likeButton = !authenticated ? (
      <Link to="/login">
        <div className="albumDetails-icon-div">
          <img src={followButton} className="albumDetails-likeButton" />
        </div>
      </Link>
    ) : this.likedAlbum() ? (
      isLikeLoading ? (
        <div className="albumDetails-icon-div">
          <progress className={loadingClassUnfollow} />
        </div>
      ) : (
        <div onClick={this.likeAlbum} className="albumDetails-icon-div">
          <img src={followedButton} className="albumDetails-likeButton" />
        </div>
      )
    ) : isLikeLoading ? (
      <div className="albumDetails-icon-div">
        <progress className={loadingClassFollow} />
      </div>
    ) : (
      <div onClick={this.likeAlbum} className="albumDetails-icon-div">
        <img src={followButton} className="albumDetails-likeButton" />
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
        <div onClick={this.handleMoreButton} className="albumDetails-icon-div">
          <img src={moreIcon} className="albumDetails-moreButton" />
        </div>
      ) : null;

    const backToUrl = {
      pathname: history,
      state: { from: "component" },
    };

    let backButton = authenticated ? (
      <BackButton to={backToUrl} />
    ) : (
      <BackButton to={`/@${username}`} />
    );

    const loadingAlbumDetails = !loading ? (
      this.state.showMoreButton ? (
        this.state.showDeleteDialog ? (
          <this.DeleteDialog />
        ) : (
          <this.MoreContainer />
        )
      ) : (
        <div
          className="albumDetails-container"
          style={{
            backgroundImage: `url(${albumImg})`,
          }}
        >
          <div className="albumDetails-opacity-container">
            <div className="albumDetails-inner-container">
              {backButton}
              <div className="albumDetails-details-container">
                <h3 className="albumDetails-title">{albumTitle}</h3>
                <div className="albumDetails-details-inner-container">
                  <p className="albumDetails-details">{likeCount} follows</p>
                  <p className="albumDetails-details">{viewCount} views</p>
                  <p className="albumDetails-details">{linkCount} pages</p>
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
      )
    ) : (
      <p>Loading...</p>
    );

    return (
      <div>
        {loadingAlbumDetails}
        {popup}
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

AlbumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  likeAlbum: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(AlbumDetails);
