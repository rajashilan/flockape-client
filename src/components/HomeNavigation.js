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
          to="/books"
        >
          Books
        </NavLink>
        <NavLink
          activeClassName="home-navigation-items-active"
          className="home-navigation-items"
          to="/followed-books"
        >
          Follows
        </NavLink>
        <NavLink
          activeClassName="home-navigation-items-active"
          className="home-navigation-items"
          to="/liked-pages"
        >
          Likes
        </NavLink>
      </div>
    );
  }
}

export default HomeNavigation;
