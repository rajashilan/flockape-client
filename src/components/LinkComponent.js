import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/Link.css";

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
    this.props.likeLink(this.props.link.linkID);
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
    this.props.deleteLink(this.props.link.linkID);
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
            Are you sure to delete this link?
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

    const likeButton = !authenticated ? (
      <Link to="/login">
        <div className="link-like-icon-div">
          <img src={likeIcon} className="link-likeButton" />
          <p className="link-like-count">{likeCount}</p>
        </div>
      </Link>
    ) : this.likedLink() ? (
      <div onClick={this.likeLink} className="link-like-icon-div">
        <img src={likedFullIcon} className="link-likeButton" />
        <p className="link-like-count">{likeCount}</p>
      </div>
    ) : (
      <div onClick={this.likeLink} className="link-like-icon-div">
        <img src={likeIcon} className="link-likeButton" />
        <p className="link-like-count">{likeCount}</p>
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
});

const mapActionsToProps = {
  likeLink,
  deleteLink,
};

LinkComponent.propTypes = {
  user: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  likeLink: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(LinkComponent);
