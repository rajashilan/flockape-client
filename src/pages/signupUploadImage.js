import React, { Component } from "react";

import "../styles/SignUpUploadImage.css";

import { uploadImage } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class signupUploadImage extends Component {
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

    let userImageClassName = loading
      ? "signup-uploadImage-img-loading"
      : "signup-uploadImage-img";

    let buttonText;
    let buttonClass;

    if (loading) {
      buttonText = "Getting image...";
      buttonClass = "signup-uploadImage-disabled-button";
    } else {
      buttonText = "Select Image";
      buttonClass = "signup-uploadImage-secondary-button";
    }

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
            <button onClick={this.handleUploadImage} className={buttonClass}>
              {buttonText}
            </button>
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
