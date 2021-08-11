import React, { Component } from "react";
import "../styles/SearchedUserCard.css";

export class LoadingSearchedUserCard extends Component {
  render() {
    const { loadingUser, notFound } = this.props;
    return (
      <div className="searchUser-container">
        {loadingUser && !notFound && (
          <h3 className="searchUser-username">Searching...</h3>
        )}
        {notFound && loadingUser && (
          <h3 className="searchUser-username">Searching...</h3>
        )}
        {notFound && !loadingUser && (
          <h3 className="searchUser-username">User not found</h3>
        )}
      </div>
    );
  }
}

export default LoadingSearchedUserCard;
