import React, { Component } from "react";

import {
  submitFeedback,
  clearFeedbackMessage,
} from "../redux/actions/userActions";

import "../styles/AddLink.css";
import "../styles/ProgressSpinner.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class feedback extends Component {
  state = {
    feedback: "",
    email: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleBack = () => {
    this.props.UI.errors = null;
    this.props.clearFeedbackMessage();
    this.props.history.push(`/books`);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let feedback;
    if (this.props.user.credentials.email) {
      feedback = {
        email: this.props.user.credentials.email,
        message: this.state.feedback,
      };
    } else {
      feedback = {
        email: this.state.email,
        message: this.state.feedback,
      };
    }
    this.props.submitFeedback(feedback);
  };

  render() {
    const {
      user: {
        credentials: { email },
      },
      UI: { loading, errors, navActive, feedbackMessage },
    } = this.props;

    let loadingClass = !navActive
      ? "pure-material-progress-circular"
      : "hidden";

    //if error, show error label, if no, show null
    //if has message, show message, if no, show null
    //if loading, show loading, if no, show submit button
    //if user is logged in, no need for email input, else, show email input

    let errorLabelEmail =
      errors && errors.email ? (
        <p className="addLink-label-error">{errors.email}</p>
      ) : null;

    let errorLabelMessage =
      errors && errors.message ? (
        <p className="addLink-label-error">{errors.message}</p>
      ) : null;

    let message = feedbackMessage ? (
      <p className="addLink-label-success-no-margin">{feedbackMessage}</p>
    ) : null;

    let submitFeedbackButton = loading ? (
      <div className="spinner-container">
        <progress className={loadingClass} />
      </div>
    ) : (
      <button type="submit" className="addLink-primary-button">
        Submit
      </button>
    );

    let emailInput = this.props.user.credentials.email ? null : (
      <input
        id="email"
        name="email"
        placeholder="Email"
        type="email"
        className="addLink-input"
        value={this.state.email}
        onChange={this.handleChange}
      />
    );

    return (
      <div className="addLink-main-overall-container">
        <div className="addLink-card-container">
          <div className="addLink-container">
            <h4 className="addLink-prompt">Leave us a feedback!</h4>
            <h4 className="addLink-action-label">
              Your feedback is of great importance to us as we strive to drive
              flockape in the direction our users would love to be in.
            </h4>
            <form onSubmit={this.handleSubmit}>
              <textarea
                name="feedback"
                placeholder="Type your feedback here..."
                type="text"
                rows="3"
                className="addLink-input-textarea-margin"
                value={this.state.feedback}
                onChange={this.handleChange}
              />
              {errorLabelMessage}
              {emailInput}
              {errorLabelEmail}
              {submitFeedbackButton}
              {message}
              <p onClick={this.handleBack} className="addLink-cancel-button">
                Back
              </p>
            </form>
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

const mapActionToProps = {
  submitFeedback,
  clearFeedbackMessage,
};

feedback.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  clearFeedbackMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(feedback);
