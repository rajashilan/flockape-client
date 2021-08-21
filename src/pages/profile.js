import React, { Component } from "react";

import Profile from "../components/Profile";
import Album from "../components/Album";

import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import { getAlbums } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class profile extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getAlbums(this.props.history);
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
    const {
      user,
      data: { albums, loading },
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
      <div>
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
            placeholder="Search for albums"
            value={this.state.searchText}
            onChange={this.handleSearch}
          />
          {searchBarIcon}
        </div>
        <div className="album-container">{albumData}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

profile.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getAlbums })(profile);
