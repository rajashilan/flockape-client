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
    showNotVerifiedText: false,
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

  handleButtonNotVerified = () => {
    this.setState({
      showNotVerifiedText: true,
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
          and complete your registration process to start creating Books. Thank
          you!
        </p>
      );
    } else return null;
  };

  render() {
    const { albums, loading } = this.props.data;

    const { authenticated, credentials } = this.props.user;

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

    let addAnAlbumButton = authenticated ? (
      credentials.isVerified ? (
        <Link to="/create-book" className="album-primary-button">
          Create a Book
        </Link>
      ) : (
        <button
          type="button"
          onClick={this.handleButtonNotVerified}
          className="album-secondary-button"
        >
          Create a Book
        </button>
      )
    ) : null;

    let verificationErrorLabel = this.state.showNotVerifiedText ? (
      <p className="album-label-error">
        Please verify your email to create a Book
      </p>
    ) : null;

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
          <this.Verification />
          <HomeNavigation />
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
          <div className="album-container">{albumData}</div>
          <div className="album-button-container">
            {addAnAlbumButton}
            {verificationErrorLabel}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

albums.propTypes = {
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getAlbums: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getAlbums })(albums);
