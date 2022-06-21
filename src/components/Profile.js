import React, { Component } from "react";

import "../styles/Profile.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { PopUp } from "./PopUp";

//proper albums count, likes count, and views count

class Profile extends Component {
  state = {
    showPopUp: false,
  };

  copyProfile = async () => {
    await navigator.clipboard.writeText(
      `https://sharesite-test.web.app/@${this.props.user.credentials.username}`
    );

    this.setState(
      {
        showPopUp: true,
      },
      () => {
        if (this.state.showPopUp) this.setPopUpTimer();
      }
    );
  };

  setPopUpTimer = () => {
    setTimeout(() => {
      this.setState({
        showPopUp: false,
      });
    }, 2000);
  };

  render() {
    const {
      user: {
        credentials: {
          username,
          profileImg,
          fullName,
          bio,
          website,
          location,
          albums,
          views,
          follows,
        },
        loading,
      },
    } = this.props;

    const popup = this.state.showPopUp ? (
      <PopUp text="Profile URL copied successfully" />
    ) : null;

    const domain = "https://sharesite-test.web.app/";

    function abbrNum(number, decPlaces) {
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = Math.pow(10, decPlaces);

      // Enumerate number abbreviations
      var abbrev = ["k", "M", "B", "T"];

      // Go through the array backwards, so we do the largest first
      for (var i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        var size = Math.pow(10, (i + 1) * 3);

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
          number = Math.round((number * decPlaces) / size) / decPlaces;

          // Handle special case where we round up to the next abbreviation
          if (number == 1000 && i < abbrev.length - 1) {
            number = 1;
            i++;
          }

          // Add the letter for the abbreviation
          number += abbrev[i];

          // We are done... stop
          break;
        }
      }

      return number;
    }

    let profileContainer = !loading ? (
      <div className="profile-primary-container">
        <div className="profile-secondary-container">
          <img src={profileImg} className="profile-img" />
          <div className="profile-main-details-container">
            <h3 className="profile-username">@{username}</h3>
            <div className="profile-albums-details-container">
              <p className="profile-album-details">
                {abbrNum(albums, 1)} Books
              </p>
              <p className="profile-album-details">
                {abbrNum(follows, 1)} follows
              </p>
              <p className="profile-album-details">{abbrNum(views, 1)} views</p>
            </div>
          </div>
        </div>
        <div className="profile-tertiary-container">
          {fullName && <h2 className="profile-name">{fullName}</h2>}
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
          <button
            type="button"
            onClick={this.copyProfile}
            className="profile-share-button"
          >
            Share Profile
          </button>
          {popup}
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
