import React, { Component } from "react";

import "../styles/AddAlbumImage.css";
import "../styles/ProgressSpinner.css";

import Album from "../components/Album";

import { uploadAlbumImage } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class addAlbumImage extends Component {
  state = {
    album: {},
  };

  componentDidMount() {
    if (this.props.location.state) {
      let findAlbum = this.props.data.albums.find(
        (album) => album.albumID === this.props.location.state.albumID
      );
      this.setState({
        album: findAlbum,
      });
    }

    if (!this.props.location.state) {
      this.props.history.push("/books");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.state && !nextProps.data.loading) {
      let findAlbum = this.props.data.albums.find(
        (album) => album.albumID === this.props.location.state.albumID
      );
      this.setState({
        album: findAlbum,
      });
    }
  }

  handleFinish = () => {
    this.props.history.push("/books");
  };

  handleUploadImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadAlbumImage(formData, this.state.album.albumID);
  };

  render() {
    const { loading } = this.props.data;
    const { navActive } = this.props.UI;

    //handle redirect on refresh
    if (this.props.data.albums.length === 0) {
      this.props.history.push("/books");
    }

    let loadingClass = !navActive
      ? "pure-material-progress-circular"
      : "hidden";

    let sendImageButton = loading ? (
      <div className="spinner-container-larger-margin">
        <progress className={loadingClass} />
      </div>
    ) : (
      <button
        onClick={this.handleUploadImage}
        className="addAlbumImage-secondary-button"
      >
        Upload Cover
      </button>
    );

    return (
      <div className="addAlbumImage-main-overall-container">
        <div className="addAlbumImage-card-container">
          <div className="addAlbumImage-container">
            <h2 className="addAlbumImage-title">
              {this.state.album.security} Book created
            </h2>
            <Album
              key={this.state.album.albumID}
              album={this.state.album}
              options={false}
            />

            <div className="addAlbumImage-button-container">
              {sendImageButton}
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={this.handleImageChange}
                hidden="hidden"
              />
              <button
                onClick={this.handleFinish}
                className="addAlbumImage-primary-button"
              >
                Finish
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

addAlbumImage.propTypes = {
  data: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  uploadAlbumImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  data: state.data,
});

export default connect(mapStateToProps, { uploadAlbumImage })(addAlbumImage);
