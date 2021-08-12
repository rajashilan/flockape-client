import {
  SET_ALBUMS,
  LOADING_DATA,
  LIKE_ALBUM,
  LOADING_UI,
  DELETE_ALBUM,
  SET_LIKED_ALBUMS,
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

export const getLikedAlbums = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getLikedAlbums")
    .then((res) => {
      dispatch({ type: SET_LIKED_ALBUMS, payload: res.data });
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
