import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import HomeNavigation from "../components/HomeNavigation";
import Album from "../components/Album";
import AlbumLoading from "../components/AlbumLoading";
import VerificationLabel from "../components/VerificationLabel";
//css
import "../styles/HomeNavigation.css";
import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import {
  getAlbums,
  getAlbumsPagination,
  getSearchedAlbumsPagination,
  getSearchedAlbums,
  clearSearchedAlbums,
  clearAlbums,
  resetScrollListener,
  removeScrollListener,
  clearAlbum,
} from "../redux/actions/dataActions";

import { getCheckLikedUserAlbumsPagination } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class albums extends Component {
  state = {
    searchText: "",
    showNotVerifiedText: false,
  };

  componentDidMount() {
    const albumDetail = {
      limit: null,
    };

    this.props.getAlbums(albumDetail);
    this.props.clearAlbum();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetScrollListener();
    this.props.clearAlbums();
    this.props.clearSearchedAlbums();
    window.removeEventListener("scroll", this.handleScroll);
    if (this.userLoadTimeOut) {
      clearTimeout(this.userLoadTimeOut);
    }
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
        if (this.props.data.albums.length > 0) {
          const albumDetail = {
            limit: this.props.data.albums[this.props.data.albums.length - 1],
          };
          this.props.getCheckLikedUserAlbumsPagination(albumDetail);
          this.props.getAlbumsPagination(albumDetail);
        }
      }
    } else {
      if (
        difference - scrollposition <= 250 &&
        !this.props.data.loadingPagination &&
        this.props.data.scrollListener
      ) {
        if (this.props.data.searchedAlbums.length > 0) {
          const searchedAlbumDetail = {
            limit:
              this.props.data.searchedAlbums[
                this.props.data.searchedAlbums.length - 1
              ],
            search: this.state.searchText,
          };
          this.props.resetScrollListener();
          this.props.getCheckLikedUserAlbumsPagination(searchedAlbumDetail);
          this.props.getSearchedAlbumsPagination(searchedAlbumDetail);
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
          this.props.clearSearchedAlbums();
        } else {
          const searchQuery = {
            limit: null,
            search: this.state.searchText,
          };
          this.props.getSearchedAlbums(searchQuery);
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
        this.props.clearSearchedAlbums();
      }
    );
  };

  handleButtonNotVerified = () => {
    this.setState({
      showNotVerifiedText: true,
    });
  };

  render() {
    const {
      albums,
      searchedAlbums,
      loading,
      loadingPagination,
      scrollListener,
    } = this.props.data;

    const { authenticated, credentials } = this.props.user;

    //searching functionalities
    // let searches = [];

    // if (this.state.searchText !== "") {
    //   let searchText = this.state.searchText;
    //   if (albums && albums.length > 0) {
    //     albums.forEach((album) => {
    //       if (
    //         album.albumTitle.toLowerCase().substring(0, searchText.length) ===
    //         searchText.toLowerCase()
    //       ) {
    //         searches.push(album);
    //       }
    //     });
    //   }
    // }
    //end of searching functionalities

    let albumData = !loading ? (
      this.state.searchText === "" ? (
        albums.map((album) => (
          <Album key={album.albumID} album={album} options={true} />
        ))
      ) : (
        searchedAlbums.map((album) => (
          <Album key={album.albumID} album={album} options={true} />
        ))
      )
    ) : (
      <p>Loading...</p>
    );

    let addAnAlbumButton = authenticated ? (
      credentials.isVerified ? (
        <Link to="/create-book" className="album-primary-top-button">
          Create a Book
        </Link>
      ) : (
        <button
          type="button"
          onClick={this.handleButtonNotVerified}
          className="album-secondary-top-button"
        >
          Create a Book
        </button>
      )
    ) : null;

    let verificationErrorLabel = this.state.showNotVerifiedText ? (
      <p className="album-label-top-error">
        Please verify your email to create a Book
      </p>
    ) : null;

    let loadingPaginationText = loadingPagination ? <AlbumLoading /> : null;

    let searchBarIcon = this.state.searchText ? (
      <img
        onClick={this.handleSearchReset}
        className="search-icon"
        src={closeIcon}
      />
    ) : (
      <img className="search-icon" src={searchIcon} />
    );

    let albumsContainer = !loading ? (
      <div className="album-container">{albumData}</div>
    ) : (
      <Fragment>
        <AlbumLoading />
        <AlbumLoading />
        <AlbumLoading />
        <AlbumLoading />
        <AlbumLoading />
        <AlbumLoading />
        <AlbumLoading />
      </Fragment>
    );

    let verification = !this.props.user.loading ? (
      this.props.user &&
      this.props.user.credentials &&
      !this.props.user.credentials.isVerified ? (
        <VerificationLabel />
      ) : null
    ) : null;

    return (
      <div className="album-main-container">
        <div className="album-card-container">
          {verification}
          <HomeNavigation />
          <div className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search your Books"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
            {searchBarIcon}
          </div>
          <div className="album-button-container">
            {addAnAlbumButton}
            {verificationErrorLabel}
          </div>
          {albumsContainer}
          {loadingPaginationText}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapActionToProps = {
  getAlbums,
  getAlbumsPagination,
  getSearchedAlbumsPagination,
  getCheckLikedUserAlbumsPagination,
  getSearchedAlbums,
  clearSearchedAlbums,
  clearAlbums,
  clearAlbum,
  resetScrollListener,
  removeScrollListener,
};

albums.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
  getAlbumsPagination: PropTypes.func.isRequired,
  getSearchedAlbumsPagination: PropTypes.func.isRequired,
  getSearchedAlbums: PropTypes.func.isRequired,
  clearAlbums: PropTypes.func.isRequired,
  clearAlbum: PropTypes.func.isRequired,
  clearSearchedAlbums: PropTypes.func.isRequired,
  getCheckLikedUserAlbumsPagination: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
  removeScrollListener: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(albums);
