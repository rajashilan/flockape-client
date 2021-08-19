import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/AddLink.css";
import "../styles/ProgressSpinner.css";

import { addNewLink } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

//button will be clicked on the album's page that has the album's ID
//pass the albumID and albumName to this page from the albumDetails page
//using the link details and albumID, call the function in data action and handle everything there

export class addLink extends Component {
  state = {
    link: "",
  };

  handleChange = (event) => {
    this.setState({
      link: event.target.value,
    });
  };

  handleBack = () => {
    this.props.UI.errors = null;
    this.props.history.push({
      pathname: `/album/${this.props.album.albumID}`,
      state: { albumID: this.props.album.albumID },
    });
    // this.props.history.push(`/album/${this.props.album.albumID}`);
  };

  handleForward = () => {
    this.props.UI.errors = null;
    this.props.history.push("/addLinkManually");
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addNewLink(
      this.state.link,
      this.props.album.albumID,
      this.props.history
    );
  };
  render() {
    const {
      UI: { loading, errors },
      user: { credentials, authenticated },
      album: { albumID, albumTitle, username },
    } = this.props;

    if (!albumTitle || !albumID) {
      this.props.history.push("/albums");
    }

    if (!authenticated) {
      this.props.history.push("/login");
    }

    if (credentials.username !== username) {
      this.props.history.push("/albums");
    }

    let addLinkButton = loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button type="submit" className="addLink-primary-button">
        Add Link
      </button>
    );

    let addLinkLabel = !errors ? (
      <p className="addLink-label">
        The link's details will retrieved once added.
      </p>
    ) : errors.error === "Must not be empty" ? (
      <p className="addLink-label-error">{errors.error}</p>
    ) : (
      <div>
        <p className="addLink-label-error">{errors.error}</p>
        <p className="addLink-label">
          Would you like to
          <span onClick={this.handleForward} className="addLink-label-url">
            add a link manually
          </span>
          instead?
        </p>
      </div>
    );

    return (
      <div className="addLink-container">
        <h3 className="addLink-title">{albumTitle}</h3>

        <h4 className="addLink-prompt">Add a Link</h4>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Paste your link here..."
            type="text"
            className="addLink-input"
            value={this.state.link}
            onChange={this.handleChange}
          />
          {addLinkLabel}
          {addLinkButton}
          <p onClick={this.handleBack} className="addLink-cancel-button">
            Cancel
          </p>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.data.album,
  user: state.user,
  UI: state.UI,
});

addLink.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  addNewLink: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addNewLink })(addLink);
