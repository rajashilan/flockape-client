import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/Link.css";
import "../styles/AlbumDetails.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import LinkComponent from "../components/LinkComponent";
import AlbumDetails from "../components/AlbumDetails";

import { getAlbum } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class albumDetails extends Component {
  componentDidMount() {
    //if link is coming back from addlinks page, no need to reload data
    if (
      this.props.location.state &&
      this.props.match.params.albumID === this.props.location.state.albumID
    ) {
      //just get the album that is already set in the state
    } else {
      this.props.getAlbum(this.props.match.params.albumID);
    }
  }

  render() {
    setTimeout(() => {
      if (!this.props.album.albumID) {
        this.props.history.push("/albums");
      }
    }, 4000);

    const {
      user: { authenticated, credentials },
      album: {
        albumTitle,
        albumImg,
        likeCount,
        viewCount,
        albumID,
        username,
        profileImg,
        security,
        links,
      },
      UI: { loading },
    } = this.props;

    let linkCount = 0;
    if (links && links.length > 0) {
      links.forEach((link) => linkCount++);
    }

    let linksDisplay =
      links && links.length > 0 ? (
        !loading ? (
          links.map((link) => (
            <LinkComponent
              key={link.linkID}
              link={link}
              options={true}
              albumID={albumID}
            />
          ))
        ) : (
          <p>Loading...</p>
        )
      ) : null;

    let userDisplay =
      !loading && (!authenticated || credentials.username !== username) ? (
        <div className="albumDetails-user-display-container">
          <img src={profileImg} className="albumDetails-user-display-img" />
          <h3 className="albumDetails-user-display-name">@{username}</h3>
        </div>
      ) : null;

    let addLinkButton =
      !loading && authenticated && credentials.username === username ? (
        <div className="albumDetails-button-container">
          <Link to="/addLink" className="albumDetails-primary-button">
            Add a Link
          </Link>
        </div>
      ) : null;

    let toHistory;
    this.props.location.state && this.props.location.state.history
      ? (toHistory = this.props.location.state.history)
      : (toHistory = "/albums");
    console.log("tohistory", toHistory);

    return (
      <div>
        <div className="albumDetails-main-container">
          {userDisplay}
          <AlbumDetails
            key={albumID}
            albumTitle={albumTitle}
            albumImg={albumImg}
            likeCount={likeCount}
            viewCount={viewCount}
            albumID={albumID}
            security={security}
            linkCount={linkCount}
            username={username}
            options={true}
            history={toHistory}
          />
        </div>
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search for your links..."
          />
          <img className="search-icon" src={searchIcon} />
        </div>
        <div className="link-main-container">{linksDisplay}</div>
        {addLinkButton}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.data.album,
  user: state.user,
  UI: state.UI,
});

albumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  getAlbum: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getAlbum })(albumDetails);
