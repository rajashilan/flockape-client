import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";

import "../styles/HomeNavigation.css";
import "../styles/Link.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import LinkComponent from "../components/LinkComponent";

import { getLikedLinks } from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class likedLinks extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    this.props.getLikedLinks();
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
      data: { likedLinks, loading },
    } = this.props;

    //searching functionalities
    let searches = [];

    if (this.state.searchText !== "") {
      let searchText = this.state.searchText;
      if (likedLinks && likedLinks.length > 0) {
        likedLinks.forEach((link) => {
          if (
            link.linkTitle.toLowerCase().substring(0, searchText.length) ===
              searchText.toLowerCase() ||
            link.username.toLowerCase().substring(0, searchText.length) ===
              searchText.toLowerCase()
          ) {
            searches.push(link);
          }
        });
      }
    }
    //end of searching functionalities

    let linkData =
      !loading && likedLinks ? (
        this.state.searchText === "" ? (
          likedLinks.map((link) => (
            <LinkComponent key={link.linkID} link={link} options={true} />
          ))
        ) : (
          searches.map((link) => (
            <LinkComponent key={link.linkID} link={link} options={true} />
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
      <div className="link-main-overall-container">
        <div className="link-card-container">
          <HomeNavigation />
          <div className="search-container">
            <input
              className="search-bar"
              type="text"
              placeholder="Search your liked pages"
              value={this.state.searchText}
              onChange={this.handleSearch}
            />
            {searchBarIcon}
          </div>
          <div className="link-likes-container">{linkData}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

likedLinks.propTypes = {
  data: PropTypes.object.isRequired,
  getLikedLinks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getLikedLinks })(likedLinks);
