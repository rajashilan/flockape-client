import {
  SET_ALBUMS,
  SET_ALBUM,
  SET_LINK,
  LOADING_DATA,
  LIKE_ALBUM,
  LIKE_LINK,
  LOADING_UI,
  DELETE_ALBUM,
  DELETE_LINK,
  SET_LIKED_ALBUMS,
  SET_LIKED_LINKS,
  UPDATE_ONE_ALBUM,
  ADD_ALBUM,
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  LOADING_UI_LIKE_ALBUM,
  STOP_LOADING_UI_LIKE_ALBUM,
  LOADING_UI_LIKE_LINK,
  STOP_LOADING_UI_LIKE_LINK,
} from "../types";
import axios from "axios";
import firebase from "../../firebase/firebase";

import { logoutUser } from "./userActions";

export const getAlbums = (history) => (dispatch) => {
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
      dispatch(handleUnauthorised(error));
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
      dispatch(handleUnauthorised(error));
    });
};

export const getAlbum = (albumID) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(albumID);
  axios
    .get(`/album/${albumID}`)
    .then((res) => {
      dispatch({
        type: SET_ALBUM,
        payload: res.data,
      });
      console.log(res.data);
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorised(error));
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
      dispatch(handleUnauthorised(error));
    });
};

export const getLikedLinks = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/getLikedLinks")
    .then((res) => {
      dispatch({ type: SET_LIKED_LINKS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      dispatch({
        type: SET_LIKED_LINKS,
        payload: [],
      });
      dispatch(handleUnauthorised(error));
    });
};

export const likeAlbum = (albumID) => (dispatch) => {
  dispatch({ type: LOADING_UI_LIKE_ALBUM, payload: albumID });
  axios
    .get(`/album/${albumID}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_ALBUM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI_LIKE_ALBUM, payload: albumID });
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorised(error));
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
      dispatch(handleUnauthorised(error));
    });
};

export const addNewLink = (newLink, albumID, history) => (dispatch) => {
  console.log("sending link");
  dispatch({ type: LOADING_UI });

  const sendLink = {
    linkUrl: newLink,
    linkTitle: "",
    linkDesc: "",
    linkImg: "",
    linkDomain: "",
  };

  axios
    .post("/fetchUrl?search=" + newLink)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((details) => {
      console.log("data fetched from /fetchUrl");

      sendLink.linkTitle = details.title;
      sendLink.linkDesc = details.description;
      sendLink.linkDomain = details.domain;

      let thumbnail = details.img;

      let imageUrl = "/fetchImage?search=" + thumbnail;

      // if (details.domain === "tiktok.com") {
      //   imageUrl = thumbnail;
      // }

      console.log("URL used to fetch blob: ", imageUrl);

      var storage = firebase.storage();
      var storageRef = storage.ref();
      var filename = `${Math.round(Math.random() * 1000000000000000)}-link-img`;

      fetch(imageUrl, {
        mode: "cors",
        method: "POST",
        header: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, authorization",
        },
      })
        .then((res) => {
          return res.blob();
        })
        .then((blob) => {
          console.log("type", blob.type);

          if (
            blob.type !== "image/jpeg" &&
            blob.type !== "image/png" &&
            blob.type !== "image/webp"
          ) {
            console.log("uploading default image");
            const defaultImg =
              "https://firebasestorage.googleapis.com/v0/b/sharesite-test.appspot.com/o/link-thumbnails%2Fdefault-link-img.jpg?alt=media&token=cedbb964-547c-4480-9b12-f8e0b6acb70c";
            sendLink.linkImg = defaultImg;

            axios
              .post(`/album/${albumID}/link`, sendLink)
              .then((res) => {
                dispatch({
                  type: SET_LINK,
                  payload: res.data,
                });
                dispatch({
                  type: CLEAR_ERRORS,
                });
                history.push(`album/${albumID}`);
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            console.log("uploading the original image");
            storageRef
              .child("link-thumbnails/" + filename)
              .put(blob)
              .then(function (snapshot) {
                return snapshot.ref.getDownloadURL();
              })
              .catch((error) => {
                console.log("Error getting image from imageURL", error);
              })
              .then((imgLink) => {
                console.log("Img uploaded at:", imgLink);

                sendLink.linkImg = imgLink;

                axios.post(`/album/${albumID}/link`, sendLink).then((res) => {
                  dispatch({
                    type: SET_LINK,
                    payload: res.data,
                  });
                  dispatch({
                    type: CLEAR_ERRORS,
                  });
                  history.push(`album/${albumID}`);
                  console.log(res.data);
                });
              });
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: SET_ERRORS, payload: error.response.data });
        });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: SET_ERRORS, payload: error.response.data });
      dispatch(handleUnauthorised(error));
    });
};

export const addNewLinkManually = (newLink, albumID, history) => (dispatch) => {
  console.log("sending link manually");
  dispatch({ type: LOADING_UI });

  const sendLink = {
    linkUrl: newLink.link,
    linkTitle: newLink.title,
    linkDesc: "",
    linkImg: "",
    linkDomain: "",
  };

  const defaultImg =
    "https://firebasestorage.googleapis.com/v0/b/sharesite-test.appspot.com/o/link-thumbnails%2Fdefault-link-img.jpg?alt=media&token=cedbb964-547c-4480-9b12-f8e0b6acb70c";
  sendLink.linkImg = defaultImg;

  sendLink.linkDesc = "Manually added link";

  axios
    .post(`/album/${albumID}/link`, sendLink)
    .then((res) => {
      dispatch({
        type: SET_LINK,
        payload: res.data,
      });
      dispatch({
        type: CLEAR_ERRORS,
      });
      history.push(`album/${albumID}`);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    });
};

export const likeLink = (linkID) => (dispatch) => {
  dispatch({ type: LOADING_UI_LIKE_LINK, payload: linkID });
  axios
    .get(`/link/${linkID}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_LINK,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI_LIKE_LINK, payload: linkID });
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorised(error));
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
      dispatch(handleUnauthorised(error));
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
      dispatch(handleUnauthorised(error));
    });
};

export const deleteLink = (linkID) => (dispatch) => {
  axios
    .delete(`/link/${linkID}`)
    .then(() => {
      dispatch({ type: DELETE_LINK, payload: linkID });
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorised(error));
    });
};

export const handleUnauthorised = (error) => (dispatch) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 403
  ) {
    console.log("handled");
    dispatch(logoutUser());
  }
};
