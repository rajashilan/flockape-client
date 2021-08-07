import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";
import SearchBar from "../components/SearchBar";

export class likedLinks extends Component {
  render() {
    return (
      <div>
        <HomeNavigation />
        <SearchBar placeholder="Search for your liked links..." />
        <h1>likedLinks page</h1>
      </div>
    );
  }
}

export default likedLinks;
