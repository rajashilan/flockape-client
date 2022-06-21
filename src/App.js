import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./styles/Global.css";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, tokenExpired } from "./redux/actions/userActions";

//components
// import Navbar from "./components/Navbar";
import Navbar2 from "./components/Navbar2";
import ProfileCardMain from "./components/ProfileCardMain";
import AuthRoute from "./util/AuthRoute";

import "../src/styles/AppContainer.css";

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
import anotherUser from "./pages/anotherUser";
import manageAccount from "./pages/manageAccount";
import editAlbum from "./pages/editAlbum";
import resetPassword from "./pages/resetPassword";
import updatePassword from "./pages/updatePassword";
import notifications from "./pages/notifications";
import feedback from "./pages/feedback";
import notFound from "./pages/notFound";

axios.defaults.baseURL =
  "https://asia-southeast1-sharesite-test.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    console.log("this is triggered");
    store.dispatch(tokenExpired());
    //window.location.href = "/login";
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
            <AuthRoute exact path="/reset-password" component={resetPassword} />
            <Route
              exact
              path="/signup-upload-image"
              component={signupUploadImage}
            />
            <Route path="/signup-add-details" component={signupAddDetails} />
            <div className="app-main-container">
              <Switch>
                <Route exact path={["/", "/books"]} component={albums} />
                <Route exact path="/followed-books" component={likedAlbums} />
                <Route exact path="/liked-pages" component={likedLinks} />
                <Route exact path="/profile" component={profile} />
                <Route exact path="/notifications" component={notifications} />
                <Route exact path="/create-book" component={addAlbum} />
                <Route exact path="/add-book-cover" component={addAlbumImage} />
                <Route exact path="/add-page" component={addLink} />
                <Route
                  exact
                  path="/add-page-manually"
                  component={addLinkManually}
                />
                <Route exact path="/manage-account" component={manageAccount} />
                <Route exact path="/edit-book" component={editAlbum} />
                <Route
                  exact
                  path="/update-password"
                  component={updatePassword}
                />
                <Route
                  exact
                  path="/:username/book/:albumID"
                  component={albumDetails}
                />
                <Route exact path="/@:username" component={anotherUser} />
                <Route exact path="/feedback" component={feedback} />
                <Route path="/@*" component={notFound} />
                <Route path="*" component={notFound} />
              </Switch>
              <ProfileCardMain />
            </div>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
