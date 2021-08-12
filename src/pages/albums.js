import React, { Component } from "react";

import HomeNavigation from "../components/HomeNavigation";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";
//css
import "../styles/HomeNavigation.css";
import "../styles/Album.css";

import { getAlbums } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class albums extends Component {
  componentDidMount() {
    this.props.getAlbums();
  }

  Verification = () => {
    if (this.props.location.state) {
      return (
        <p className="label-verification">
          A verification link has been sent to your email. Please click the link
          and complete your registration process to start creating albums. Thank
          you!
        </p>
      );
    } else return null;
  };

  render() {
    const { albums, loading } = this.props.data;

    let albumData = !loading ? (
      albums.map((album) => <Album key={album.albumID} album={album} />)
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <this.Verification />
        <HomeNavigation />
        <SearchBar placeholder="Search for your albums..." />
        <div className="album-container">{albumData}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

albums.propTypes = {
  data: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getAlbums })(albums);
