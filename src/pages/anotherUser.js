import React, { Component } from "react";

import AnotherProfile from "../components/AnotherProfile";
import Album from "../components/Album";

import "../styles/Album.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import { getAnotherUserProfile } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class anotherUser extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getAnotherUserProfile(this.props.match.params.username);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.username !== nextProps.match.params.username) {
      this.props.getAnotherUserProfile(nextProps.match.params.username);
    }
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
      anotherUserProfile: { user, albums },
      loading,
    } = this.props.data;

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
      albums ? (
        this.state.searchText === "" ? (
          albums.map((album) => (
            <Album key={album.albumID} album={album} options={true} />
          ))
        ) : (
          searches.map((album) => (
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
      <div>
        {userData}
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
});

anotherUser.propTypes = {
  data: PropTypes.object.isRequired,
  getAnotherUserProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getAnotherUserProfile })(anotherUser);
