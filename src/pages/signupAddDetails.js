import React, { Component } from "react";

import "../styles/SignUpAddDetails.css";

import { editUserDetails } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class signupAddDetails extends Component {
  state = {
    bio: "",
    website: "",
    location: "",
  };

  //handle input value change in a general manner
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website,
      fullName: "",
    };
    this.props.editUserDetails(userDetails);
  };

  componentWillMount = () => {
    const {
      user: {
        credentials: { bio, location, website },
      },
    } = this.props;
    this.setState({
      bio: bio ? bio : "",
      location: location ? location : "",
      website: website ? website : "",
    });
  };

  handleFinishAction = () => {
    this.props.history.push({
      pathname: "/albums",
      state: { verification: "verified" },
    });
  };

  render() {
    const {
      user: { loading },
    } = this.props;

    let buttonText;
    let buttonClass;

    if (loading) {
      buttonText = "Updating details...";
      buttonClass = "signup-add-details-disabled-button";
    } else {
      buttonText = "Add Details";
      buttonClass = "signup-add-details-secondary-button";
    }

    return (
      <div className="signup-add-details-container">
        <h2 className="signup-add-details-header">Add aditional details</h2>
        <p className="signup-add-details-text">
          You can update your details later in settings.
        </p>
        <form onSubmit={this.handleSubmit} className="signup-add-details-form">
          <textarea
            type="text"
            name="bio"
            id="bio"
            rows="3"
            value={this.state.bio}
            onChange={this.handleChange}
            placeholder="A short bio about yourself"
            className="signup-add-details-input-textarea"
          />
          <input
            type="text"
            name="location"
            id="location"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="Your location"
            className="signup-add-details-input"
          />
          <input
            type="text"
            name="website"
            id="website"
            value={this.state.website}
            onChange={this.handleChange}
            placeholder="Your personal website/link"
            className="signup-add-details-input"
          />
          <button type="submit" className={buttonClass}>
            {buttonText}
          </button>
        </form>
        <button
          onClick={this.handleFinishAction}
          className="signup-add-details-primary-button"
        >
          Finish
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

signupAddDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(signupAddDetails);
