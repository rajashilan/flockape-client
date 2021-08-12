import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//css
import "../styles/Navbar.css";
import "../styles/MobileMenu.css";
import "../styles/PrimaryButton.css";
//images
import logo from "./images/logo@2x.png";
import searchIcon from "./images/searchIcon@2x.png";
import notificationIcon from "./images/notificationIcon@2x.png";
//components
import SearchedUserCard from "./SearchedUserCard";
import LoadingSearchedUserCard from "./LoadingSearchedUserCard";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/userActions";

//VIEW PROFILE AND SHARE PROFILE ONLY VISIBLE WHEN USER LOGGED IN

export class Navbar2 extends Component {
  state = {
    showMobileMenu: false,
    showSearchButton: false,
    loadingUser: false,
    searchedUsers: null,
    username: "", //for searching user
    userNotFound: false,
  };

  showMenu = () => {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu,
    });
  };

  showSearchBar = () => {
    this.setState({
      showSearchButton: !this.state.showSearchButton,
      username: "",
      searchedUsers: null,
    });
  };

  handleLogOut = () => {
    this.showMenu();
    this.props.logoutUser();
  };

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
        loadingUser: true,
      },
      () => {
        if (this.state.username.length < 1) {
          this.setState({
            loadingUser: false,
            searchedUsers: null,
            userNotFound: false,
          });
        } else {
          this.searchUser();
        }
      }
    );
  };

  // handleShareProfile = () => {
  //   window.clipboardData.setData("Text", "hello");
  //   alert("Your profile is copied to clipboard.");
  //   this.setState({
  //     showMobileMenu: !this.state.showMobileMenu,
  //   });
  // };

  searchUser = () => {
    const searchUserData = {
      username: this.state.username,
    };
    if (searchUserData.username.length >= 3) {
      axios
        .post("/searchUser", searchUserData)
        .then((res) => {
          this.setState(
            {
              searchedUsers: res.data,
              loadingUser: false,
              userNotFound: false,
            },
            () => {
              if (
                this.state.searchedUsers &&
                this.state.searchedUsers.length === 0
              ) {
                this.setState({
                  userNotFound: true,
                });
              }
            }
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const {
      user: {
        authenticated,
        loading,
        credentials: { profileImg, notifications },
      },
    } = this.props;

    let mobileMenuContainer = !authenticated ? (
      <div className="displayItems">
        <Link
          onClick={this.showMenu}
          className="primary-button-medium-margin"
          to="/login"
        >
          Log In
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
          Add an Album
        </Link>
        <div className="menuItemsContainer">
          <ul className="noBullets">
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/albums"
              >
                Home
              </Link>
            </li>
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
              <Link
                onClick={this.showMenu}
                className="menuItems"
                to="/signup-add-details"
              >
                Leave Feedback
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

    let searchIconClassName = authenticated
      ? "navbar-search-button-authenticated-container"
      : "navbar-search-button-unauthenticated-container";

    let userImageClassName = loading
      ? "navbar-profile-image-loading"
      : "navbar-profile-image";

    let searchedUserData = this.state.searchedUsers ? (
      this.state.searchedUsers.map((user) => (
        <SearchedUserCard key={user.username} user={user} />
      ))
    ) : (
      <p></p>
    );

    return (
      <div className="navbar">
        {!this.state.showSearchButton && (
          <Link to="/albums" className="navbar-controlled-link">
            <img className="navbar-logo" src={logo} alt="flockape" />
          </Link>
        )}

        {this.state.showSearchButton && (
          <input
            type="text"
            placeholder="Search for a user"
            name="username"
            autoComplete="off"
            className="navbar-search-bar"
            value={this.state.username}
            onChange={this.handleChange}
          />
        )}

        {this.state.showSearchButton && (
          <div
            onClick={this.showSearchBar}
            className="navbar-cancel-button-container"
          >
            <p className="navbar-cancel-button">Cancel</p>
          </div>
        )}

        {authenticated && !this.state.showSearchButton && (
          <Link to="/profile" className="navbar-profile-image-container">
            <img src={profileImg} className={userImageClassName} />
          </Link>
        )}

        {!this.state.showSearchButton && (
          <div onClick={this.showSearchBar} className={searchIconClassName}>
            <img
              src={searchIcon}
              alt="search"
              className="navbar-search-button"
            />
          </div>
        )}

        {!authenticated && !this.state.showSearchButton && (
          <Link className="navbar-button" to="/signup">
            Sign Up
          </Link>
        )}

        {authenticated && !this.state.showSearchButton && (
          <div className="navbar-notification-button-container">
            <img
              src={notificationIcon}
              alt="notification icon"
              className="navbar-notification-button"
            />
          </div>
        )}

        {!this.state.showMobileMenu && (
          <div className="navbar-hamburger-container" onClick={this.showMenu}>
            <div className="navbar-hamburger"></div>
            <div className="navbar-hamburger"></div>
            <div className="navbar-hamburger"></div>
          </div>
        )}

        {this.state.showMobileMenu && (
          <div className="navbar-close-container" onClick={this.showMenu}>
            <div className="navbar-close-top">
              <div className="navbar-close-bottom"></div>
            </div>
          </div>
        )}

        {this.state.username.length > 0 && (
          <div className="searchUser-cards-container">
            <LoadingSearchedUserCard
              loadingUser={this.state.loadingUser}
              notFound={this.state.userNotFound}
            />
          </div>
        )}

        {this.state.searchedUsers && (
          <div className="searchUser-cards-container">{searchedUserData}</div>
        )}

        {this.state.showMobileMenu && (
          <div className="mobileMenuMask">
            <div className="mobileMenu">{mobileMenuContainer}</div>
          </div>
        )}
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

Navbar2.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(Navbar2);
