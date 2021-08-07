import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//components
import HomeNavigation from "../components/HomeNavigation";

//pages
import albums from "../pages/albums";
import likedAlbums from "../pages/likedAlbums";
import likedLinks from "../pages/likedLinks";

export class home extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/albums" component={albums} />
          <Route path="/likedAlbums" component={likedAlbums} />
          <Route path="/likedLinks" component={likedLinks} />
        </Switch>
      </Router>
    );
  }
}

export default home;
