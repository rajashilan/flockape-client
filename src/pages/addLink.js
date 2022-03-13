import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/AddLink.css";
import "../styles/ProgressSpinner.css";

import {
  addNewLink,
  clearFailedLinks,
  clearTrackedLinks,
} from "../redux/actions/dataActions";
import { clearLinkError, stopLoadingUI } from "../redux/actions/uiActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

//button will be clicked on the album's page that has the album's ID
//pass the albumID and albumName to this page from the albumDetails page
//using the link details and albumID, call the function in data action and handle everything there

export class addLink extends Component {
  state = {
    link: "",
    submitted: false,
    numOfLinks: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.state.submitted &&
      !nextProps.UI.loading &&
      !nextProps.UI.errors &&
      !nextProps.UI.linkError &&
      nextProps.failedLinks.length === 0
    )
      this.props.history.push(
        `/${this.props.album.username}/book/${this.props.album.albumID}`
      );

    if (
      nextProps.numOfLinksUploaded === this.state.numOfLinks &&
      nextProps.numOfLinksUploaded !== 0
    ) {
      this.props.stopLoadingUI();
      this.props.clearTrackedLinks();
      console.log("ui stopped");
    }
  }

  handleChange = (event) => {
    this.setState({
      link: event.target.value,
    });
  };

  handleBack = () => {
    this.props.UI.errors = null;
    this.props.clearTrackedLinks();
    // this.props.history.push({
    //   pathname: `/album/${this.props.album.albumID}`,
    //   state: { albumID: this.props.album.albumID },
    // });
    this.props.history.push(
      `/${this.props.album.username}/book/${this.props.album.albumID}`
    );
  };

  handleForward = () => {
    this.props.UI.errors = null;
    this.props.clearTrackedLinks();
    this.props.history.push("/add-page-manually");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let newLink = this.state.link.replace(/(\r\n|\n|\r)/gm, "");
    let newLinkSplit = newLink.trim().split(",").filter(Boolean);
    let newLinkLength = 0;
    if (newLinkSplit.length === 0) newLinkLength = 1;
    else newLinkLength = newLinkSplit.length;

    this.setState({
      submitted: true,
      numOfLinks: newLinkLength,
    });

    this.props.addNewLink(
      this.state.link,
      this.props.album.albumID,
      this.props.album.username,
      this.props.history
    );
  };

  clearFailedLinksLocally = () => {
    this.setState(
      {
        link: "",
        submitted: false,
      },
      () => {
        this.props.clearTrackedLinks();
        this.props.clearFailedLinks();
        this.props.clearLinkError();
      }
    );
  };

  render() {
    const {
      UI: { loading, errors, linkError, navActive },
      user: { credentials, authenticated },
      album: { albumID, albumTitle, username },
      failedLinks,
    } = this.props;

    if (!albumTitle || !albumID) {
      console.log("1");
      this.props.history.push("/books");
    }

    if (!authenticated) {
      console.log("2");
      this.props.history.push("/login");
    }

    if (credentials.username !== username) {
      console.log("3");
      this.props.history.push("/books");
    }

    //every time add button is clicked
    //errors, linkError, and failedLinks are reset
    //so, if component recieves nextprop, and loading is false,
    //and there errors is null, linkError is false, and failedLinks is empty,
    //return to album

    let failedLinkCount = 0;
    let failedLinkLabelError;

    if (failedLinks.length > 0) {
      failedLinks.forEach((failedLink) => {
        if (failedLink !== "") failedLinkCount++;
      });
    }

    if (failedLinks.length > 0) {
      failedLinkLabelError = failedLinks.map((failedLink) => (
        <p className="addLink-label-error-links">{failedLink}</p>
      ));
    }

    let failedLinkText;
    failedLinkText = `${failedLinkCount} links couldn't be retrieved:`;

    let loadingClass = !navActive
      ? "pure-material-progress-circular"
      : "hidden";

    let addLinkButton = loading ? (
      <div className="spinner-container">
        <progress className={loadingClass} />
      </div>
    ) : !errors ? (
      failedLinks.length > 0 ? (
        <div>
          <button
            type="button"
            onClick={this.handleForward}
            className="addLink-primary-button"
          >
            Add Manually
          </button>
          <button
            type="button"
            onClick={this.clearFailedLinksLocally}
            className="addLink-clear-button-small-margin"
          >
            Clear
          </button>
        </div>
      ) : (
        <button type="submit" className="addLink-primary-button">
          Add
        </button>
      )
    ) : errors.error === "Must not be empty" ||
      errors.error === "The link requested is invalid" ? (
      <button type="submit" className="addLink-primary-button">
        Add
      </button>
    ) : (
      <div>
        <button
          type="button"
          onClick={this.handleForward}
          className="addLink-primary-button"
        >
          Add Manually
        </button>
        <button
          type="button"
          onClick={this.clearFailedLinksLocally}
          className="addLink-clear-button-small-margin"
        >
          Clear
        </button>
      </div>
    );

    let addLinkLabel = !errors ? (
      failedLinks.length > 0 && !loading ? (
        <div>
          <p className="addLink-label-error">{failedLinkText}</p>
          {failedLinkLabelError}
          <p className="addLink-label-prompt-add-manually">
            Would you like to add these pages manually instead?
          </p>
        </div>
      ) : null
    ) : errors.error === "Must not be empty" ||
      errors.error === "The link requested is invalid" ? ( // </p> //   The page's details will retrieved once added. // <p className="addLink-label">
      <p className="addLink-label-error">{errors.error}</p>
    ) : !linkError && loading ? null : ( // </div> //   </p> //     instead? //     </span> //       add a page manually //     <span onClick={this.handleForward} className="addLink-label-url"> //     Would you like to //   <p className="addLink-label"> //   <p className="addLink-label-error">{errors.error}</p> // <div>
      <div>
        <p className="addLink-label-error">{failedLinkText}</p>
        {failedLinkLabelError}
        <p className="addLink-label-prompt-add-manually">
          Would you like to add these pages manually instead?
        </p>
      </div>
    );

    // let addLinkManuallyLabel = errors ? (
    //   errors.error === "Must not be empty" ? (
    //     <div className="addLink-addLinkManually-label-container">
    //       <p className="addLink-addLinkManually-label">
    //         <span
    //           onClick={this.handleForward}
    //           className="addLink-addLinkManually-label-url"
    //         >
    //           Add a page manually
    //         </span>
    //         instead.
    //       </p>
    //     </div>
    //   ) : null
    // ) : (
    //   <div className="addLink-addLinkManually-label-container">
    //     <p className="addLink-addLinkManually-label">
    //       <span
    //         onClick={this.handleForward}
    //         className="addLink-addLinkManually-label-url"
    //       >
    //         Add a page manually
    //       </span>
    //       instead.
    //     </p>
    //   </div>
    // );

    let addLinkManuallyLabel = errors ? (
      errors.error === "Must not be empty" ||
      errors.error === "The link requested is invalid" ? (
        !loading ? (
          <button
            type="button"
            onClick={this.handleForward}
            className="addLink-secondary-button"
          >
            Add a page manually
          </button>
        ) : null
      ) : null
    ) : !loading ? (
      failedLinks.length > 0 ? null : (
        <button
          type="button"
          onClick={this.handleForward}
          className="addLink-secondary-button"
        >
          Add a page manually
        </button>
      )
    ) : null;

    let subtitleText = !loading ? (
      <h4 className="addLink-action-label">
        Separate links with a comma “,” to add multiple pages.
      </h4>
    ) : (
      <h4 className="addLink-action-label-warning">
        Please do not leave while pages are being uploaded.
      </h4>
    );

    return (
      <div className="addLink-main-overall-container">
        <div className="addLink-card-container">
          <div className="addLink-container">
            <h3 className="addLink-title">{albumTitle}</h3>
            <h4 className="addLink-prompt">Add a Page</h4>
            {subtitleText}
            <form onSubmit={this.handleSubmit}>
              <textarea
                placeholder="Paste your link here..."
                type="text"
                rows="6"
                className="addLink-input-textarea"
                value={this.state.link}
                onChange={this.handleChange}
              />
              {addLinkLabel}
              {addLinkButton}
              {addLinkManuallyLabel}
              <p onClick={this.handleBack} className="addLink-cancel-button">
                Cancel
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.data.album,
  user: state.user,
  UI: state.UI,
  failedLinks: state.data.failedLinks,
  numOfLinksUploaded: state.data.numOfLinksUploaded,
});

const mapActionToProps = {
  addNewLink,
  clearFailedLinks,
  clearLinkError,
  clearTrackedLinks,
  stopLoadingUI,
};

addLink.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  numOfLinksUploaded: PropTypes.object.isRequired,
  addNewLink: PropTypes.func.isRequired,
  clearFailedLinks: PropTypes.func.isRequired,
  clearLinkError: PropTypes.func.isRequired,
  clearTrackedLinks: PropTypes.func.isRequired,
  failedLinks: PropTypes.array,
};

export default connect(mapStateToProps, mapActionToProps)(addLink);
