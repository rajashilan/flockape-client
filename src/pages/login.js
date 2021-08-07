import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../styles/Login.css";
import "../styles/PrimaryButton.css";

//redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    //pass in user data and history to be used by loginUser function in user reducer
    this.props.loginUser(userData, this.props.history);
  };

  //handle input value change in a general manner
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  Verification = () => {
    if (this.props.location.state) {
      return (
        <p className="label-verification">
          A verification link has been sent to your email account. Please click
          on that link to complete your registration process. Thank you!
        </p>
      );
    } else return null;
  };

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    let buttonText;
    let buttonClass;

    if (loading) {
      buttonText = "Logging in...";
      buttonClass = "disabled-button";
    } else {
      buttonText = "Log In";
      buttonClass = "primary-button";
    }

    return (
      <div>
        <this.Verification />
        <div className="login-text-container">
          <h1 className="login-header">Log In</h1>
          <h3 className="login-paragraph">
            and continue sharing everything you love about the Internet.
          </h3>
        </div>
        <form noValidate onSubmit={this.handleSubmit} className="login-form">
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
          <input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            className="login-input"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {errors.password && (
            <label htmlFor="password" className="login-errors">
              {errors.password}
            </label>
          )}
          {errors.general && (
            <label className="login-errors-general">{errors.general}</label>
          )}
          <button
            id="logInButton"
            type="submit"
            className={buttonClass}
            disabled={loading}
          >
            {buttonText}
          </button>
        </form>
        <div className="login-links-container">
          <p className="register-text">
            Don't have an account yet?
            <Link className="register-link" to="/signup">
              Register
            </Link>
            instead.
          </p>
          <Link className="forgot-password-link" to="/">
            Forgot password?
          </Link>
        </div>
      </div>
    );
  }
}

login.propTypes = {
  // classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionToProps)(login);
