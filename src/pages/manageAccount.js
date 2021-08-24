import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/ManageAccount.css";
import "../styles/ProgressSpinnerNoBg.css";
import "../styles/ProgressSpinner.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { editUserDetails, uploadImage } from "../redux/actions/userActions";

export class manageAccount extends Component {
  state = {
    fullName: "",
    bio: "",
    website: "",
    location: "",
    errors: {},
    back: false,
  };

  componentDidMount() {
    const {
      user: {
        credentials: { fullName, bio, location, website },
      },
    } = this.props;
    this.setState({
      fullName: fullName ? fullName : "",
      bio: bio ? bio : "",
      location: location ? location : "",
      website: website ? website : "",
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors && nextProps.UI.errors !== this.props.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }

    if (!nextProps.UI.errors && !this.props.user.loading) {
      this.setState({
        back: true,
      });
    }
  }

  //handle input value change in a general manner
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      errors: {},
    });
    const userDetails = {
      fullName: this.state.fullName,
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
    };
    this.props.editUserDetails(userDetails);
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

  render() {
    if (!this.props.user.credentials.username) {
      this.props.history.push("/albums");
    }

    const {
      user: {
        loading,
        credentials: { profileImg },
      },
    } = this.props;

    const { errors } = this.state;

    let addDetailButton = loading ? (
      <div className="spinner-container-larger-margin-top">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button type="submit" className="manageAccount-primary-button">
        Update Details
      </button>
    );

    let changeProfilePictureButton = loading ? (
      <div className="spinner-container-nobg">
        <progress className="pure-material-progress-circular-nobg" />
      </div>
    ) : (
      <h3
        onClick={this.handleUploadImage}
        className="manageAccount-profileImg-button"
      >
        Change Profile Picture
      </h3>
    );

    let cancelText = this.state.back
      ? (cancelText = "back")
      : (cancelText = "cancel");

    let toHistory;
    this.props.location.state && this.props.location.state.history
      ? (toHistory = this.props.location.state.history)
      : (toHistory = "/albums");

    return (
      <div className="manageAccount-container">
        <h2 className="manageAccount-title">Manage your Account</h2>
        <div className="manageAccount-profileImg-container">
          <img src={profileImg} className="manageAccount-profileImg" />
          {errors.image && (
            <p className="manageAccount-errors-alt">{errors.image}</p>
          )}
          {changeProfilePictureButton}
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={this.handleImageChange}
            hidden="hidden"
          />
        </div>
        <form onSubmit={this.handleSubmit} className="manageAccount-form">
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={this.state.fullName}
            onChange={this.handleChange}
            placeholder="Your full name"
            className="manageAccount-input"
          />
          {errors.fullName && (
            <label htmlFor="fullName" className="manageAccount-errors">
              {errors.fullName}
            </label>
          )}
          <textarea
            type="text"
            name="bio"
            id="bio"
            rows="3"
            value={this.state.bio}
            onChange={this.handleChange}
            placeholder="A short bio about yourself"
            className="manageAccount-input-textarea"
          />
          <input
            type="text"
            name="location"
            id="location"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="Your location"
            className="manageAccount-input"
          />
          <input
            type="text"
            name="website"
            id="website"
            value={this.state.website}
            onChange={this.handleChange}
            placeholder="Your personal website/link"
            className="manageAccount-input"
          />
          {addDetailButton}
        </form>
        <Link to="/updatePassword" className="manageAccount-secondary-button">
          Change Password
        </Link>
        <Link to={toHistory} className="manageAccount-cancel-button">
          {cancelText}
        </Link>
      </div>
    );
  }
}

manageAccount.propTypes = {
  // classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  editUserDetails,
  uploadImage,
};

export default connect(mapStateToProps, mapActionToProps)(manageAccount);
