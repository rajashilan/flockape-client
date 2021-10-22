import axios from "axios";
import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  STOP_LOADING_UI,
  MARK_NOTIFICATIONS_READ,
  SET_CHECK_LIKED_ALBUMS,
  CLEAR_CHECK_LIKED_ALBUMS,
  REMOVE_SCROLL_LISTENER,
  SET_CHECK_LIKED_LINKS,
  CLEAR_CHECK_LIKED_LINKS,
  LOADING_NOTIFICATIONS,
  STOP_LOADING_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
} from "../types";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/books");
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/signup-upload-image");
    })
    .catch((error) => {
      console.error(error);
      if (error && error.response && error.response.data) {
        dispatch({
          type: SET_ERRORS,
          payload: error.response.data,
        });
      }
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({
    type: SET_UNAUTHENTICATED,
  });
  window.location.href = "/login";
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorised(error));
    });
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user/image", formData)
    .then(() => {
      dispatch({ type: CLEAR_ERRORS });
      dispatch(getUserData());
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
      dispatch(handleUnauthorised(error));
    });
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
      dispatch(handleUnauthorised(error));
    });
};

export const resetUserPassword = (email) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/password/reset", email)
    .then(() => {
      dispatch({ type: STOP_LOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const updateUserPassword = (passwords, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/password/update", passwords)
    .then(() => {
      dispatch({ type: STOP_LOADING_UI });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/manage-account");
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
      dispatch(handleUnauthorised(error));
    });
};

export const getNotificationsPagination = (notification) => (dispatch) => {
  dispatch({ type: LOADING_NOTIFICATIONS });
  axios
    .post("/user/notifications", notification)
    .then((res) => {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error && error.response.status === 404) {
        dispatch({
          type: REMOVE_SCROLL_LISTENER,
        });
        dispatch({ type: STOP_LOADING_NOTIFICATIONS });
      } else {
        dispatch({
          type: SET_NOTIFICATIONS,
          payload: [],
        });
      }
      dispatch(handleUnauthorised(error));
    });
};

export const clearNoticiationsPagination = () => (dispatch) => {
  dispatch({ type: CLEAR_NOTIFICATIONS });
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post("/notifications", notificationIds)
    .then((res) => {
      dispatch({ type: MARK_NOTIFICATIONS_READ });
    })
    .catch((error) => {
      console.log(error);
    });
};

//general, including other users
export const getCheckLikedAlbumsPagination = (sendLikesAlbum) => (dispatch) => {
  axios
    .post("/getLikedAlbumGeneralPagination", sendLikesAlbum)
    .then((res) => {
      dispatch({ type: SET_CHECK_LIKED_ALBUMS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      dispatch({
        type: SET_CHECK_LIKED_ALBUMS,
        payload: [],
      });
      dispatch(handleUnauthorised(error));
    });
};

//only for authenticated user
export const getCheckLikedUserAlbumsPagination =
  (sendLikesAlbum) => (dispatch) => {
    axios
      .post("/getLikedAlbumUserPagination", sendLikesAlbum)
      .then((res) => {
        dispatch({ type: SET_CHECK_LIKED_ALBUMS, payload: res.data });
        console.log(res.data);
      })
      .catch((error) => {
        dispatch({
          type: SET_CHECK_LIKED_ALBUMS,
          payload: [],
        });
        dispatch(handleUnauthorised(error));
      });
  };

export const clearCheckLikedAlbumsPagination = () => (dispatch) => {
  dispatch({ type: CLEAR_CHECK_LIKED_ALBUMS });
};

export const getCheckLikedLinksPagination = (sendLikesLink) => (dispatch) => {
  axios
    .post("/getLikedLinkPagination", sendLikesLink)
    .then((res) => {
      dispatch({ type: SET_CHECK_LIKED_LINKS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      dispatch({
        type: SET_CHECK_LIKED_LINKS,
        payload: [],
      });
      dispatch(handleUnauthorised(error));
    });
};

export const clearCheckLikedLinksPagination = () => (dispatch) => {
  dispatch({ type: CLEAR_CHECK_LIKED_LINKS });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const handleUnauthorised = (error) => (dispatch) => {
  if (error.response.status && error.response.status === 403) {
    console.log("handled");
    dispatch(logoutUser());
  }
};
