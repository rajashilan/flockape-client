import React, { Component } from "react";

import "../styles/AddLink.css";
import "../styles/ProgressSpinner.css";

import {
  addNewLinkManually,
  clearFailedLinks,
} from "../redux/actions/dataActions";
import { clearLinkError } from "../redux/actions/uiActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

//button will be clicked on the album's page that has the album's ID
//pass the albumID and albumName to this page from the albumDetails page
//using the link details and albumID, call the function in data action and handle everything there

export class addLinkManually extends Component {
  state = {
    link: "",
    title: "",
    hasFailedLinks: false,
    failedLinksCount: 0,
  };

  componentDidMount() {
    if (this.props.failedLinks.length > 0) {
      this.setState({
        hasFailedLinks: true,
        failedLinksCount: this.props.failedLinks.length,
      });
    }
    console.log("mounted");
  }

  componentDidUpdate() {
    console.log("State", this.state.failedLinksCount);
    console.log("props", this.props.failedLinks.length);
    if (this.state.failedLinksCount > this.props.failedLinks.length) {
      this.setState({
        title: "",
        failedLinksCount: this.props.failedLinks.length,
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleBack = () => {
    this.props.UI.errors = null;
    // this.props.history.push({
    //   pathname: `/album/${this.props.album.albumID}`,
    //   state: { albumID: this.props.album.albumID },
    // });
    this.props.history.push(
      `/${this.props.album.username}/book/${this.props.album.albumID}`
    );
  };

  handleGoToOri = () => {
    this.props.UI.errors = null;
    this.props.history.push("/add-page");
  };

  handleSubmit = (event) => {
    const newManualLink = {
      link: this.state.link,
      title: this.state.title,
    };
    const isUserUpload = true;
    event.preventDefault();
    this.props.addNewLinkManually(
      newManualLink,
      this.props.album.albumID,
      this.props.album.username,
      this.props.history,
      isUserUpload
    );
  };

  handleSubmitFailedLink = (event) => {
    const newManualLink = {
      link: this.props.failedLinks[0],
      title: this.state.title,
    };
    const isUserUpload = false;
    event.preventDefault();
    this.props.addNewLinkManually(
      newManualLink,
      this.props.album.albumID,
      this.props.album.username,
      this.props.history,
      isUserUpload
    );
  };

  clearFailedLinksLocally = () => {
    this.setState({
      hasFailedLinks: false,
    });
    this.props.clearFailedLinks();
    this.props.clearLinkError();
  };

  render() {
    const {
      UI: { loading, errors, linkError },
      user: { credentials, authenticated },
      album: { albumID, albumTitle, username },
      failedLinks,
    } = this.props;

    //diff renders if there are failed links

    //if failed links length == 0 and hasFailedLinks is true
    //then show the success message
    //if clear button is pressed,
    //clear the failed links and set hasFailedLinks to false

    if (!albumTitle || !albumID) {
      this.props.history.push("/books");
    }

    if (!authenticated) {
      this.props.history.push("/login");
    }

    if (credentials.username !== username) {
      this.props.history.push("/books");
    }

    if (this.state.hasFailedLinks && failedLinks.length === 0) {
      this.props.history.push(`/${username}/book/${albumID}`);
    }

    let failedLinksList;
    if (failedLinks.length > 0) {
      failedLinksList = failedLinks.map((failedLink) => (
        <p className="addLink-addLinkManually-label-failedLinks">
          {failedLink}
        </p>
      ));
    }

    let failedLinksSuccessMessage;
    failedLinksSuccessMessage =
      this.state.hasFailedLinks && failedLinks.length === 0 ? (
        <p className="addLink-label-success">Links added successfully</p>
      ) : null;

    let cancelText = "Cancel";
    cancelText =
      this.state.hasFailedLinks && failedLinks.length === 0 ? "Back" : "Cancel";

    let addLinkButton = loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button type="submit" className="addLink-primary-button">
        Add
      </button>
    );

    let addLinkLabel = !errors ? null : (
      <p className="addLink-label-error">{errors.error}</p>
    );

    let addLinkManuallyRender =
      failedLinks.length > 0 && failedLinks[0] !== "" ? (
        <div className="addLink-container">
          <h3 className="addLink-title">{albumTitle}</h3>

          <h4 className="addLink-prompt-bottom-margin">Add a Page Manually</h4>
          <p className="addLink-addLinkManually-label-failedLinks-prompt">
            Links to be added:
          </p>
          {failedLinksList}
          <button
            type="button"
            onClick={this.clearFailedLinksLocally}
            className="addLink-clear-button"
          >
            Clear
          </button>
          <form onSubmit={this.handleSubmitFailedLink}>
            <a
              href={failedLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="addLink-label-url-failedLinks"
            >
              {failedLinks[0]}
            </a>
            {errors && <p className="addLink-label-error">{errors.error}</p>}
            <input
              placeholder="Title"
              type="text"
              name="title"
              className="addLink-input"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {errors && (
              <p className="addLink-label-error-display-block">
                {errors.title}
              </p>
            )}
            {errors && <p className="addLink-label-error">{errors.album}</p>}
            {addLinkButton}
            <p onClick={this.handleBack} className="addLink-cancel-button">
              Cancel
            </p>
          </form>
        </div>
      ) : (
        <div className="addLink-container">
          <h3 className="addLink-title">{albumTitle}</h3>

          <h4 className="addLink-prompt-bottom-margin">Add a Page Manually</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Paste your link here..."
              type="text"
              name="link"
              className="addLink-input"
              value={this.state.link}
              onChange={this.handleChange}
            />
            {errors && <p className="addLink-label-error">{errors.error}</p>}
            <input
              placeholder="Title"
              type="text"
              name="title"
              className="addLink-input"
              value={this.state.title}
              onChange={this.handleChange}
            />
            {errors && (
              <p className="addLink-label-error-display-block">
                {errors.title}
              </p>
            )}
            {errors && <p className="addLink-label-error">{errors.album}</p>}
            {failedLinksSuccessMessage}
            {addLinkButton}
            <p onClick={this.handleBack} className="addLink-cancel-button">
              {cancelText}
            </p>
          </form>
          <div className="addLink-addLinkManually-label-container">
            <p className="addLink-addLinkManually-label">
              <span
                onClick={this.handleGoToOri}
                className="addLink-addLinkManually-label-url"
              >
                Add a page automatically
              </span>
              instead.
            </p>
          </div>
        </div>
      );

    return (
      <div className="addLink-main-overall-container">
        <div className="addLink-card-container">{addLinkManuallyRender}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.data.album,
  user: state.user,
  UI: state.UI,
  failedLinks: state.data.failedLinks,
});

const mapActionToProps = {
  addNewLinkManually,
  clearFailedLinks,
  clearLinkError,
};

addLinkManually.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  addNewLinkManually: PropTypes.func.isRequired,
  clearFailedLinks: PropTypes.func.isRequired,
  clearLinkError: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired,
  failedLinks: PropTypes.array,
};

export default connect(mapStateToProps, mapActionToProps)(addLinkManually);
