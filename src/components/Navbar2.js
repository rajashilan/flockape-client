import React, { Component } from "react";
import { Link } from "react-router-dom";
//css
import "../styles/Navbar.css";
import "../styles/MobileMenu.css";
import "../styles/PrimaryButton.css";
//images
import logo from "./images/logo@2x.png";
import searchIcon from "./images/searchIcon@2x.png";
//components

export class Navbar2 extends Component {
  state = {
    showMobileMenu: false,
    showSearchButton: false,
  };

  showMenu = () => {
    this.setState({
      showMobileMenu: !this.state.showMobileMenu,
    });
  };

  showSearchBar = () => {
    this.setState({
      showSearchButton: !this.state.showSearchButton,
    });
  };

  render() {
    //mobile menu subcomponent
    const MobileMenu = (props) => {
      if (props.isActive) {
        return (
          <div className="mobileMenuMask">
            <div className="mobileMenu">
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
                      <a href="#" className="menuItems">
                        Leave Feedback
                      </a>
                    </li>
                    <li>
                      <a href="#" className="menuItems">
                        Report a Bug
                      </a>
                    </li>
                    <li>
                      <a href="#" className="menuItems ">
                        Share flockape
                      </a>
                    </li>
                    <li>
                      <a href="#" className="menuItems-Priority">
                        Support Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

    //dynamic classnames for hamburger and close button in nav
    //hide and show according to menu state
    let hamburgerContainer;
    let closeContainer;
    let searchButtonContainer;
    let searchBar;
    let button;
    let cancelButtonContainer;
    let navBarLogoContainer;

    if (this.state.showMobileMenu) {
      hamburgerContainer = "navbar-hamburger-container navbar-hidden";
      closeContainer = "navbar-close-container";
    } else {
      hamburgerContainer = "navbar-hamburger-container";
      closeContainer = "navbar-close-container navbar-hidden";
    }

    if (this.state.showSearchButton) {
      searchButtonContainer = "navbar-search-button-container navbar-hidden";
      searchBar = "navbar-search-bar";
      button = "navbar-button navbar-hidden";
      cancelButtonContainer = "navbar-cancel-button-container";
      navBarLogoContainer = "navbar-controlled-link navbar-hidden";
    } else {
      searchButtonContainer = "navbar-search-button-container";
      searchBar = "navbar-search-bar navbar-hidden";
      button = "navbar-button";
      cancelButtonContainer = "navbar-cancel-button-container navbar-hidden";
      navBarLogoContainer = "navbar-controlled-link";
    }

    return (
      <div className="navbar">
        <Link to="/albums" className={navBarLogoContainer}>
          <img className="navbar-logo" src={logo} alt="flockape" />
        </Link>

        <input
          type="text"
          placeholder="Search for a user"
          className={searchBar}
        />

        <div onClick={this.showSearchBar} className={cancelButtonContainer}>
          <p className="navbar-cancel-button">Cancel</p>
        </div>

        <div onClick={this.showSearchBar} className={searchButtonContainer}>
          <img src={searchIcon} alt="search" className="navbar-search-button" />
        </div>

        <Link className={button} to="/signup">
          Sign Up
        </Link>

        <div className={hamburgerContainer} onClick={this.showMenu}>
          <div className="navbar-hamburger"></div>
          <div className="navbar-hamburger"></div>
          <div className="navbar-hamburger"></div>
        </div>

        <div className={closeContainer} onClick={this.showMenu}>
          <div className="navbar-close-top">
            <div className="navbar-close-bottom"></div>
          </div>
        </div>

        {/* pass the state as a props and render mobile menu based on that */}
        <MobileMenu isActive={this.state.showMobileMenu} />
      </div>
    );
  }
}

export default Navbar2;
