import {
  SET_ALBUMS,
  LOADING_DATA,
  LIKE_ALBUM,
  LOADING_UI,
  DELETE_ALBUM,
  SET_LIKED_ALBUMS,
  UPDATE_ONE_ALBUM,
  ADD_ALBUM,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

export const getAlbums = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/albums")
    .then((res) => {
      dispatch({
        type: SET_ALBUMS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ALBUMS,
        payload: [],
      });
    });
};

export const getAlbumOnly = (albumID) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/album/${albumID}/one`)
    .then((res) => {
      dispatch({
        type: UPDATE_ONE_ALBUM,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getLikedAlbums = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getLikedAlbums")
    .then((res) => {
      dispatch({ type: SET_LIKED_ALBUMS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      dispatch({
        type: SET_LIKED_ALBUMS,
        payload: [],
      });
    });
};

export const likeAlbum = (albumID) => (dispatch) => {
  axios
    .get(`/album/${albumID}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_ALBUM,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addNewAlbum = (newAlbum, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/createAlbum", newAlbum)
    .then((res) => {
      dispatch({
        type: ADD_ALBUM,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push({
        pathname: "/addAlbumImage",
        state: { albumID: res.data.albumID },
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_ERRORS,
        payload: error.response.data,
      });
    });
};

export const uploadAlbumImage = (formData, albumID) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/album/${albumID}/image`, formData)
    .then(() => {
      dispatch(getAlbumOnly(albumID));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAlbum = (albumID) => (dispatch) => {
  axios
    .delete(`/album/${albumID}`)
    .then(() => {
      dispatch({ type: DELETE_ALBUM, payload: albumID });
    })
    .catch((error) => {
      console.log(error);
    });
};
