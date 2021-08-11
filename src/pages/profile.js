import React, { Component } from "react";

import BackButton from "../components/BackButton";
import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";

export class profile extends Component {
  render() {
    return (
      <div>
        <BackButton to="/albums" />
        <Profile />
        <SearchBar placeholder="Search for albums" />
      </div>
    );
  }
}

export default profile;
