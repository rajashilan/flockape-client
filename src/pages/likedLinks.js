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
  getSearchedLikedLinks,
  getSearchedLikedLinksPagination,
  clearSearchedLikedLinks,
} from "../redux/actions/dataActions";

//getCheckLikedAlbumsPagination is basically the function to get the liked pagination for the user
import {
  getCheckLikedLinksPagination,
  clearCheckLikedLinksPagination,
} from "../redux/actions/userActions";

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
    this.props.clearSearchedLikedLinks();
    this.props.clearCheckLikedLinksPagination();
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    let difference = document.documentElement.scrollHeight - window.innerHeight;
    var scrollposition = document.documentElement.scrollTop;

    if (this.state.searchText.length === 0) {
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

          this.props.getCheckLikedLinksPagination(linkDetail);
          this.props.getLikedLinksPagination(linkDetail);
        }
      }
    } else {
      if (
        difference - scrollposition <= 250 &&
        !this.props.data.loadingPagination &&
        this.props.data.scrollListener
      ) {
        if (this.props.data.searchedLikedLinks.length > 0) {
          const searchedLinkDetail = {
            limit:
              this.props.data.searchedLikedLinks[
                this.props.data.searchedLikedLinks.length - 1
              ],
            search: this.state.searchText,
          };
          this.props.resetScrollListener();
          this.props.getCheckLikedLinksPagination(searchedLinkDetail);
          this.props.getSearchedLikedLinksPagination(searchedLinkDetail);
        }
      }
    }
  };

  handleSearch = (event) => {
    this.setState(
      {
        searchText: event.target.value,
      },
      () => {
        if (this.state.searchText.length === 0) {
          this.props.clearSearchedLikedLinks();
        } else {
          const searchQuery = {
            limit: null,
            search: this.state.searchText,
          };
          this.props.getSearchedLikedLinks(searchQuery);
        }
        this.props.resetScrollListener();
      }
    );
  };

  handleSearchReset = () => {
    this.setState(
      {
        searchText: "",
      },
      () => {
        this.props.resetScrollListener();
        this.props.clearSearchedLikedLinks();
      }
    );
  };

  render() {
    const {
      data: { likedLinks = [], loading, loadingPagination, searchedLikedLinks },
    } = this.props;

    //searching functionalities
    // let searches = [];

    // if (this.state.searchText !== "") {
    //   let searchText = this.state.searchText;
    //   if (likedLinks && likedLinks.length > 0) {
    //     likedLinks.forEach((link) => {
    //       if (
    //         link.linkTitle.toLowerCase().substring(0, searchText.length) ===
    //           searchText.toLowerCase() ||
    //         link.username.toLowerCase().substring(0, searchText.length) ===
    //           searchText.toLowerCase()
    //       ) {
    //         searches.push(link);
    //       }
    //     });
    //   }
    // }
    //end of searching functionalities

    let loadingPaginationText = loadingPagination ? (
      <p>Loading pagination</p>
    ) : null;

    let linkData =
      !loading && likedLinks ? (
        this.state.searchText === "" ? (
          likedLinks.map((link) => (
            <LinkComponent
              key={link.linkID}
              link={link}
              albumID={link.albumID}
              options={true}
            />
          ))
        ) : (
          searchedLikedLinks.map((link) => (
            <LinkComponent
              key={link.linkID}
              link={link}
              albumID={link.albumID}
              options={true}
            />
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
              placeholder="Search for pages or username"
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
  getCheckLikedLinksPagination,
  clearCheckLikedLinksPagination,
  clearLikedLinks,
  resetScrollListener,
  getSearchedLikedLinks,
  getSearchedLikedLinksPagination,
  clearSearchedLikedLinks,
};

likedLinks.propTypes = {
  data: PropTypes.object.isRequired,
  getLikedLinks: PropTypes.func.isRequired,
  getLikedLinksPagination: PropTypes.func.isRequired,
  clearLikedLinks: PropTypes.func.isRequired,
  getCheckLikedLinksPagination: PropTypes.func.isRequired,
  clearCheckLikedLinksPagination: PropTypes.func.isRequired,
  resetScrollListener: PropTypes.func.isRequired,
  getSearchedLikedLinks: PropTypes.func.isRequired,
  getSearchedLikedLinksPagination: PropTypes.func.isRequired,
  clearSearchedLikedLinks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(likedLinks);
