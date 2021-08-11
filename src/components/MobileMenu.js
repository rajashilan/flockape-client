import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/userActions";

//css
import "../styles/MobileMenu.css";
import "../styles/PrimaryButton.css";
//components

export class MobileMenu extends Component {
  handleLogOut = () => {
    this.showMenu();
    this.props.logoutUser();
  };

  render() {
    const {
      user: { authenticated },
    } = this.props;

    let mobileMenuContainer = !authenticated ? (
      <div className="displayItems">
        <Link
          onClick={this.showMenu}
          className="primary-button-medium-margin"
          to="/login"
        >
          Log Indsdsd
        </Link>
        <Link
          onClick={this.showMenu}
          className="primary-button-medium-margin"
          to="/signup"
        >
          Sign Up
        </Link>
        <div className="menuItemsContainer">
          <ul className="noBullets">
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/profile"
              >
                Support Us
              </Link>
            </li>
            <li>
              <Link onClick={this.showMenu} className="menuItems" to="/profile">
                Leave Feedback
              </Link>
            </li>
            <li>
              <Link onClick={this.showMenu} className="menuItems" to="/profile">
                Report a Bug
              </Link>
            </li>
            <li>
              <Link onClick={this.showMenu} className="menuItems" to="/profile">
                Share flockape
              </Link>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="displayItems">
        <Link
          onClick={this.showMenu}
          className="primary-button-medium-margin"
          to="#"
        >
          Add an Albumsdsd
        </Link>
        <div className="menuItemsContainer">
          <ul className="noBullets">
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/profile"
              >
                View Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/profile"
              >
                Manage Account
              </Link>
            </li>
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/profile"
              >
                Share your Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/profile"
              >
                Support Us
              </Link>
            </li>
            <li>
              <Link onClick={this.showMenu} className="menuItems" to="/profile">
                Leave Feedback
              </Link>
            </li>
            <li>
              <Link onClick={this.showMenu} className="menuItems" to="/profile">
                Report a Bug
              </Link>
            </li>
            <li>
              <p onClick={this.handleLogOut} className="menuItems">
                Log Out
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
    return (
      <div className="mobileMenuMask">
        <div className="mobileMenu">{mobileMenuContainer}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  logoutUser,
};

MobileMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(MobileMenu);
