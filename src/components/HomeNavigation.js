import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//css
import "../styles/HomeNavigation.css";

export class HomeNavigation extends Component {
  render() {
    return (
      <div className="home-navigation-container">
        <NavLink
          activeClassName="home-navigation-items-active"
          className="home-navigation-items"
          to="/albums"
        >
          Albums
        </NavLink>
        <NavLink
          activeClassName="home-navigation-items-active"
          className="home-navigation-items"
          to="/likedAlbums"
        >
          Liked Albums
        </NavLink>
        <NavLink
          activeClassName="home-navigation-items-active"
          className="home-navigation-items"
          to="/likedLinks"
        >
          Liked Links
        </NavLink>
      </div>
    );
  }
}

export default HomeNavigation;
