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
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getAlbum(this.props.match.params.albumID);
  }

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

    //searching functionalities
    let searches = [];

    if (this.state.searchText !== "") {
      let searchText = this.state.searchText;
      if (links && links.length > 0) {
        links.forEach((link) => {
          if (
            link.linkTitle.toLowerCase().substring(0, searchText.length) ===
            searchText.toLowerCase()
          ) {
            searches.push(link);
          }
        });
      }
    }
    //end of searching functionalities

    let linkCount = 0;
    if (links && links.length > 0) {
      links.forEach((link) => linkCount++);
    }

    let linksDisplay =
      links && links.length > 0 ? (
        !loading ? (
          this.state.searchText === "" ? (
            links.map((link) => (
              <LinkComponent
                key={link.linkID}
                link={link}
                options={true}
                albumID={albumID}
              />
            ))
          ) : (
            searches.map((link) => (
              <LinkComponent
                key={link.linkID}
                link={link}
                options={true}
                albumID={albumID}
              />
            ))
          )
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
            placeholder="Search for links"
            value={this.state.searchText}
            onChange={this.handleSearch}
          />
          {searchBarIcon}
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

const mapActionToProps = {
  getAlbum,
};

albumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  getAlbum: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(albumDetails);
