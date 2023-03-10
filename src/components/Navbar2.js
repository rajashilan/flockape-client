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
import notificationAlertIcon from "./images/notificationAlertIcon@2x.png";
//components
import SearchedUserCard from "./SearchedUserCard";
import LoadingSearchedUserCard from "./LoadingSearchedUserCard";
import { PopUp } from "./PopUp";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../redux/actions/userActions";
import { setNav, clearNav } from "../redux/actions/uiActions";

//VIEW PROFILE AND SHARE PROFILE ONLY VISIBLE WHEN USER LOGGED IN

export class Navbar2 extends Component {
  state = {
    showMobileMenu: false,
    showSearchButton: false,
    loadingUser: false,
    searchedUsers: null,
    username: "", //for searching user
    userNotFound: false,
    showPopUp: false,
  };

  showMenu = () => {
    this.setState(
      {
        showMobileMenu: !this.state.showMobileMenu,
      },
      () => {
        if (this.state.showMobileMenu) this.props.setNav();
        else this.props.clearNav();
      }
    );
  };

  copyProfile = async () => {
    await navigator.clipboard.writeText(
      `https://sharesite-test.web.app/@${this.props.user.credentials.username}`
    );

    this.setState(
      {
        showPopUp: true,
      },
      () => {
        if (this.state.showPopUp) this.setPopUpTimer();
        this.showMenu();
      }
    );
  };

  copyBook = async () => {
    await navigator.clipboard.writeText(
      `https://sharesite-test.web.app/${this.props.user.credentials.username}/book/${this.props.data.album.albumID}`
    );

    this.setState(
      {
        showPopUp: true,
      },
      () => {
        if (this.state.showPopUp) this.setPopUpTimer();
        this.showMenu();
      }
    );
  };

  setPopUpTimer = () => {
    setTimeout(() => {
      this.setState({
        showPopUp: false,
      });
    }, 2000);
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

  handleUserClick = () => {
    this.setState({
      showMobileMenu: false,
      showSearchButton: false,
      loadingUser: false,
      searchedUsers: null,
      username: "", //for searching user
      userNotFound: false,
    });
  };

  render() {
    const {
      user: {
        authenticated,
        loading,
        credentials: { profileImg, isVerified },
      },
    } = this.props;

    const notifications = this.props.notifications;

    let editAlbumButton = this.props.UI.isAlbum ? (
      <Link
        onClick={this.showMenu}
        className="primary-button-medium-margin"
        to="/edit-book"
      >
        Edit Book
      </Link>
    ) : null;

    let addAlbumOrLinkButton = !this.props.UI.isAlbum ? (
      isVerified ? (
        <Link
          onClick={this.showMenu}
          className="primary-button-medium-margin"
          to="/create-book"
        >
          Create a Book
        </Link>
      ) : (
        <button
          type="button"
          onClick={this.showMenu}
          className="secondary-button-medium-margin"
        >
          Create a Book
        </button>
      )
    ) : isVerified ? (
      <Link
        onClick={this.showMenu}
        className="primary-button-medium-margin"
        to="/add-page"
      >
        Add a page
      </Link>
    ) : (
      <button
        onClick={this.showMenu}
        className="secondary-button-medium-margin"
        type="button"
      >
        Add a page
      </button>
    );

    let shareUrlButton = this.props.UI.isAlbum ? (
      <p onClick={this.copyBook} className="menuItems-Priority">
        Share this Book
      </p>
    ) : (
      <p onClick={this.copyProfile} className="menuItems-Priority">
        Share your Profile
      </p>
    );

    const popup = this.state.showPopUp ? (
      this.props.UI.isAlbum ? (
        <PopUp text="Book URL copied successfully" />
      ) : (
        <PopUp text="Profile URL copied successfully" />
      )
    ) : null;

    const toManageAccount = {
      pathname: "/manage-account",
      state: { history: window.location.pathname },
    };

    let mobileMenuClass = authenticated
      ? "mobileMenu"
      : "mobileMenuUnauthenticated";

    let hamburgerContainerClass = authenticated
      ? "navbar-hamburger-container"
      : "navbar-hamburger-container-unauthenticated";

    let mobileMenuContainer = !authenticated ? (
      <div className="displayItemsUnauthenticated">
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
            {/* <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/profile"
              >
                Support Us
              </Link>
            </li> */}
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems"
                to="/feedback"
              >
                Leave Feedback
              </Link>
            </li>
            {/* <li>
              <Link onClick={this.showMenu} className="menuItems" to="/profile">
                Share flockape
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    ) : (
      <div className="displayItems">
        {addAlbumOrLinkButton}
        {editAlbumButton}
        <div className="menuItemsContainer">
          <ul className="noBullets">
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/"
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
                to={toManageAccount}
              >
                Manage Account
              </Link>
            </li>
            <li>{shareUrlButton}</li>
            {/* <li>
              <Link
                onClick={this.showMenu}
                className="menuItems-Priority"
                to="/user"
              >
                Support Us
              </Link>
            </li> */}
            <li>
              <Link
                onClick={this.showMenu}
                className="menuItems"
                to="/feedback"
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

    let userImageElement = loading ? (
      <div className="navbar-profile-image-container">
        <div src={profileImg} className="navbar-profile-image-loading"></div>
      </div>
    ) : (
      <Link to="/profile" className="navbar-profile-image-container">
        <img src={profileImg} className="navbar-profile-image" />
      </Link>
    );

    let searchedUserData = this.state.searchedUsers ? (
      this.state.searchedUsers.map((user) => (
        <SearchedUserCard key={user.username} user={user} />
      ))
    ) : (
      <p></p>
    );

    let topBarButton = this.props.UI.isAlbum ? (
      isVerified ? (
        <Link className="navbar-topbar-button" to="/add-page">
          Add a Page
        </Link>
      ) : (
        <button className="navbar-topbar-secondary-button">Add a Page</button>
      )
    ) : isVerified ? (
      <Link className="navbar-topbar-button" to="/create-book">
        Create a Book
      </Link>
    ) : (
      <button className="navbar-topbar-secondary-button">Create a Book</button>
    );

    let notificationDisplay = notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((notification) => notification.read === false)
        .length > 0
        ? (notificationDisplay = notificationAlertIcon)
        : (notificationDisplay = notificationIcon);
    }

    return (
      <div className="navbar">
        {!this.state.showSearchButton && (
          <Link to="/books" className="navbar-controlled-link">
            <img className="navbar-logo" src={logo} alt="flockape" />
          </Link>
        )}

        {/* search button stuff */}
        {/* {this.state.showSearchButton && (
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

        {!this.state.showSearchButton && (
          <div onClick={this.showSearchBar} className={searchIconClassName}>
            <img
              src={searchIcon}
              alt="search"
              className="navbar-search-button"
            />
          </div>
        )} */}
        {/* end of search button stuff */}

        {authenticated && !this.state.showSearchButton && topBarButton}

        {authenticated && !this.state.showSearchButton && userImageElement}

        {!authenticated && !this.state.showSearchButton && (
          <Link className="navbar-signup-button" to="/signup">
            Sign Up
          </Link>
        )}

        {authenticated && !this.state.showSearchButton && (
          <Link
            to="/notifications"
            className="navbar-notification-button-container"
          >
            <img
              src={notificationDisplay}
              alt="notification icon"
              className="navbar-notification-button"
            />
          </Link>
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
          <div
            onClick={this.handleUserClick}
            className="searchUser-cards-container"
          >
            {searchedUserData}
          </div>
        )}

        {this.state.showMobileMenu && (
          <div className="mobileMenuMask">
            <div className="mobileMenu">{mobileMenuContainer}</div>
          </div>
        )}
        {popup}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  data: state.data,
  notifications: state.user.notifications,
});

const mapActionToProps = {
  logoutUser,
  setNav,
  clearNav,
};

Navbar2.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setNav: PropTypes.func.isRequired,
  clearNav: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(Navbar2);
