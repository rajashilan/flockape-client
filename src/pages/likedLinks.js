import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

export class likedLinks extends Component {
  state = {
    searchText: "",
  };

  handleSearch = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSearchReset = () => {
    this.setState({
      searchText: "",
    });
  };
  render() {
    let searchBarIcon = this.state.searchText ? (
      <img
        onClick={this.handleSearchReset}
        className="search-icon"
        src={closeIcon}
      />
    ) : (
      <img className="search-icon" src={searchIcon} />
    );
    return (
      <div>
        <HomeNavigation />
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search for your albums"
            value={this.state.searchText}
            onChange={this.handleSearch}
          />
          {searchBarIcon}
        </div>
        <h1>likedLinks page</h1>
      </div>
    );
  }
}

export default likedLinks;
