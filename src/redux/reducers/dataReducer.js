import {
  SET_ALBUMS,
  LIKE_ALBUM,
  DELETE_ALBUM,
  LOADING_DATA,
  SET_LIKED_ALBUMS,
  ADD_ALBUM,
  UPDATE_ONE_ALBUM,
} from "../types";

const initialState = {
  albums: [],
  album: {},
  likedAlbums: [],
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
    case SET_LIKED_ALBUMS:
      return {
        ...state,
        likedAlbums: action.payload,
        loading: false,
      };
    case LIKE_ALBUM:
      //update only the album that is liked in the array index in redux
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload.albumID
      );
      state.albums[index] = action.payload;
      return {
        ...state,
      };
    case DELETE_ALBUM:
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload
      );
      state.albums.splice(index, 1);
      return {
        ...state,
      };
    case ADD_ALBUM:
      return {
        ...state,
        albums: [action.payload, ...state.albums],
      };
    case UPDATE_ONE_ALBUM:
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload.albumID
      );
      state.albums[index] = action.payload;
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
