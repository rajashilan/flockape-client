import React, { Component } from "react";
import PropTypes from "prop-types";

import "../styles/AddAlbum.css";
import "../styles/ProgressSpinner.css";

import { connect } from "react-redux";
import { addNewAlbum } from "../redux/actions/dataActions";
import { Link } from "react-router-dom";

class addAlbum extends Component {
  state = {
    albumName: "",
    publicAlbum: true,
    privateAlbum: false,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      //successfully created new album
      //reset state
      //send user to add album image
      this.setState({
        albumName: "",
        publicAlbum: true,
        privateAlbum: false,
        errors: {},
      });
    }
  }

  handlePublicCheckBox = () => {
    if (this.state.privateAlbum) {
      this.setState({
        privateAlbum: false,
        publicAlbum: true,
      });
    } else if (this.state.publicAlbum) {
    } else {
      this.setState({
        publicAlbum: true,
      });
    }
  };

  handlePrivateCheckBox = () => {
    if (this.state.publicAlbum) {
      this.setState({
        publicAlbum: false,
        privateAlbum: true,
      });
    } else if (this.state.privateAlbum) {
    } else {
      this.setState({
        privateAlbum: true,
      });
    }
  };

  handleAlbumName = (event) => {
    this.setState({
      albumName: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const newAlbum = {
      albumTitle: this.state.albumName,
      security: "",
    };
    this.state.publicAlbum
      ? (newAlbum.security = "public")
      : (newAlbum.security = "private");

    this.props.addNewAlbum(newAlbum, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const {
      UI: { loading },
    } = this.props;

    let addAlbumButton = loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button type="submit" className="addAlbum-primary-button">
        Add Album
      </button>
    );

    return (
      <div className="addAlbum-container">
        <h3 className="addAlbum-title">Add an Album</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Album name"
            type="text"
            className="addAlbum-input"
            value={this.state.albumName}
            onChange={this.handleAlbumName}
          />
          {errors.albumTitle && (
            <label className="addAlbum-errors">{errors.albumTitle}</label>
          )}
          <div className="addAlbum-security-container">
            <label className="addAlbum-security-checkbox-container">
              <input
                type="checkbox"
                onChange={this.handlePublicCheckBox}
                checked={this.state.publicAlbum}
              />
              <span className="addAlbum-checkmark"></span>
            </label>
            <p className="addAlbum-security-label">Public</p>
            <label className="addAlbum-security-checkbox-container">
              <input
                type="checkbox"
                onChange={this.handlePrivateCheckBox}
                checked={this.state.privateAlbum}
              />
              <span className="addAlbum-checkmark"></span>
            </label>
            <p className="addAlbum-security-label">Private</p>
          </div>
          <div className="addAlbum-button-container">
            {errors.general && (
              <label className="addAlbum-errors-general">
                {errors.general}
              </label>
            )}
            {addAlbumButton}
            <Link to="/albums" className="addAlbum-cancel-button">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

addAlbum.propTypes = {
  addNewAlbum: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { addNewAlbum })(addAlbum);
