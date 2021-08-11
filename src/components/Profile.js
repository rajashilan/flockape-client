import React, { Component } from "react";

import "../styles/Profile.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const {
      user: {
        credentials: { username, profileImg, fullName, bio, website, location },
        loading,
      },
    } = this.props;

    let profileContainer = !loading ? (
      <div className="profile-primary-container">
        <div className="profile-secondary-container">
          <img src={profileImg} className="profile-img" />
          <div className="profile-main-details-container">
            <h3 className="profile-username">@{username}</h3>
            <div className="profile-albums-details-container">
              <p className="profile-album-details">500 albums</p>
              <p className="profile-album-details">421 views</p>
              <p className="profile-album-details">900 likes</p>
            </div>
          </div>
        </div>
        <div className="profile-tertiary-container">
          <h2 className="profile-name">{fullName}</h2>
          {bio && <h4 className="profile-other-details">{bio}</h4>}
          {location && <h4 className="profile-other-details">{location}</h4>}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-website-link"
            >
              {website}
            </a>
          )}
        </div>
      </div>
    ) : (
      <div className="profile-primary-container">
        <div className="profile-secondary-container">
          <div className="profile-img-loading"></div>
          <div className="profile-main-details-container">
            <h3 className="profile-username-loading"></h3>
            <div className="profile-albums-details-container">
              <p className="profile-album-details-loading"></p>
            </div>
          </div>
        </div>
        <div className="profile-tertiary-container">
          <h2 className="profile-name-loading"></h2>
          <h4 className="profile-other-details-loading"></h4>
          <h4 className="profile-other-details-loading"></h4>
          <a href="#" className="profile-website-link-loading"></a>
        </div>
      </div>
    );
    return profileContainer;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Profile);
