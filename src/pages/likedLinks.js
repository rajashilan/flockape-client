import React, { Component } from "react";
import HomeNavigation from "../components/HomeNavigation";

import "../styles/HomeNavigation.css";
import "../styles/Link.css";

import "../styles/SearchBar.css";
import searchIcon from "../components/images/searchIcon@2x.png";
import closeIcon from "../components/images/closeIcon@2x.png";

import LinkComponent from "../components/LinkComponent";

import {
  getLikedLinks,
  getLikedLinksPagination,
  clearLikedLinks,
  resetScrollListener,
} from "../redux/actions/dataActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export class likedLinks extends Component {
  state = {
    searchText: "",
  };

  componentDidMount() {
    const linkDetail = {
      limit: null,
    };

    this.props.getLikedLinks(linkDetail);

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.props.resetScrollListener();
    this.props.clearLikedLinks();
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let difference = document.documentElement.scrollHeight - window.innerHeight;
    var scrollposition = document.documentElement.scrollTop;

    if (
      difference - scrollposition <= 250 &&
      !this.props.data.loadingPagination &&
      this.props.data.scrollListener
    ) {
      if (this.props.data.likedLinks.length > 0) {
        const linkDetail = {
          limit:
            this.props.data.likedLinks[this.props.data.likedLinks.length - 1],
        };

        console.log("linkdetail:  ", linkDetail);

        this.props.getLikedLinksPagination(linkDetail);
      }
    }
  };

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
      data: { likedLinks, loading, loadingPagination },
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

    let loadingPaginationText = loadingPagination ? (
      <p>Loading pagination</p>
    ) : null;

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
          {loadingPaginationText}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
  getLikedLinks,
  getLikedLinksPagination,
  clearLikedLinks,
  resetScrollListener,
};

likedLinks.propTypes = {
  data: PropTypes.object.isRequired,
  getLikedLinks: PropTypes.func.isRequired,
  getLikedLinksPagination: PropTypes.func.isRequired,
  clearLikedLinks: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(likedLinks);
