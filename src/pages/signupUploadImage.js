import React, { Component } from "react";

import "../styles/SignUpUploadImage.css";
import "../styles/ProgressSpinner.css";

import { uploadImage } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class signupUploadImage extends Component {
  state = {
    loading: false,
  };

  handleUploadImage = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  handleNextAction = () => {
    this.props.history.push("/signup-add-details");
  };

  render() {
    const {
      user: {
        loading,
        credentials: { profileImg },
      },
    } = this.props;

    let sendImageButton = loading ? (
      <div className="spinner-container-larger-margin">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button
        onClick={this.handleUploadImage}
        className="signup-uploadImage-secondary-button"
      >
        Select Image
      </button>
    );

    let userImageClassName = loading
      ? "signup-uploadImage-img-loading"
      : "signup-uploadImage-img";

    return (
      <div className="signup-uploadImage-container">
        <h2 className="signup-uploadImage-header">
          Upload your Profile Picture.
        </h2>
        <p className="signup-uploadImage-text">
          You can upload it later in your profile too.
        </p>
        <div className="signup-uploadImage-image-container">
          <img src={profileImg} className={userImageClassName} />
          <div className="signup-uploadImage-action-container">
            {sendImageButton}
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              onChange={this.handleImageChange}
              hidden="hidden"
            />
            <button
              onClick={this.handleNextAction}
              className="signup-uploadImage-primary-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  uploadImage,
};

signupUploadImage.propTypes = {
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(signupUploadImage);
