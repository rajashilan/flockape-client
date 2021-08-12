import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../styles/Login.css";
import "../styles/PrimaryButton.css";
import "../styles/ProgressSpinner.css";

//redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
      fullName: "",
      birthday: "",
      loading: false,
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  //handle form submit
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      username: this.state.username,
      fullName: this.state.fullName,
      birthday: this.state.birthday,
    };
    if (this.state.birthday.trim()) {
      const dateSplit = this.state.birthday.split("-");
      const day = parseInt(dateSplit[2], 10);
      const month = parseInt(dateSplit[1], 10);
      const year = parseInt(dateSplit[0], 10);
      const birthdayFormatted = day + "/" + month + "/" + year;
      console.log(birthdayFormatted);
      newUserData.birthday = birthdayFormatted;
    }
    this.props.signupUser(newUserData, this.props.history);
  };

  //handle input value change in a general manner
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    let signUpButton = loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button
        id="signUpButton"
        type="submit"
        className="primary-button"
        disabled={loading}
      >
        Sign Up
      </button>
    );

    return (
      <div>
        <div className="login-text-container">
          <h1 className="login-header">Sign Up</h1>
          <h3 className="login-paragraph">
            and start sharing everything you love about the Internet.
          </h3>
        </div>
        <form noValidate onSubmit={this.handleSubmit} className="login-form">
          {/* ----------------------------email input -----------------------*/}
          <input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            className="login-input"
            value={this.state.email}
            onChange={this.handleChange}
          />
          {errors.email && (
            <label htmlFor="email" className="login-errors">
              {errors.email}
            </label>
          )}
          {/* ----------------------------username input -----------------------*/}
          <input
            id="username"
            name="username"
            placeholder="Username"
            type="text"
            className="login-input"
            value={this.state.username}
            onChange={this.handleChange}
          />
          {errors.username && (
            <label htmlFor="username" className="login-errors">
              {errors.username}
            </label>
          )}
          {/* ----------------------------fullname input -----------------------*/}
          <input
            id="fullName"
            name="fullName"
            placeholder="Full Name"
            type="text"
            className="login-input"
            value={this.state.fullName}
            onChange={this.handleChange}
          />
          {errors.fullName && (
            <label htmlFor="fullName" className="login-errors">
              {errors.fullName}
            </label>
          )}
          {/* ----------------------------birthday input -----------------------*/}
          <label htmlFor="birthday" className="login-label">
            Birthday
          </label>
          <input
            id="birthday"
            name="birthday"
            placeholder="Birthday"
            type="date"
            className="login-input"
            value={this.state.birthday}
            onChange={this.handleChange}
          />
          <label htmlFor="birthday" className="login-label-mini">
            Your birthday will not be shared with other users.
          </label>
          {errors.birthday && (
            <label htmlFor="birthday" className="login-errors">
              {errors.birthday}
            </label>
          )}
          {/* ----------------------------password input -----------------------*/}
          <input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            className="login-input"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {!errors.password && (
            <label htmlFor="password" className="login-label-mini">
              Password should be within 6-20 characters and consist of at least
              1 numeric digit, 1 lowercase letter, and 1 upercase letter.
            </label>
          )}
          {errors.password && (
            <label htmlFor="password" className="login-errors-long">
              {errors.password}
            </label>
          )}
          {/* ----------------------------confirm password input -----------------------*/}
          <input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className="login-input"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
          />
          {errors.confirmPassword && (
            <label htmlFor="confirmPassword" className="login-errors">
              {errors.confirmPassword}
            </label>
          )}
          <div className="condition-container">
            <label htmlFor="password" className="condition-label">
              By signing up, you agree with our
            </label>
            <Link className="condition-link" to="/termsAndConditions">
              T&C.
            </Link>
          </div>
          {errors.general && (
            <label className="login-errors-general">{errors.general}</label>
          )}
          {signUpButton}
        </form>
        <div className="login-links-container">
          <p className="register-text">
            Already have an account?
            <Link className="register-link" to="/login">
              Log In
            </Link>
            instead.
          </p>
        </div>
      </div>
    );
  }
}

signup.propTypes = {
  //   classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { signupUser })(signup);
