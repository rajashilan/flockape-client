import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../styles/ProgressSpinner.css";
import "../styles/ResetPassword.css";

import { resetUserPassword } from "../redux/actions/userActions";

export class resetPassword extends Component {
  state = {
    email: "",
    errors: {},
    success: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }

    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        errors: {},
        success: true,
      });
    }
  }

  //handle input value change in a general manner
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const sendEmail = {
      email: this.state.email,
    };
    this.props.resetUserPassword(sendEmail);
  };

  render() {
    const {
      user: { authenticated },
      UI: { loading },
    } = this.props;

    let resetPasswordButton = loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button
        onClick={this.handleSubmit}
        className="resetPassword-primary-button"
      >
        Reset Password
      </button>
    );

    let emailLabel = this.state.errors.email ? (
      <p className="resetPassword-errors">{this.state.errors.email}</p>
    ) : this.state.success ? (
      <label htmlFor="email" className="resetPassword-label-success">
        Reset link sent to your email successfully.
      </label>
    ) : (
      <label htmlFor="email" className="resetPassword-label">
        A link will be sent to your email to reset your password.
      </label>
    );

    let cancelButton = !this.state.success ? (
      <Link to="/login" className="resetPassword-cancel-button">
        Cancel
      </Link>
    ) : (
      <Link to="/login" className="resetPassword-cancel-button">
        Back
      </Link>
    );

    return (
      <div className="resetPassword-container">
        <h2 className="resetPassword-title">Reset Password</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleChange}
          className="resetPassword-input"
        />
        {emailLabel}
        {resetPasswordButton}
        {cancelButton}
      </div>
    );
  }
}

resetPassword.propTypes = {
  resetUserPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  resetUserPassword,
};

export default connect(mapStateToProps, mapActionToProps)(resetPassword);
