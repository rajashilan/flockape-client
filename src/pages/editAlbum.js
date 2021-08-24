import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/ProgressSpinner.css";
import "../styles/ProgressSpinnerNoBg.css";
import "../styles/AddAlbum.css";

import {
  uploadAlbumImage,
  editAlbumDetails,
} from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class editAlbum extends Component {
  state = {
    albumName: "",
    publicAlbum: true,
    privateAlbum: false,
    errors: {},
  };

  componentDidMount() {
    if (this.props.album) {
      if (this.props.album.security === "public") {
        this.setState({
          albumName: this.props.album.albumTitle,
          publicAlbum: true,
          privateAlbum: false,
        });
      } else if (this.props.album.security === "private") {
        this.setState({
          albumName: this.props.album.albumTitle,
          publicAlbum: false,
          privateAlbum: true,
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
  }

  handleUploadImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadAlbumImage(formData, this.props.album.albumID);
  };

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
    const editedAlbum = {
      albumTitle: this.state.albumName,
      security: "",
    };
    this.state.publicAlbum
      ? (editedAlbum.security = "public")
      : (editedAlbum.security = "private");

    this.props.editAlbumDetails(
      editedAlbum,
      this.props.album.albumID,
      this.props.album.username,
      this.props.history
    );
  };

  render() {
    const { loading } = this.props.data;
    const { albumImg, username } = this.props.album;
    const { errors } = this.state;

    // handle redirect on refresh
    if (!albumImg) {
      this.props.history.push("/albums");
    }

    let uploadAlbumImageButton = loading ? (
      <div className="spinner-container-nobg">
        <progress className="pure-material-progress-circular-nobg" />
      </div>
    ) : (
      <h3
        onClick={this.handleUploadImage}
        className="addAlbum-change-img-button"
      >
        Change Album Picture
      </h3>
    );

    let editAlbumButton = this.props.UI.loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button type="submit" className="addAlbum-primary-button">
        Edit Album
      </button>
    );
    return (
      <div className="addAlbum-container">
        <h3 className="addAlbum-title">Edit your Album</h3>
        <img src={albumImg} className="addAlbum-img" />
        {uploadAlbumImageButton}
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={this.handleImageChange}
          hidden="hidden"
        />
        <div className="addAlbum-editAlbum-container">
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
              {editAlbumButton}
              <Link
                to={`/@${username}/album/${this.props.album.albumID}`}
                className="addAlbum-cancel-button"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

editAlbum.propTypes = {
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  uploadAlbumImage: PropTypes.func.isRequired,
  editAlbumDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
  album: state.data.album,
});

const mapActionsToProps = {
  uploadAlbumImage,
  editAlbumDetails,
};

export default connect(mapStateToProps, mapActionsToProps)(editAlbum);
