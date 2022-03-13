import {
  SET_ALBUMS,
  SET_SEARCH_ALBUMS,
  CLEAR_ALBUMS,
  CLEAR_SEARCH_ALBUMS,
  SET_ALBUM,
  CLEAR_ALBUM,
  SET_LINK,
  LOADING_DATA,
  LOADING_DATA_PAGINATION,
  LIKE_ALBUM,
  LIKE_LINK,
  LOADING_UI,
  DELETE_ALBUM,
  DELETE_LINK,
  SET_LIKED_ALBUMS,
  CLEAR_LIKED_ALBUMS,
  SET_LIKED_LINKS,
  CLEAR_LIKED_LINKS,
  UPDATE_ONE_ALBUM,
  ADD_ALBUM,
  SET_ERRORS,
  SET_ERRORS_WITHOUT_LOAD,
  SET_LINK_ERROR,
  CLEAR_LINK_ERROR,
  REMOVE_ONE_FAILED_LINK,
  TRACK_LINKS,
  CLEAR_TRACKED_LINKS,
  SET_FAILED_LINKS,
  CLEAR_FAILED_LINKS,
  CLEAR_ERRORS,
  CLEAR_ERRORS_WITHOUT_LOAD,
  STOP_LOADING_UI,
  LOADING_UI_LIKE_ALBUM,
  STOP_LOADING_UI_LIKE_ALBUM,
  LOADING_UI_LIKE_LINK,
  STOP_LOADING_UI_LIKE_LINK,
  SET_ANOTHER_USER_PROFILE,
  CLEAR_ANOTHER_USER_PROFILE,
  REMOVE_SCROLL_LISTENER,
  RESET_SCROLL_LISTENER,
  SET_CHECK_LIKED_LINKS,
  LIKE_ALBUM_DETAILS_PAGINATION_CHECK,
  SET_LAST_LIKED_ALBUM_DETAIL_LINK,
} from "../types";
import axios from "axios";
import firebase from "../../firebase/firebase";

import { logoutUser } from "./userActions";

export const getAlbums = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/albums")
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

export const getAlbumsPagination = (sendAlbum) => (dispatch) => {
  dispatch({ type: LOADING_DATA_PAGINATION });
  axios
    .post("/albums", sendAlbum)
    .then((res) => {
      dispatch({
        type: SET_ALBUMS,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error && error.response.status === 404) {
        dispatch({
          type: REMOVE_SCROLL_LISTENER,
        });
      } else {
        dispatch({
          type: SET_ALBUMS,
          payload: [],
        });
      }
      dispatch(handleUnauthorised(error));
    });
};

export const clearAlbums = () => (dispatch) => {
  dispatch({ type: CLEAR_ALBUMS });
};

export const getSearchedAlbums = (searchQuery) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/searchAlbums", searchQuery)
    .then((res) => {
      dispatch({ type: CLEAR_SEARCH_ALBUMS });
      dispatch({
        type: SET_SEARCH_ALBUMS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: SET_SEARCH_ALBUMS,
        payload: [],
      });
      dispatch(handleUnauthorised(error));
    });
};

export const getSearchedAlbumsPagination = (searchQuery) => (dispatch) => {
  dispatch({ type: LOADING_DATA_PAGINATION });
  axios
    .post("/searchAlbums", searchQuery)
    .then((res) => {
      dispatch({
        type: SET_SEARCH_ALBUMS,
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error && error.response.status === 404) {
        dispatch({
          type: REMOVE_SCROLL_LISTENER,
        });
      } else {
        dispatch({
          type: SET_SEARCH_ALBUMS,
          payload: [],
        });
      }
      dispatch(handleUnauthorised(error));
    });
};

export const clearSearchedAlbums = () => (dispatch) => {
  dispatch({ type: CLEAR_SEARCH_ALBUMS });
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
      //to check if the album in the current page is liked by the current user (helps with pagination)
      if (res.data.isLiked) {
        let albumLikedData = {
          albumID: res.data.albumID,
        };
        dispatch({
          type: LIKE_ALBUM_DETAILS_PAGINATION_CHECK,
          payload: albumLikedData,
        });
      }
      dispatch({
        type: SET_ALBUM,
        payload: res.data,
      });
      //the back end will return the first 16 liked links for the particular album
      dispatch({
        type: SET_CHECK_LIKED_LINKS,
        payload: res.data.likedLinks,
      });
      //to get the last liked link in album details and pass it to redux
      //...to use in pagination for startAt()
      dispatch({
        type: SET_LAST_LIKED_ALBUM_DETAIL_LINK,
        payload: res.data.likedLinks[res.data.likedLinks.length - 1],
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((error) => {
      console.log(error);
      dispatch(handleUnauthorisedPrivateAlbum(error));
    });
};

export const getAlbumDetailLinksPagination =
  (albumID, albumDetailLinks) => (dispatch) => {
    console.log("album detail links: ", albumDetailLinks);
    dispatch({ type: LOADING_DATA_PAGINATION });
    axios
      .post(`/albumDetailLinks/${albumID}`, albumDetailLinks) //till here
      .then((res) => {
        console.log("album detail links pagination data:", res.data);
        dispatch({
          type: SET_ALBUM,
          payload: res.data.links,
        });
        //if there are liked links pagination for the album detail returned, dispatch that
        if (res.data.likedLinks) {
          dispatch({
            type: SET_CHECK_LIKED_LINKS,
            payload: res.data.likedLinks,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error && error.response.status === 404) {
          dispatch({
            type: REMOVE_SCROLL_LISTENER,
          });
        } else {
          dispatch({
            type: SET_ALBUMS,
            payload: [],
          });
        }
        dispatch(handleUnauthorised(error));
      });
  };

export const getLikedAlbums = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/getLikedAlbums")
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

export const getLikedAlbumsPagination = (sendAlbum) => (dispatch) => {
  dispatch({ type: LOADING_DATA_PAGINATION });
  axios
    .post("/getLikedAlbums", sendAlbum)
    .then((res) => {
      dispatch({ type: SET_LIKED_ALBUMS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      if (error && error.response.status === 404) {
        dispatch({
          type: REMOVE_SCROLL_LISTENER,
        });
      } else {
        dispatch({
          type: SET_LIKED_ALBUMS,
          payload: [],
        });
      }
      dispatch(handleUnauthorised(error));
    });
};

export const clearLikedAlbums = () => (dispatch) => {
  dispatch({ type: CLEAR_LIKED_ALBUMS });
};

export const getLikedLinks = (sendLink) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post("/getLikedLinks", sendLink)
    .then((res) => {
      dispatch({ type: SET_LIKED_LINKS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      if (error && error.response.status === 404) {
        dispatch({
          type: REMOVE_SCROLL_LISTENER,
        });
      } else {
        dispatch({
          type: SET_LIKED_LINKS,
          payload: [],
        });
      }
      dispatch(handleUnauthorised(error));
    });
};

export const getLikedLinksPagination = (sendLink) => (dispatch) => {
  dispatch({ type: LOADING_DATA_PAGINATION });
  axios
    .post("/getLikedLinks", sendLink)
    .then((res) => {
      dispatch({ type: SET_LIKED_LINKS, payload: res.data });
      console.log(res.data);
    })
    .catch((error) => {
      if (error && error.response.status === 404) {
        dispatch({
          type: REMOVE_SCROLL_LISTENER,
        });
      } else {
        dispatch({
          type: SET_LIKED_LINKS,
          payload: [],
        });
      }
      dispatch(handleUnauthorised(error));
    });
};

export const clearLikedLinks = () => (dispatch) => {
  dispatch({ type: CLEAR_LIKED_LINKS });
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
    dispatch({ type: LOADING_UI });

    newLink = newLink.replace(/(\r\n|\n|\r)/gm, "");
    let newLinkSplit = newLink.trim().split(",").filter(Boolean);
    if (newLinkSplit.length === 0) newLinkSplit = [""];
    console.log(newLinkSplit);

    let isMultiple = false;
    if (newLinkSplit.length > 1) isMultiple = true;
    console.log("len", newLinkSplit.length);

    dispatch({ type: CLEAR_TRACKED_LINKS });
    dispatch({ type: CLEAR_FAILED_LINKS });
    dispatch({ type: CLEAR_LINK_ERROR });
    dispatch({ type: CLEAR_ERRORS_WITHOUT_LOAD });

    newLinkSplit.forEach((newLink) => {
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
          if (details.alt) {
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
                        type: CLEAR_ERRORS_WITHOUT_LOAD,
                      });
                      dispatch({ type: TRACK_LINKS });
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
                            type: CLEAR_ERRORS_WITHOUT_LOAD,
                          });
                          dispatch({ type: TRACK_LINKS });
                          // history.push(`/${username}/book/${albumID}`);
                          console.log(res.data);
                        });
                    });
                }
              })
              .catch((error) => {
                console.log(error);
                if (error === "TypeError: Failed to fetch") {
                  dispatch({ type: SET_ERRORS_WITHOUT_LOAD, payload: error });
                  console.log("first", error);
                } else {
                  dispatch({
                    type: SET_ERRORS_WITHOUT_LOAD,
                    payload: error.response.data,
                  });
                  console.log("second", error.response.data);
                }
                dispatch({ type: SET_LINK_ERROR });
                dispatch({ type: SET_FAILED_LINKS, payload: newLink });
                dispatch({ type: TRACK_LINKS });
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
                  type: CLEAR_ERRORS_WITHOUT_LOAD,
                });
                dispatch({ type: TRACK_LINKS });
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
              dispatch({
                type: SET_ERRORS_WITHOUT_LOAD,
                payload: error.response.data,
              });
            console.log("last", error.response.data);
          } else
            dispatch({
              type: SET_ERRORS_WITHOUT_LOAD,
              payload: { error: "Unable to extract link's details." },
            });
          dispatch({ type: SET_LINK_ERROR });
          dispatch({ type: SET_FAILED_LINKS, payload: newLink });
          dispatch({ type: TRACK_LINKS });
          dispatch(handleUnauthorised(error));
        });
    });
  };

export const clearTrackedLinks = () => (dispatch) => {
  dispatch({ type: CLEAR_TRACKED_LINKS });
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

export const clearAlbum = () => (dispatch) => {
  dispatch({ type: CLEAR_ALBUM });
};

export const likeLink = (linkData) => (dispatch) => {
  dispatch({ type: LOADING_UI_LIKE_LINK, payload: linkData.linkID });
  axios
    .post(`/link/${linkData.linkID}/like`, linkData)
    .then((res) => {
      dispatch({
        type: LIKE_LINK,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI_LIKE_LINK, payload: linkData.linkID });
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
  axios
    .post(`/user/${username}`)
    .then((res) => {
      dispatch({
        type: SET_ANOTHER_USER_PROFILE,
        payload: res.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAnotherUserProfilePagination =
  (sendAlbumPagination) => (dispatch) => {
    dispatch({ type: LOADING_DATA_PAGINATION });
    axios
      .post(`/user/${sendAlbumPagination.username}`, sendAlbumPagination)
      .then((res) => {
        dispatch({
          type: SET_ANOTHER_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch((error) => {
        if (error && error.response.status === 404) {
          dispatch({
            type: REMOVE_SCROLL_LISTENER,
          });
        } else {
          console.log(error);
          dispatch(handleUnauthorised(error));
        }
      });
  };

export const clearAnotherUserProfile = () => (dispatch) => {
  dispatch({ type: CLEAR_ANOTHER_USER_PROFILE });
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

export const resetScrollListener = () => (dispatch) => {
  dispatch({ type: RESET_SCROLL_LISTENER });
};

export const removeScrollListener = () => (dispatch) => {
  dispatch({ type: REMOVE_SCROLL_LISTENER });
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
    window.location.href = "/books";
  }
};

//loading are all called at once
//stop loading is called for each link added
//loading should be called after each link added,
//as long as the foreach loop isnt at the end
