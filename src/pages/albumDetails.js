import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/Link.css";
import "../styles/AlbumDetails.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import LinkComponent from "../components/LinkComponent";
import AlbumDetails from "../components/AlbumDetails";

import { getAlbum, clearAlbum } from "../redux/actions/dataActions";

import { setIsAlbumTrue, setIsAlbumFalse } from "../redux/actions/uiActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class albumDetails extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getAlbum(this.props.match.params.albumID);
    this.userLoadTimeOut = setTimeout(() => {
      if (
        this.props.user.authenticated &&
        this.props.user.credentials.username === this.props.album.username
      ) {
        this.props.setIsAlbumTrue();
      } else {
        this.props.setIsAlbumFalse();
      }
    }, 3000);
  }

  componentWillUnmount() {
    if (this.userLoadTimeOut) {
      clearTimeout(this.userLoadTimeOut);
    }
    this.props.setIsAlbumFalse();
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
        this.props.history.push("/books");
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
                propsHistory={this.props.history}
              />
            ))
          ) : (
            searches.map((link) => (
              <LinkComponent
                key={link.linkID}
                link={link}
                options={true}
                albumID={albumID}
                propsHistory={this.props.history}
              />
            ))
          )
        ) : (
          <p>Loading...</p>
        )
      ) : null;

    let userDisplay =
      !loading && (!authenticated || credentials.username !== username) ? (
        <Link
          to={`/@${username}`}
          className="albumDetails-user-display-container"
        >
          <img src={profileImg} className="albumDetails-user-display-img" />
          <h3 className="albumDetails-user-display-name">@{username}</h3>
        </Link>
      ) : null;

    let addLinkButton =
      !loading && authenticated && credentials.username === username ? (
        <div className="albumDetails-button-container">
          <Link to="/add-page" className="albumDetails-primary-button">
            Add a Page
          </Link>
        </div>
      ) : null;

    let toHistory;
    this.props.location.state && this.props.location.state.history
      ? (toHistory = this.props.location.state.history)
      : (toHistory = "/books");

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
      <div className="albumDetails-main-overall-container">
        <div className="albumDetails-card-container">
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
              placeholder="Search for pages"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
            {searchBarIcon}
          </div>
          <div className="link-main-container">{linksDisplay}</div>
          {addLinkButton}
        </div>
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
  clearAlbum,
  setIsAlbumTrue,
  setIsAlbumFalse,
};

albumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  getAlbum: PropTypes.func.isRequired,
  clearAlbum: PropTypes.func.isRequired,
  setIsAlbumTrue: PropTypes.func.isRequired,
  setIsAlbumFalse: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(albumDetails);
