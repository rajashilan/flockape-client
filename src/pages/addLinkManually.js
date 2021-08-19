import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/AddLink.css";
import "../styles/ProgressSpinner.css";

import { addNewLinkManually } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

//button will be clicked on the album's page that has the album's ID
//pass the albumID and albumName to this page from the albumDetails page
//using the link details and albumID, call the function in data action and handle everything there

export class addLinkManually extends Component {
  state = {
    link: "",
    title: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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

  handleGoToOri = () => {
    this.props.UI.errors = null;
    this.props.history.push("/addLink");
  };

  handleSubmit = (event) => {
    const newManualLink = {
      link: this.state.link,
      title: this.state.title,
    };
    event.preventDefault();
    this.props.addNewLinkManually(
      newManualLink,
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

    let addLinkLabel = !errors ? null : (
      <p className="addLink-label-error">{errors.error}</p>
    );

    return (
      <div className="addLink-container">
        <h3 className="addLink-title">{albumTitle}</h3>

        <h4 className="addLink-prompt">Add a Link Manually</h4>
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
            <p className="addLink-label-error-display-block">{errors.title}</p>
          )}
          {errors && <p className="addLink-label-error">{errors.album}</p>}
          {addLinkButton}
          <p onClick={this.handleBack} className="addLink-cancel-button">
            Cancel
          </p>
        </form>
        <div className="addLink-addLinkManually-label-container">
          <p className="addLink-addLinkManually-label">
            Would you like to
            <span
              onClick={this.handleGoToOri}
              className="addLink-addLinkManually-label-url"
            >
              add a link automatically
            </span>
            instead?
          </p>
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

addLinkManually.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  addNewLinkManually: PropTypes.func.isRequired,
  album: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { addNewLinkManually })(
  addLinkManually
);
