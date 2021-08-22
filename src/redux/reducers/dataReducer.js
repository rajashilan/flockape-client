import likedLinks from "../../pages/likedLinks";
import {
  SET_ALBUMS,
  SET_ALBUM,
  SET_LINK,
  LIKE_ALBUM,
  LIKE_LINK,
  DELETE_ALBUM,
  DELETE_LINK,
  LOADING_DATA,
  SET_LIKED_ALBUMS,
  SET_LIKED_LINKS,
  ADD_ALBUM,
  UPDATE_ONE_ALBUM,
  SET_ANOTHER_USER_PROFILE,
} from "../types";

const initialState = {
  albums: [],
  album: {},
  likedAlbums: [],
  likedLinks: [],
  anotherUserProfile: {},
  loading: false,
};

export default function (state = initialState, action) {
  let index = 0;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload,
        loading: false,
      };
    case SET_ALBUM:
      return {
        ...state,
        album: action.payload,
      };
    case SET_LIKED_ALBUMS:
      return {
        ...state,
        likedAlbums: action.payload,
        loading: false,
      };
    case SET_LIKED_LINKS:
      return {
        ...state,
        likedLinks: action.payload,
        loading: false,
      };
    case LIKE_ALBUM:
      //update only the album that is liked in the array index in redux
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload.albumID
      );
      state.albums[index] = action.payload;
      if (state.album && state.album.albumID === action.payload.albumID) {
        state.album.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };
    case LIKE_LINK:
      //update only the link that is liked in the array index in redux
      //the array will be inside of album in state.data
      index = state.album.links.findIndex(
        (link) => link.linkID === action.payload.linkID
      );
      state.album.links[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_ALBUM:
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload
      );
      let likedAlbumIndex;
      if (state.likedAlbums.length > 0) {
        likedAlbumIndex = state.likedAlbums.findIndex(
          (album) => album.albumID === action.payload
        );
        state.likedAlbums.splice(likedAlbumIndex, 1);
      }
      state.albums.splice(index, 1);
      return {
        ...state,
      };
    case DELETE_LINK:
      if (state.album && state.album.links) {
        index = state.album.links.findIndex(
          (link) => link.linkID === action.payload
        );
        console.log("album index", index);
        state.album.links.splice(index, 1);
      }
      let likedLinkIndex;
      if (state.likedLinks.length > 0) {
        likedLinkIndex = state.likedLinks.findIndex(
          (link) => link.linkID === action.payload
        );
        console.log("liked index", likedLinkIndex);
        state.likedLinks.splice(likedLinkIndex, 1);
      }
      return {
        ...state,
      };
    case ADD_ALBUM:
      return {
        ...state,
        albums: [action.payload, ...state.albums],
      };
    case SET_LINK:
      return {
        ...state,
        album: {
          ...state.album,
          links: [action.payload, ...state.album.links],
        },
      };
    case UPDATE_ONE_ALBUM:
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload.albumID
      );
      state.albums[index] = action.payload;
      if (state.album) {
        state.album = action.payload;
      }
      return {
        ...state,
        loading: false,
      };
    case SET_ANOTHER_USER_PROFILE:
      return {
        ...state,
        anotherUserProfile: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
