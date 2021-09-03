import React, { Component } from "react";

import "../styles/SignUpUploadImage.css";
import "../styles/ProgressSpinner.css";

import { uploadImage } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class signupUploadImage extends Component {
  state = {
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors && nextProps.UI.errors !== this.props.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
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

    const { errors } = this.state;

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
      <div className="signup-uploadImage-main-container">
        <div className="signup-uploadImage-card-container">
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
            {errors.image && (
              <p className="signup-uploadImage-errors">{errors.image}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadImage,
};

signupUploadImage.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(signupUploadImage);
