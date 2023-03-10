import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import "../styles/Link.css";
import "../styles/AlbumDetails.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import LinkComponent from "../components/LinkComponent";
import AlbumDetails from "../components/AlbumDetails";
import AlbumDetailsLoading from "../components/AlbumDetailsLoading";
import LinkLoading from "../components/LinkLoading";

import {
  getAlbum,
  clearAlbum,
  resetScrollListener,
  removeScrollListener,
  getAlbumDetailLinksPagination,
  getSearchedAlbumDetailsLinks,
  getSearchedAlbumDetailsLinksPagination,
  clearSearchedAlbumDetailLinks,
} from "../redux/actions/dataActions";

import { setIsAlbumTrue, setIsAlbumFalse } from "../redux/actions/uiActions";

import { clearCheckLikedLinksPagination } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

class albumDetails extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.resetScrollListener();
    this.props.getAlbum(this.props.match.params.albumID);
    // this.userLoadTimeOut = setTimeout(() => {
    //   if (
    //     this.props.user.authenticated &&
    //     this.props.user.credentials.username === this.props.album.username
    //   ) {
    //     this.props.setIsAlbumTrue();
    //   } else {
    //     this.props.setIsAlbumFalse();
    //   }
    // }, 3000);
    window.addEventListener("scroll", this.handleScroll);
  }

  //logic to set is album
  componentDidUpdate(nextProps) {
    if (this.props.album !== nextProps.album) {
      if (nextProps.user || this.props.user) {
        if (nextProps.album) {
          if (
            (nextProps.user.authenticated &&
              nextProps.user.credentials.username ===
                nextProps.album.username) ||
            (this.props.user.authenticated &&
              this.props.user.credentials.username ===
                this.props.album.username)
          ) {
            this.props.setIsAlbumTrue();
          } else {
            this.props.setIsAlbumFalse();
          }
        }
      }
    }
  }

  componentWillUnmount() {
    // if (this.userLoadTimeOut) {
    //   clearTimeout(this.userLoadTimeOut);
    // }
    this.props.resetScrollListener();
    this.props.setIsAlbumFalse();
    this.props.clearCheckLikedLinksPagination();
    //this.props.clearSearchedAlbumDetailLinks();
    //this.props.clearAlbum();
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let difference = document.documentElement.scrollHeight - window.innerHeight;
    var scrollposition = document.documentElement.scrollTop;

    if (this.state.searchText.length === 0) {
      if (
        difference - scrollposition <= 250 &&
        !this.props.data.loadingPagination &&
        this.props.data.scrollListener
      ) {
        if (this.props.album.links && this.props.album.links.length > 0) {
          let albumDetailLinks = {
            limit:
              this.props.data.album.links[
                this.props.data.album.links.length - 1
              ],
          };

          //if there is data in the last liked album detail link under user state,
          //use it to get the next 16 liked links data for the particular album
          if (
            this.props.user.lastLikedAlbumDetailLink &&
            this.props.user.lastLikedAlbumDetailLink.length > 0
          ) {
            albumDetailLinks.limitLikedLinks =
              this.props.user.lastLikedAlbumDetailLink[
                this.props.user.lastLikedAlbumDetailLink.length - 1
              ];
          }
          //this.props.getCheckLikedUserAlbumsPagination(albumDetailLinks);
          this.props.getAlbumDetailLinksPagination(
            this.props.match.params.albumID,
            albumDetailLinks
          );
        }
      }
    } else {
      if (
        difference - scrollposition <= 250 &&
        !this.props.data.loadingPagination &&
        this.props.data.scrollListener
      ) {
        if (this.props.data.searchedAlbums.length > 0) {
          const searchedAlbumDetailLink = {
            limit:
              this.props.data.searchedAlbums[
                this.props.data.searchedAlbums.length - 1
              ],
            search: this.state.searchText,
            albumID: this.props.match.params.albumID,
          };

          if (
            this.props.user.lastLikedAlbumDetailLink &&
            this.props.user.lastLikedAlbumDetailLink.length > 0
          ) {
            searchedAlbumDetailLink.limitLikedLinks =
              this.props.user.lastLikedAlbumDetailLink[
                this.props.user.lastLikedAlbumDetailLink.length - 1
              ];
          }

          this.props.resetScrollListener();
          this.props.getSearchedAlbumDetailsLinksPagination(
            searchedAlbumDetailLink
          );
        }
      }
    }
  };

  handleSearch = (event) => {
    this.setState(
      {
        searchText: event.target.value,
      },
      () => {
        if (this.state.searchText.length === 0) {
          this.props.clearSearchedAlbumDetailLinks();
        } else {
          const searchQuery = {
            limit: null,
            search: this.state.searchText,
            albumID: this.props.match.params.albumID,
          };

          if (
            this.props.user.lastLikedAlbumDetailLink &&
            this.props.user.lastLikedAlbumDetailLink.length > 0
          ) {
            searchQuery.limitLikedLinks =
              this.props.user.lastLikedAlbumDetailLink[
                this.props.user.lastLikedAlbumDetailLink.length - 1
              ];
          }

          this.props.getSearchedAlbumDetailsLinks(searchQuery);
        }
        this.props.resetScrollListener();
      }
    );
  };

  handleSearchReset = () => {
    this.setState(
      {
        searchText: "",
      },
      () => {
        this.props.resetScrollListener();
        this.props.clearSearchedAlbumDetailLinks();
      }
    );
  };

  render() {
    // setTimeout(() => {
    //   if (!this.props.album.albumID) {
    //     this.props.history.push("/books");
    //   }
    // }, 4000);

    const {
      user: { authenticated, credentials },
      album: {
        albumTitle,
        albumImg,
        likeCount,
        viewCount,
        linkCount,
        albumID,
        username,
        profileImg,
        security,
        links,
        searchedLinks = [],
      },
      data: { loadingPagination },
      UI: { loading },
    } = this.props;

    //searching functionalities
    // let searches = [];

    // if (this.state.searchText !== "") {
    //   let searchText = this.state.searchText;
    //   if (links && links.length > 0) {
    //     links.forEach((link) => {
    //       if (
    //         link.linkTitle.toLowerCase().substring(0, searchText.length) ===
    //         searchText.toLowerCase()
    //       ) {
    //         searches.push(link);
    //       }
    //     });
    //   }
    // }
    //end of searching functionalities

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
            searchedLinks.map((link) => (
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
          <Fragment>
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
            <LinkLoading />
          </Fragment>
        )
      ) : !loading ? null : (
        <Fragment>
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
          <LinkLoading />
        </Fragment>
      );

    let loadingPaginationText = loadingPagination ? <LinkLoading /> : null;

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
          <Link to="/add-page" className="albumDetails-primary-top-button">
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

    let albumDetailsDisplay = !loading ? (
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
    ) : (
      <AlbumDetailsLoading />
    );

    return (
      <div className="albumDetails-main-overall-container">
        <div className="albumDetails-card-container">
          <div className="albumDetails-main-container">
            {userDisplay}
            {albumDetailsDisplay}
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
          {addLinkButton}
          <div className="link-main-container">
            {linksDisplay}
            {loadingPaginationText}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  album: state.data.album,
  user: state.user,
  UI: state.UI,
  data: state.data,
});

const mapActionToProps = {
  getAlbum,
  clearAlbum,
  setIsAlbumTrue,
  setIsAlbumFalse,
  getAlbumDetailLinksPagination,
  resetScrollListener,
  removeScrollListener,
  clearCheckLikedLinksPagination,
  getSearchedAlbumDetailsLinks,
  clearSearchedAlbumDetailLinks,
  getSearchedAlbumDetailsLinksPagination,
};

albumDetails.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  getAlbum: PropTypes.func.isRequired,
  clearAlbum: PropTypes.func.isRequired,
  setIsAlbumTrue: PropTypes.func.isRequired,
  setIsAlbumFalse: PropTypes.func.isRequired,
  getAlbumDetailLinksPagination: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
  removeScrollListener: PropTypes.func.isRequired,
  clearCheckLikedLinksPagination: PropTypes.func.isRequired,
  getSearchedAlbumDetailsLinks: PropTypes.func.isRequired,
  clearSearchedAlbumDetailLinks: PropTypes.func.isRequired,
  getSearchedAlbumDetailsLinksPagination: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(albumDetails);
