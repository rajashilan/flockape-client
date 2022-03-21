import React, { Component } from "react";

import AnotherProfile from "../components/AnotherProfile";
import Album from "../components/Album";

import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import {
  getAnotherUserProfile,
  getAnotherUserProfilePagination,
  clearAnotherUserProfile,
  resetScrollListener,
  removeScrollListener,
  clearAlbum,
  getAnotherUserProfileSearchedAlbums,
  clearAnotherUserProfileSearchedAlbums,
  getAnotherUserProfileSearchedAlbumsPagination,
} from "../redux/actions/dataActions";

import { getCheckLikedUserAlbumsPagination } from "../redux/actions/userActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class anotherUser extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getAnotherUserProfile(this.props.match.params.username);
    this.props.clearAlbum();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetScrollListener();
    this.props.clearAnotherUserProfile();
    window.removeEventListener("scroll", this.handleScroll);
    console.log("unmount");
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.getAnotherUserProfile(nextProps.match.params.username);
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
        if (
          this.props.data.anotherUserProfile.albums &&
          this.props.data.anotherUserProfile.albums.length > 0
        ) {
          const sendAlbumPagination = {
            username: this.props.match.params.username,
            limit:
              this.props.data.anotherUserProfile.albums[
                this.props.data.anotherUserProfile.albums.length - 1
              ],
          };
          this.props.getCheckLikedUserAlbumsPagination(sendAlbumPagination);
          this.props.getAnotherUserProfilePagination(sendAlbumPagination);
        }
      }
    } else {
      if (
        difference - scrollposition <= 250 &&
        !this.props.data.loadingPagination &&
        this.props.data.scrollListener
      ) {
        if (
          this.props.data.anotherUserProfile.searchedAlbums &&
          this.props.data.anotherUserProfile.searchedAlbums.length > 0
        ) {
          const searchedAlbumDetail = {
            username: this.props.match.params.username,
            limit:
              this.props.data.anotherUserProfile.searchedAlbums[
                this.props.data.anotherUserProfile.searchedAlbums.length - 1
              ],
            search: this.state.searchText,
          };
          this.props.resetScrollListener();
          this.props.getCheckLikedUserAlbumsPagination(searchedAlbumDetail);
          this.props.getAnotherUserProfileSearchedAlbumsPagination(
            searchedAlbumDetail
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
          this.props.clearAnotherUserProfileSearchedAlbums();
        } else {
          const searchQuery = {
            username: this.props.match.params.username,
            limit: null,
            search: this.state.searchText,
          };
          this.props.getAnotherUserProfileSearchedAlbums(searchQuery);
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
        this.props.clearAnotherUserProfileSearchedAlbums();
      }
    );
  };

  render() {
    const {
      anotherUserProfile: { user, albums = [], searchedAlbums = [] },
      loading,
      loadingPagination,
    } = this.props.data;

    let loadingPaginationText = loadingPagination ? (
      <p>Loading pagination</p>
    ) : null;

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
      albums ? (
        this.state.searchText === "" ? (
          albums.map((album) => (
            <Album key={album.albumID} album={album} options={true} />
          ))
        ) : (
          searchedAlbums.map((album) => (
            <Album key={album.albumID} album={album} options={true} />
          ))
        )
      ) : null
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

    let albumLength = 0;

    if (albums) {
      albumLength = albums.length;
    }

    let albumCount = {
      albums: albumLength,
      views: 0,
      likes: 0,
    };

    if (albums && albums.length > 0) {
      albums.forEach((album) => {
        albumCount.views += album.viewCount;
        albumCount.likes += album.likeCount;
      });
    }

    let userData = !loading ? (
      user ? (
        <AnotherProfile
          albums={albumCount.albums}
          views={albumCount.views}
          likes={albumCount.likes}
          user={user}
        />
      ) : null
    ) : (
      <p>Loading...</p>
    );

    return (
      <div className="profile-main-container">
        <div className="profile-card-container">
          {userData}
          <div className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search for Books"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
            {searchBarIcon}
          </div>
          <div className="album-container">{albumData}</div>
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
  getAnotherUserProfile,
  getAnotherUserProfilePagination,
  clearAnotherUserProfile,
  getCheckLikedUserAlbumsPagination,
  resetScrollListener,
  clearAlbum,
  removeScrollListener,
  getAnotherUserProfileSearchedAlbums,
  clearAnotherUserProfileSearchedAlbums,
  getAnotherUserProfileSearchedAlbumsPagination,
};

anotherUser.propTypes = {
  data: PropTypes.object.isRequired,
  getAnotherUserProfile: PropTypes.func.isRequired,
  getAnotherUserProfilePagination: PropTypes.func.isRequired,
  clearAnotherUserProfile: PropTypes.func.isRequired,
  getCheckLikedUserAlbumsPagination: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
  clearAlbum: PropTypes.func.isRequired,
  removeScrollListener: PropTypes.func.isRequired,
  getAnotherUserProfileSearchedAlbums: PropTypes.func.isRequired,
  clearAnotherUserProfileSearchedAlbums: PropTypes.func.isRequired,
  getAnotherUserProfileSearchedAlbumsPagination: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(anotherUser);
