import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/Link.css";
import "../styles/ProgressSpinnerLikeButton.css";

import moreIcon from "./images/moreDisplayIcon@2x.png";
import likeIcon from "./images/likeButton@2x.png";
import likedFullIcon from "./images/likedFullButton@2x.png";

import { likeLink, deleteLink } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class LinkComponent extends Component {
  state = {
    showMoreButton: false,
    showDeleteDialog: false,
  };

  likedLink = () => {
    if (
      this.props.user.likesLink &&
      this.props.user.likesLink.find(
        (like) => like.linkID === this.props.link.linkID
      )
    )
      return true;
    else return false;
  };

  likeLink = () => {
    let linkData = {
      albumID: this.props.albumID,
      linkTitle: this.props.link.linkTitle,
      linkID: this.props.link.linkID,
    };

    this.props.likeLink(linkData);
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

  handleDeleteAndMoreButton = () => {
    this.setState({
      showDeleteDialog: !this.state.showDeleteDialog,
      showMoreButton: !this.state.showMoreButton,
    });
  };

  deleteLink = () => {
    this.props.deleteLink(
      this.props.link.linkID,
      this.props.album.albumID,
      this.props.link.username,
      this.props.propsHistory
    );
    this.setState({
      showMoreButton: !this.state.showMoreButton,
    });
  };

  MoreContainer = () => {
    return (
      <div>
        <img src={this.props.link.linkImg} className="link-img" />
        <div className="link-more-container">
          <button
            onClick={this.handleDeleteButton}
            className="link-more-secondary-button"
          >
            Delete
          </button>
          <h3
            onClick={this.handleMoreButton}
            className="link-more-cancel-button"
          >
            Cancel
          </h3>
        </div>
      </div>
    );
  };

  DeleteDialog = () => {
    return (
      <div className="link-delete-main-container">
        <div className="link-more-delete-text-container">
          <h4 className="link-more-delete-text">
            Are you sure to delete this page?
          </h4>
        </div>
        <div className="link-more-delete-button-container">
          <button onClick={this.deleteLink} className="link-more-delete-button">
            Delete
          </button>
          <h3
            onClick={this.handleDeleteAndMoreButton}
            className="link-more-cancel-button"
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
      link: { linkUrl, linkTitle, linkImg, linkDesc, likeCount, username },
      options,
      albumID,
      UI: { loadingLikeLink, navActive },
    } = this.props;

    function LinkData() {
      return (
        <Link
          to={{ pathname: linkUrl }}
          target="_blank"
          rel="noopener noreferrer"
          className="link-to"
        >
          <img src={linkImg} className="link-img" />
          <div className="link-details-container">
            <h3 className="link-title">{linkTitle}</h3>
            <h5 className="link-desc">{linkDesc}</h5>
          </div>
        </Link>
      );
    }

    function abbrNum(number, decPlaces) {
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10, decPlaces);

      // Enumerate number abbreviations
      var abbrev = ["k", "M", "B", "T"];

      // Go through the array backwards, so we do the largest first
      for (var i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
          number = Math.round((number * decPlaces) / size) / decPlaces;

          // Handle special case where we round up to the next abbreviation
          if (number == 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }

          // Add the letter for the abbreviation
          number += abbrev[i];

          // We are done... stop
          break;
        }
      }

      return number;
    }

    let isLikeLoading = false;
    let findIndexLike = -1;
    findIndexLike = loadingLikeLink.find(
      (like) => like.linkID === this.props.link.linkID
    );

    if (findIndexLike) {
      isLikeLoading = true;
    }

    let loadingClassLike = !navActive
      ? "pure-material-progress-circular-like-button"
      : "hidden";

    let loadingClassUnlike = !navActive
      ? "pure-material-progress-circular-unlike-button"
      : "hidden";

    const likeButton = !authenticated ? (
      <Link to="/login">
        <div className="link-like-icon-div">
          <img src={likeIcon} className="link-likeButton" />
          <p className="link-like-count">{abbrNum(likeCount, 1)}</p>
        </div>
      </Link>
    ) : this.likedLink() ? (
      isLikeLoading ? (
        <div className="link-like-icon-div">
          <progress className={loadingClassUnlike} />
        </div>
      ) : (
        <div onClick={this.likeLink} className="link-like-icon-div">
          <img src={likedFullIcon} className="link-likeButton" />
          <p className="link-like-count">{abbrNum(likeCount, 1)}</p>
        </div>
      )
    ) : isLikeLoading ? (
      <div className="link-like-icon-div">
        <progress className={loadingClassLike} />
      </div>
    ) : (
      <div onClick={this.likeLink} className="link-like-icon-div">
        <img src={likeIcon} className="link-likeButton" />
        <p className="link-like-count">{abbrNum(likeCount, 1)}</p>
      </div>
    );

    const moreButton =
      options && authenticated && credentials.username === username ? (
        <div onClick={this.handleMoreButton} className="link-icon-div">
          <img src={moreIcon} className="link-moreButton" />
        </div>
      ) : null;

    let linkDisplay = this.state.showMoreButton ? (
      this.state.showDeleteDialog ? (
        <this.DeleteDialog />
      ) : (
        <this.MoreContainer />
      )
    ) : (
      <LinkData />
    );

    return (
      <div>
        <div className="link-container">
          {linkDisplay}
          <div className="link-icon-container">
            {likeButton}
            {moreButton}
          </div>
        </div>
        <div className="link-hr-div">
          <hr className="link-hr" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.data.album,
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  likeLink,
  deleteLink,
};

LinkComponent.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  likeLink: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(LinkComponent);
