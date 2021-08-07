import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";
import SearchBar from "../components/SearchBar";
import Album from "../components/Album";
//css
import "../styles/HomeNavigation.css";
import "../styles/Album.css";
import axios from "axios";

export class albums extends Component {
  state = {
    albums: null,
  };

  componentDidMount() {
    axios
      .get("/user/user")
      .then((res) => {
        this.setState({
          albums: res.data.albums,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    let albumData = this.state.albums ? (
      this.state.albums.map((album) => (
        <Album key={album.albumID} album={album} />
      ))
    ) : (
      <p>Loading...</p>
    );
    return (
      <div>
        <HomeNavigation />
        <SearchBar placeholder="Search for your albums..." />
        <div className="album-container">{albumData}</div>
      </div>
    );
  }
}

export default albums;
