import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";

import "../styles/HomeNavigation.css";
import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import Album from "../components/Album";

import { getLikedAlbums } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class likedAlbums extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getLikedAlbums();
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
      data: { likedAlbums, loading },
    } = this.props;

    //searching functionalities
    let searches = [];

    if (this.state.searchText !== "") {
      let searchText = this.state.searchText;
      if (likedAlbums && likedAlbums.length > 0) {
        likedAlbums.forEach((album) => {
          if (
            album.albumTitle.toLowerCase().substring(0, searchText.length) ===
              searchText.toLowerCase() ||
            album.username.toLowerCase().substring(0, searchText.length) ===
              searchText.toLowerCase()
          ) {
            searches.push(album);
          }
        });
      }
    }
    //end of searching functionalities

    let albumData =
      !loading && likedAlbums ? (
        this.state.searchText === "" ? (
          likedAlbums.map((album) => (
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

likedAlbums.propTypes = {
  data: PropTypes.object.isRequired,
  getLikedAlbums: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getLikedAlbums })(likedAlbums);
