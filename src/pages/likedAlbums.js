import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";
import SearchBar from "../components/SearchBar";

import "../styles/HomeNavigation.css";
import "../styles/Album.css";

import Album from "../components/Album";

import { getLikedAlbums } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class likedAlbums extends Component {
  componentDidMount() {
    this.props.getLikedAlbums();
  }

  render() {
    const {
      data: { likedAlbums, loading },
    } = this.props;

    let albumData = !loading ? (
      likedAlbums.map((album) => <Album key={album.albumID} album={album} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <HomeNavigation />
        <SearchBar placeholder="Search for your liked albums..." />
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
