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
import "../styles/ProgressSpinnerLikeButton.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setIsAlbumTrue, setIsAlbumFalse } from "../redux/actions/uiActions";

import { likeAlbum, deleteAlbum } from "../redux/actions/dataActions";

export class AlbumDetails extends Component {
  state = {
    showMoreButton: false,
    showDeleteDialog: false,
  };

  componentDidMount() {
    if (
      this.props.user.authenticated &&
      this.props.user.credentials.username === this.props.username
    ) {
      this.props.setIsAlbumTrue();
    } else {
      this.props.setIsAlbumFalse();
    }
  }

  componentWillUnmount() {
    this.props.setIsAlbumFalse();
  }

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
    this.props.deleteAlbum(this.props.album.albumID);
    this.setState({
      showMoreButton: !this.state.showMoreButton,
    });
    this.props.history.push("/albums");
  };

  MoreContainer = () => {
    return (
      <div className="albumDetails-more-container">
        <div className="albumDetails-more-button-container">
          <Link to="/editAlbum" className="albumDetails-more-primary-button">
            Edit Album
          </Link>
          <button
            onClick={this.handleDeleteButton}
            className="albumDetails-more-secondary-button"
          >
            Delete Album
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
            Are you sure to delete this album?
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
      UI: { loading },
    } = this.props;

    let isLikeLoading = false;
    let findIndexLike = -1;
    findIndexLike = this.props.UI.loadingLikeAlbum.find(
      (like) => like.albumID === this.props.albumID
    );

    if (findIndexLike) {
      isLikeLoading = true;
    }

    const likeButton = !authenticated ? (
      <Link to="/login">
        <div className="albumDetails-icon-div">
          <img src={likeIcon} className="albumDetails-likeButton" />
        </div>
      </Link>
    ) : this.likedAlbum() ? (
      isLikeLoading ? (
        <div className="albumDetails-icon-div">
          <progress className="pure-material-progress-circular-unlike-button" />
        </div>
      ) : (
        <div onClick={this.likeAlbum} className="albumDetails-icon-div">
          <img src={likedFullIcon} className="albumDetails-likeButton" />
        </div>
      )
    ) : isLikeLoading ? (
      <div className="albumDetails-icon-div">
        <progress className="pure-material-progress-circular-like-button" />
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
        <div onClick={this.handleMoreButton} className="albumDetails-icon-div">
          <img src={moreIcon} className="albumDetails-moreButton" />
        </div>
      ) : null;

    const backToUrl = {
      pathname: history,
      state: { from: "component" },
    };

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
      )
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
  setIsAlbumTrue,
  setIsAlbumFalse,
};

AlbumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  likeAlbum: PropTypes.func.isRequired,
  deleteAlbum: PropTypes.func.isRequired,
  setIsAlbumTrue: PropTypes.func.isRequired,
  setIsAlbumFalse: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(AlbumDetails);
