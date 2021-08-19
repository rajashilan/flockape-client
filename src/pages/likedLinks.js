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

    let linkData =
      !loading && likedLinks ? (
        likedLinks.map((link) => (
          <LinkComponent key={link.linkID} link={link} options={true} />
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
        <HomeNavigation />
        <div className="search-container">
          <input
            className="search-bar"
            type="text"
            placeholder="Search for your links"
            value={this.state.searchText}
            onChange={this.handleSearch}
          />
          {searchBarIcon}
        </div>
        <div className="link-main-container">{linkData}</div>
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
