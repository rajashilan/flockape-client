import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";

import "../styles/HomeNavigation.css";
import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import Album from "../components/Album";

import {
  getLikedAlbums,
  getLikedAlbumsPagination,
  clearLikedAlbums,
  clearAlbum,
  resetScrollListener,
  getSearchedLikedAlbums,
  clearSearchedLikedAlbums,
  getSearchedLikedAlbumsPagination,
} from "../redux/actions/dataActions";

import {
  getCheckLikedAlbumsPagination,
  clearCheckLikedAlbumsPagination,
} from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class likedAlbums extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    const albumDetail = {
      limit: null,
    };

    this.props.getLikedAlbums(albumDetail);
    this.props.clearAlbum();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetScrollListener();
    this.props.clearLikedAlbums();
    this.props.clearSearchedLikedAlbums();
    // this.props.clearCheckLikedAlbumsPagination();
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
        if (this.props.data.likedAlbums.length > 0) {
          const albumDetail = {
            limit:
              this.props.data.likedAlbums[
                this.props.data.likedAlbums.length - 1
              ],
          };

          console.log("albumDetail:  ", albumDetail);

          this.props.getCheckLikedAlbumsPagination(albumDetail);
          this.props.getLikedAlbumsPagination(albumDetail);
        }
      }
    } else {
      if (
        difference - scrollposition <= 250 &&
        !this.props.data.loadingPagination &&
        this.props.data.scrollListener
      ) {
        if (this.props.data.searchedLikedAlbums.length > 0) {
          const searchedAlbumDetail = {
            limit:
              this.props.data.searchedLikedAlbums[
                this.props.data.searchedLikedAlbums.length - 1
              ],
            search: this.state.searchText,
          };
          this.props.resetScrollListener();
          this.props.getCheckLikedAlbumsPagination(searchedAlbumDetail);
          this.props.getSearchedLikedAlbumsPagination(searchedAlbumDetail);
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
          this.props.clearSearchedLikedAlbums();
        } else {
          const searchQuery = {
            limit: null,
            search: this.state.searchText,
          };
          this.props.getSearchedLikedAlbums(searchQuery);
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
        this.props.clearSearchedLikedAlbums();
      }
    );
  };

  render() {
    const {
      data: { likedAlbums, loading, loadingPagination, searchedLikedAlbums },
    } = this.props;

    //searching functionalities
    // let searches = [];

    // if (this.state.searchText !== "") {
    //   let searchText = this.state.searchText;
    //   if (likedAlbums && likedAlbums.length > 0) {
    //     likedAlbums.forEach((album) => {
    //       if (
    //         album.albumTitle.toLowerCase().substring(0, searchText.length) ===
    //           searchText.toLowerCase() ||
    //         album.username.toLowerCase().substring(0, searchText.length) ===
    //           searchText.toLowerCase()
    //       ) {
    //         searches.push(album);
    //       }
    //     });
    //   }
    // }
    //end of searching functionalities

    let albumData =
      !loading && likedAlbums ? (
        this.state.searchText === "" ? (
          likedAlbums.map((album) => (
            <Album key={album.albumID} album={album} options={true} />
          ))
        ) : (
          searchedLikedAlbums.map((album) => (
            <Album key={album.albumID} album={album} options={true} />
          ))
        )
      ) : (
        <p>Loading...</p>
      );

    let loadingPaginationText = loadingPagination ? (
      <p>Loading pagination</p>
    ) : null;

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
      <div className="album-main-container">
        <div className="album-card-container">
          <HomeNavigation />
          <div className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search the Books you follow"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
            {searchBarIcon}
          </div>
          <div className="album-likes-container">{albumData}</div>
          {loadingPaginationText}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
  getLikedAlbums,
  getLikedAlbumsPagination,
  getCheckLikedAlbumsPagination,
  clearCheckLikedAlbumsPagination,
  clearLikedAlbums,
  clearAlbum,
  resetScrollListener,
  getSearchedLikedAlbums,
  clearSearchedLikedAlbums,
  getSearchedLikedAlbumsPagination,
};

likedAlbums.propTypes = {
  data: PropTypes.object.isRequired,
  getLikedAlbums: PropTypes.func.isRequired,
  getLikedAlbumsPagination: PropTypes.func.isRequired,
  clearLikedAlbums: PropTypes.func.isRequired,
  clearAlbum: PropTypes.func.isRequired,
  getCheckLikedAlbumsPagination: PropTypes.func.isRequired,
  clearCheckLikedAlbumsPagination: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
  getSearchedLikedAlbums: PropTypes.func.isRequired,
  clearSearchedLikedAlbums: PropTypes.func.isRequired,
  getSearchedLikedAlbumsPagination: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(likedAlbums);
