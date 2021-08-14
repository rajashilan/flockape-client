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

    let albumData =
      !loading && likedAlbums ? (
        likedAlbums.map((album) => (
          <Album key={album.albumID} album={album} options={true} />
        ))
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
      <div>
        <HomeNavigation />
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search for your albums"
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
});

likedAlbums.propTypes = {
  data: PropTypes.object.isRequired,
  getLikedAlbums: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getLikedAlbums })(likedAlbums);
