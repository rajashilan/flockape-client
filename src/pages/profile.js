import React, { Component, Fragment } from "react";

import Profile from "../components/Profile";
import Album from "../components/Album";
import AlbumLoading from "../components/AlbumLoading";

import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import {
  getAlbums,
  getAlbumsPagination,
  clearAlbums,
  resetScrollListener,
  clearAlbum,
  getSearchedAlbumsPagination,
  getSearchedAlbums,
  clearSearchedAlbums,
} from "../redux/actions/dataActions";

import { getCheckLikedUserAlbumsPagination } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class profile extends Component {
  state = {
    searchText: "",
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

  render() {
    const {
      user,
      data: { albums, loading, loadingPagination, searchedAlbums },
    } = this.props;

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

    let searchBarIcon = this.state.searchText ? (
      <img
        onClick={this.handleSearchReset}
        className="search-icon"
        src={closeIcon}
      />
    ) : (
      <img className="search-icon" src={searchIcon} />
    );

    let loadingPaginationText = loadingPagination ? <AlbumLoading /> : null;

    let albumCount = {
      albums: albums.length,
      views: 0,
      likes: 0,
    };

    if (albums.length > 0) {
      albums.forEach((album) => {
        albumCount.views += album.viewCount;
        albumCount.likes += album.likeCount;
      });
    }

    let profileAlbumsContainer = !loading ? (
      <div className="album-likes-container">{albumData}</div>
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

    return (
      <div className="profile-main-container">
        <div className="profile-card-container">
          <Profile
            albums={albumCount.albums}
            views={albumCount.views}
            likes={albumCount.likes}
            user={user}
          />
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
          {profileAlbumsContainer}
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
  clearAlbums,
  clearAlbum,
  getCheckLikedUserAlbumsPagination,
  resetScrollListener,
  getSearchedAlbumsPagination,
  getSearchedAlbums,
  clearSearchedAlbums,
};

profile.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
  clearAlbums: PropTypes.func.isRequired,
  clearAlbum: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
  getAlbumsPagination: PropTypes.func.isRequired,
  getCheckLikedUserAlbumsPagination: PropTypes.func.isRequired,
  getSearchedAlbumsPagination: PropTypes.func.isRequired,
  getSearchedAlbums: PropTypes.func.isRequired,
  clearSearchedAlbums: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(profile);
