import React, { Component } from "react";
import searchIcon from "../components/images/searchIcon@2x.png";
import "../styles/SearchBar.css";

export class searchBar extends Component {
  render() {
    return (
      <div className="search-container">
        <img className="search-icon" src={searchIcon} alt="search icon" />
        <input
          className="search-bar"
          type="text"
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

export default searchBar;
