import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../styles/Login.css";
import "../styles/PrimaryButton.css";
import "../styles/ProgressSpinner.css";

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

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    let logInButton = loading ? (
      <div className="spinner-container">
        <progress className="pure-material-progress-circular" />
      </div>
    ) : (
      <button
        id="logInButton"
        type="submit"
        className="primary-button"
        disabled={loading}
      >
        Log In
      </button>
    );

    return (
      <div className="login-main-container">
        <div className="login-card-container">
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
            {logInButton}
          </form>
          <div className="login-links-container">
            <p className="register-text">
              Don't have an account yet?
              <Link className="register-link" to="/signup">
                Register
              </Link>
              instead.
            </p>
            <Link className="forgot-password-link" to="/reset-password">
              Forgot password?
            </Link>
          </div>
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
