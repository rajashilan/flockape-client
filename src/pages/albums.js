import React, { Component } from "react";
import { Link } from "react-router-dom";

import HomeNavigation from "../components/HomeNavigation";
import Album from "../components/Album";
//css
import "../styles/HomeNavigation.css";
import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import { getAlbums } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class albums extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    // //if album is coming back from albumDetails page, no need to reload data
    // if (
    //   this.props.location.state &&
    //   this.props.location.state.from &&
    //   this.props.location.state.from === "component"
    // ) {
    //   //just get the album that is already set in the state
    //   console.log("ho");
    // } else {
    //   console.log("hee");
    //   this.props.getAlbums(this.props.history);
    // }
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

  Verification = () => {
    if (
      this.props.location.state &&
      this.props.location.state.verification &&
      this.props.location.state.verification === "verified"
    ) {
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
    // setTimeout(() => {
    //   if (!this.props.albums) {
    //     this.props.getAlbums(this.props.history);
    //   }
    // }, 4000);

    const { albums, loading } = this.props.data;

    let albumData = !loading ? (
      albums.map((album) => (
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
        <this.Verification />
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
        <div className="album-button-container">
          <Link to="/addAlbum" className="album-primary-button">
            Add an Album
          </Link>
        </div>
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
