import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";
import SearchBar from "../components/SearchBar";

export class likedAlbums extends Component {
  render() {
    return (
      <div>
        <HomeNavigation />
        <SearchBar placeholder="Search for your liked albums..." />
        <h1>likedAlbums page</h1>
      </div>
    );
  }
}

export default likedAlbums;
