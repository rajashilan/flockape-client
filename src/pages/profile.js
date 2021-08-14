import React, { Component } from "react";

import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";

import "../styles/Album.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class profile extends Component {
  render() {
    const {
      user,
      data: { albums, loading },
    } = this.props;

    let albumData = !loading ? (
      albums.map((album) => (
        <Album key={album.albumID} album={album} options={true} />
      ))
    ) : (
      <p>Loading...</p>
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
        />
        <SearchBar placeholder="Search for albums" />
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
};

export default connect(mapStateToProps)(profile);
