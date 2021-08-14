import React, { Component } from "react";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";
import "../styles/SearchBar.css";

export class searchBar extends Component {
  render() {
    let searchBarIcon = this.props.value ? (
      <img
        onClick={this.handleSearchReset}
        className="search-icon"
        src={closeIcon}
      />
    ) : (
      <img className="search-icon" src={searchIcon} />
    );

    return (
      <div className="search-container">
        <input className="search-bar" type="text" placeholder="" />
        {searchBarIcon}
      </div>
    );
  }
}

export default searchBar;
