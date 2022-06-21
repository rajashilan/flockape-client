import React, { Component } from "react";

import "../styles/ProfileCardMain.css";

import ProfileCardMainLoading from "./ProfileCardMainLoading";

import PropTypes from "prop-types";
import { connect } from "react-redux";

//proper albums count, likes count, and views count

class ProfileCardMain extends Component {
  render() {
    const {
      user: {
        authenticated,
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

    // let albumCount = {
    //   albums: albums.length,
    //   views: 0,
    //   likes: 0,
    // };

    // if (albums.length > 0) {
    //   albums.forEach((album) => {
    //     albumCount.views += album.viewCount;
    //     albumCount.likes += album.likeCount;
    //   });
    // }

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

    let profileCardDisplay = authenticated ? (
      !loading ? (
        <div>
          <div className="profileCardMain-top-container">
            <img src={profileImg} alt="" className="profileCardMain-img" />
            <h3 className="profileCardMain-username">@{username}</h3>
            <div className="profileCardMain-details-container">
              <h5 className="profileCardMain-details">
                {abbrNum(albums, 1)} Books
              </h5>
              <h5 className="profileCardMain-details">
                {abbrNum(follows, 1)} follows
              </h5>
              <h5 className="profileCardMain-details-last">
                {abbrNum(views, 1)} views
              </h5>
            </div>
          </div>
          <div className="profileCardMain-bottom-container">
            {fullName && <h2 className="profileCardMain-name">{fullName}</h2>}
            {bio && <h4 className="profileCardMain-other-details">{bio}</h4>}
            {location && (
              <h4 className="profileCardMain-other-details">{location}</h4>
            )}
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="profileCardMain-website-link"
              >
                {website}
              </a>
            )}
            <h4 className="profileCardMain-other-details">
              url: {domain}@{username}
            </h4>
          </div>
        </div>
      ) : (
        <ProfileCardMainLoading />
      )
    ) : !loading ? null : (
      <ProfileCardMainLoading />
    );

    let profileCardMainContainerClassName = authenticated
      ? "profileCardMain-main-container"
      : "profileCardMain-main-container-auto-width";

    return (
      <div className={profileCardMainContainerClassName}>
        {profileCardDisplay}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

ProfileCardMain.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ProfileCardMain);
