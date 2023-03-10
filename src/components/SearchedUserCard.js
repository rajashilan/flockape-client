import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/SearchedUserCard.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class SearchedUserCard extends Component {
  render() {
    const {
      user: { username, avatar, fullName },
    } = this.props;
    return (
      <Link to={`/@${username}`}>
        <div className="searchUser-container">
          <img src={avatar} alt="avatar" className="searchUser-img" />
          <div className="searchUser-details-container">
            <h3 className="searchUser-username">{username}</h3>
            <h2 className="searchUser-fullName">{fullName}</h2>
          </div>
        </div>
      </Link>
    );
  }
}

const mapStateToProps = (state) => ({});

SearchedUserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SearchedUserCard);
