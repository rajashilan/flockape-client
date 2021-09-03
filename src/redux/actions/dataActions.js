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
  SET_LINK_ERROR,
  CLEAR_LINK_ERROR,
  REMOVE_ONE_FAILED_LINK,
  SET_FAILED_LINKS,
  CLEAR_FAILED_LINKS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  LOADING_UI_LIKE_ALBUM,
  STOP_LOADING_UI_LIKE_ALBUM,
  LOADING_UI_LIKE_LINK,
  STOP_LOADING_UI_LIKE_LINK,
  SET_ANOTHER_USER_PROFILE,
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
  dispatch({ type: CLEAR_FAILED_LINKS });
  dispatch({ type: CLEAR_LINK_ERROR });
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
      dispatch(handleUnauthorisedPrivateAlbum(error));
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
        pathname: "/add-book-cover",
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

export const editAlbumDetails =
  (editedAlbum, albumID, username, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post(`/album/${albumID}`, editedAlbum)
      .then(() => {
        dispatch(getAlbumOnly(albumID));
        dispatch({
          type: CLEAR_ERRORS,
        });
        history.push(`/${username}/book/${albumID}`);
      })
      .catch((error) => {
        dispatch({
          type: SET_ERRORS,
          payload: error.response.data,
        });
        dispatch(handleUnauthorised(error));
      });
  };

// export const addNewLink =
//   (newLink, albumID, username, history) => (dispatch) => {
//     console.log("sending link");
//     dispatch({ type: LOADING_UI });

//     const sendLink = {
//       linkUrl: newLink,
//       linkTitle: "",
//       linkDesc: "",
//       linkImg: "",
//       linkDomain: "",
//     };

//     axios
//       .post("/fetchUrl?search=" + newLink)
//       .then((res) => {
//         console.log(res.data);
//         return res.data;
//       })
//       .then((details) => {
//         console.log("data fetched from /fetchUrl");

//         sendLink.linkTitle = details.title;
//         sendLink.linkDesc = details.description;
//         sendLink.linkDomain = details.domain;

//         let thumbnail = details.img;

//         let imageUrl = thumbnail;

//         //start of if
//         if (details.domain === "tiktok.com") {
//           imageUrl = thumbnail;

//           console.log("URL used to fetch blob: ", imageUrl);

//           var storage = firebase.storage();
//           var storageRef = storage.ref();
//           var filename = `${Math.round(
//             Math.random() * 1000000000000000
//           )}-link-img`;

//           fetch(imageUrl, {
//             mode: "cors",
//             method: "get",
//             header: {
//               "Access-Control-Allow-Origin": "*",
//               "Access-Control-Allow-Methods":
//                 "GET,PUT,POST,DELETE,PATCH,OPTIONS",
//               "Access-Control-Allow-Headers":
//                 "Origin, X-Requested-With, Content-Type, Accept, authorization",
//             },
//           })
//             .then((res) => {
//               return res.blob();
//             })
//             .then((blob) => {
//               console.log("type", blob.type);

//               if (
//                 blob.type !== "image/jpeg" &&
//                 blob.type !== "image/png" &&
//                 blob.type !== "image/webp"
//               ) {
//                 console.log("uploading default image");
//                 const defaultImg =
//                   "https://firebasestorage.googleapis.com/v0/b/sharesite-test.appspot.com/o/link-thumbnails%2Fdefault-link-img.jpg?alt=media&token=cedbb964-547c-4480-9b12-f8e0b6acb70c";
//                 sendLink.linkImg = defaultImg;

//                 axios
//                   .post(`/album/${albumID}/link`, sendLink)
//                   .then((res) => {
//                     dispatch({
//                       type: SET_LINK,
//                       payload: res.data,
//                     });
//                     dispatch({
//                       type: CLEAR_ERRORS,
//                     });
//                     history.push(`/${username}/book/${albumID}`);
//                     console.log(res.data);
//                   })
//                   .catch((error) => {
//                     console.log(error);
//                   });
//               } else {
//                 console.log("uploading the original image");
//                 storageRef
//                   .child("link-thumbnails/" + filename)
//                   .put(blob)
//                   .then(function (snapshot) {
//                     return snapshot.ref.getDownloadURL();
//                   })
//                   .catch((error) => {
//                     console.log("Error getting image from imageURL", error);
//                   })
//                   .then((imgLink) => {
//                     console.log("Img uploaded at:", imgLink);

//                     sendLink.linkImg = imgLink;

//                     axios
//                       .post(`/album/${albumID}/link`, sendLink)
//                       .then((res) => {
//                         dispatch({
//                           type: SET_LINK,
//                           payload: res.data,
//                         });
//                         dispatch({
//                           type: CLEAR_ERRORS,
//                         });
//                         history.push(`/${username}/book/${albumID}`);
//                         console.log(res.data);
//                       });
//                   });
//               }
//             })
//             .catch((error) => {
//               console.log(error);
//               if (error === "TypeError: Failed to fetch") {
//                 dispatch({ type: SET_ERRORS, payload: error });
//               } else {
//                 dispatch({ type: SET_ERRORS, payload: error.response.data });
//               }
//             });
//         } // end of if
//         else {
//           sendLink.linkImg = details.img;
//           console.log("uploading image directly from fetch");

//           axios
//             .post(`/album/${albumID}/link`, sendLink)
//             .then((res) => {
//               dispatch({
//                 type: SET_LINK,
//                 payload: res.data,
//               });
//               dispatch({
//                 type: CLEAR_ERRORS,
//               });
//               history.push(`/${username}/book/${albumID}`);
//               console.log(res.data);
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response && error.response.data)
//           dispatch({ type: SET_ERRORS, payload: error.response.data });
//         else
//           dispatch({
//             type: SET_ERRORS,
//             payload: { error: "Oops! Unable to extract link's details." },
//           });
//         dispatch(handleUnauthorised(error));
//       });
//   };

export const addNewLink =
  (newLink, albumID, username, history) => (dispatch) => {
    newLink = newLink.replace(/(\r\n|\n|\r)/gm, "");
    let newLinkSplit = newLink.trim().split(",").filter(Boolean);
    if (newLinkSplit.length === 0) newLinkSplit = [""];
    console.log(newLinkSplit);

    let isMultiple = false;
    if (newLinkSplit.length > 1) isMultiple = true;
    console.log("len", newLinkSplit.length);

    dispatch({ type: CLEAR_FAILED_LINKS });
    dispatch({ type: CLEAR_LINK_ERROR });
    dispatch({ type: CLEAR_ERRORS });

    newLinkSplit.forEach((newLink) => {
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
          let imageUrl = thumbnail;

          //start of if
          if (details.domain === "tiktok.com") {
            imageUrl = thumbnail;

            console.log("URL used to fetch blob: ", imageUrl);

            var storage = firebase.storage();
            var storageRef = storage.ref();
            var filename = `${Math.round(
              Math.random() * 1000000000000000
            )}-link-img`;

            fetch(imageUrl, {
              mode: "cors",
              method: "get",
              header: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
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
                      // dispatch({ type: STOP_LOADING_UI });
                      dispatch({
                        type: CLEAR_ERRORS,
                      });
                      // history.push(`/${username}/book/${albumID}`);
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

                      axios
                        .post(`/album/${albumID}/link`, sendLink)
                        .then((res) => {
                          dispatch({
                            type: SET_LINK,
                            payload: res.data,
                          });
                          // dispatch({ type: STOP_LOADING_UI });
                          dispatch({
                            type: CLEAR_ERRORS,
                          });
                          // history.push(`/${username}/book/${albumID}`);
                          console.log(res.data);
                        });
                    });
                }
              })
              .catch((error) => {
                console.log(error);
                if (error === "TypeError: Failed to fetch") {
                  dispatch({ type: SET_ERRORS, payload: error });
                  console.log("first", error);
                } else {
                  dispatch({
                    type: SET_ERRORS,
                    payload: error.response.data,
                  });
                  console.log("second", error.response.data);
                }
                dispatch({ type: SET_LINK_ERROR });
                dispatch({ type: SET_FAILED_LINKS, payload: newLink });
              });
          } // end of if
          else {
            sendLink.linkImg = details.img;
            console.log("uploading image directly from fetch");

            axios
              .post(`/album/${albumID}/link`, sendLink)
              .then((res) => {
                dispatch({
                  type: SET_LINK,
                  payload: res.data,
                });
                // dispatch({ type: STOP_LOADING_UI });
                dispatch({
                  type: CLEAR_ERRORS,
                });
                // history.push(`/${username}/book/${albumID}`);
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(isMultiple);
          if (error.response && error.response.data) {
            if (!isMultiple)
              dispatch({ type: SET_ERRORS, payload: error.response.data });
            console.log("last", error.response.data);
          } else
            dispatch({
              type: SET_ERRORS,
              payload: { error: "Unable to extract link's details." },
            });
          dispatch({ type: SET_LINK_ERROR });
          dispatch({ type: SET_FAILED_LINKS, payload: newLink });
          dispatch(handleUnauthorised(error));
        });
    });
  };

// export const addNewLinkManually =
//   (newLink, albumID, username, history) => (dispatch) => {
//     console.log("sending link manually");
//     dispatch({ type: LOADING_UI });

//     const sendLink = {
//       linkUrl: newLink.link,
//       linkTitle: newLink.title,
//       linkDesc: "",
//       linkImg: "",
//       linkDomain: "",
//     };

//     const defaultImg =
//       "https://firebasestorage.googleapis.com/v0/b/sharesite-test.appspot.com/o/link-thumbnails%2Fdefault-link-img.jpg?alt=media&token=cedbb964-547c-4480-9b12-f8e0b6acb70c";
//     sendLink.linkImg = defaultImg;

//     sendLink.linkDesc = "Manually added page";

//     axios
//       .post(`/album/${albumID}/link`, sendLink)
//       .then((res) => {
//         dispatch({
//           type: SET_LINK,
//           payload: res.data,
//         });
//         dispatch({
//           type: CLEAR_ERRORS,
//         });
//         history.push(`/${username}/book/${albumID}`);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         if (error.response && error.response.data)
//           dispatch({ type: SET_ERRORS, payload: error.response.data });
//         else
//           dispatch({
//             type: SET_ERRORS,
//             payload: { error: "Something went wrong, please try again." },
//           });
//         dispatch(handleUnauthorised(error));
//       });
//   };

export const addNewLinkManually =
  (newLink, albumID, username, history, isUserUpload) => (dispatch) => {
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

    sendLink.linkDesc = "Manually added page";

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
        dispatch({
          type: REMOVE_ONE_FAILED_LINK,
        });
        if (isUserUpload) history.push(`/${username}/book/${albumID}`);
        else history.push("/add-page-manually");
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data)
          dispatch({ type: SET_ERRORS, payload: error.response.data });
        else
          dispatch({
            type: SET_ERRORS,
            payload: { error: "Something went wrong, please try again." },
          });
        dispatch(handleUnauthorised(error));
      });
  };

export const clearFailedLinks = () => (dispatch) => {
  dispatch({ type: CLEAR_FAILED_LINKS });
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
      dispatch({
        type: CLEAR_ERRORS,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorised(error));
    });
};

export const getAnotherUserProfile = (username) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log("leggo");
  axios
    .get(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: SET_ANOTHER_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
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

export const deleteLink =
  (linkID, albumID, username, history) => (dispatch) => {
    axios
      .delete(`/link/${linkID}`)
      .then(() => {
        dispatch({ type: DELETE_LINK, payload: linkID });
        if (history) history.push(`/${username}/book/${albumID}`);
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
    dispatch(logoutUser());
  }
};

export const handleUnauthorisedPrivateAlbum = (error) => (dispatch) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 403
  ) {
    window.location.href = "/albums";
  }
};

//loading are all called at once
//stop loading is called for each link added
//loading should be called after each link added,
//as long as the foreach loop isnt at the end
