import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../styles/ProgressSpinner.css";
import "../styles/ResetPassword.css";

import { updateUserPassword } from "../redux/actions/userActions";

export class updatePassword extends Component {
  state = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  //handle input value change in a general manner
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const passwords = {
      oldPassword: this.state.oldPassword,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.updateUserPassword(passwords, this.props.history);
  };

  render() {
    const {
      user: { authenticated },
      UI: { loading },
    } = this.props;

    let updateUserButton = loading ? (
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

    return (
      <div className="resetPassword-container">
        <h2 className="resetPassword-title">Update Password</h2>
        <input
          id="oldPassword"
          name="oldPassword"
          placeholder="Old Password"
          type="password"
          className="resetPassword-input"
          value={this.state.oldPassword}
          onChange={this.handleChange}
        />
        {this.state.errors.oldPassword && (
          <label htmlFor="oldPassword" className="resetPassword-errors">
            {this.state.errors.oldPassword}
          </label>
        )}
        <input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          className="resetPassword-input"
          value={this.state.password}
          onChange={this.handleChange}
        />
        {!this.state.errors.password && (
          <label htmlFor="password" className="resetPassword-label-mini">
            Password should be within 6-20 characters and consist of at least 1
            numeric digit, 1 lowercase letter, and 1 upercase letter.
          </label>
        )}
        {this.state.errors.password && (
          <label htmlFor="password" className="resetPassword-errors-long">
            {this.state.errors.password}
          </label>
        )}
        <input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          className="resetPassword-input"
          value={this.state.confirmPassword}
          onChange={this.handleChange}
        />
        {this.state.errors.confirmPassword && (
          <label htmlFor="confirmPassword" className="resetPassword-errors">
            {this.state.errors.confirmPassword}
          </label>
        )}
        {updateUserButton}
        <Link to="/manageAccount" className="resetPassword-cancel-button">
          Cancel
        </Link>
      </div>
    );
  }
}

updatePassword.propTypes = {
  updateUserPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  updateUserPassword,
};

export default connect(mapStateToProps, mapActionToProps)(updatePassword);
