import React, { Component } from "react";

import Profile from "../components/Profile";
import Album from "../components/Album";

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
  };

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
    const {
      user,
      data: { albums, loading, loadingPagination },
    } = this.props;

    //searching functionalities
    let searches = [];

    if (this.state.searchText !== "") {
      let searchText = this.state.searchText;
      if (albums && albums.length > 0) {
        albums.forEach((album) => {
          if (
            album.albumTitle.toLowerCase().substring(0, searchText.length) ===
            searchText.toLowerCase()
          ) {
            searches.push(album);
          }
        });
      }
    }
    //end of searching functionalities

    let albumData = !loading ? (
      this.state.searchText === "" ? (
        albums.map((album) => (
          <Album key={album.albumID} album={album} options={true} />
        ))
      ) : (
        searches.map((album) => (
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

    let loadingPaginationText = loadingPagination ? (
      <p>Loading pagination</p>
    ) : null;

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
          <div className="album-likes-container">{albumData}</div>
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
};

export default connect(mapStateToProps, mapActionToProps)(profile);
