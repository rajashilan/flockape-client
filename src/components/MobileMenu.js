import React, { Component } from "react";
import { Link } from "react-router-dom";
//css
import "../styles/MobileMenu.css";
import "../styles/PrimaryButton.css";
//components

export class MobileMenu extends Component {
  render() {
    return (
      <div className="mobileMenuMask">
        <div className="mobileMenu">
          <div className="displayItems">
            <Link className="primary-button" to="/login">
              Log In
            </Link>
            <Link className="primary-button" to="/signup">
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
}

export default MobileMenu;
