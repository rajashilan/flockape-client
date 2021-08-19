import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./styles/Global.css";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

//components
// import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import AuthRoute from "./util/AuthRoute";
import NonAuthRoute from "./util/NonAuthRoute";

//pages
import login from "./pages/login";
import signup from "./pages/signup";
import albums from "./pages/albums";
import likedAlbums from "./pages/likedAlbums";
import likedLinks from "./pages/likedLinks";
import profile from "./pages/profile";
import signupUploadImage from "./pages/signupUploadImage";
import signupAddDetails from "./pages/signupAddDetails";
import addAlbum from "./pages/addAlbum";
import addAlbumImage from "./pages/addAlbumImage";
import albumDetails from "./pages/albumDetails";
import addLink from "./pages/addLink";
import addLinkManually from "./pages/addLinkManually";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED,
    });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar2 />
          <Switch>
            <AuthRoute exact path="/login" component={login} />
            <AuthRoute exact path="/signup" component={signup} />
            <NonAuthRoute
              exact
              path="/signup-upload-image"
              component={signupUploadImage}
            />
            <NonAuthRoute
              path="/signup-add-details"
              component={signupAddDetails}
            />
            <NonAuthRoute path="/albums" component={albums} />
            <NonAuthRoute path="/likedAlbums" component={likedAlbums} />
            <NonAuthRoute path="/likedLinks" component={likedLinks} />
            <NonAuthRoute path="/profile" component={profile} />
            <NonAuthRoute path="/addAlbum" component={addAlbum} />
            <NonAuthRoute path="/addAlbumImage" component={addAlbumImage} />
            <Route path="/album/:albumID" component={albumDetails} />
            <NonAuthRoute path="/addLink" component={addLink} />
            <NonAuthRoute path="/addLinkManually" component={addLinkManually} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
