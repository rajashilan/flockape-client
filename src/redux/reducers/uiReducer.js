import {
  SET_ERRORS,
  SET_LINK_ERROR,
  CLEAR_LINK_ERROR,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_UI_LIKE_ALBUM,
  STOP_LOADING_UI_LIKE_ALBUM,
  LOADING_UI_LIKE_LINK,
  STOP_LOADING_UI_LIKE_LINK,
  IS_ALBUM,
  IS_NOT_ALBUM,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  loadingLikeAlbum: [],
  loadingLikeLink: [],
  isAlbum: false,
  linkError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case LOADING_UI_LIKE_ALBUM:
      return {
        ...state,
        loadingLikeAlbum: [
          {
            albumID: action.payload,
          },
          ...state.loadingLikeAlbum,
        ],
      };
    case STOP_LOADING_UI_LIKE_ALBUM:
      let findIndexLikeAlbum = 0;
      findIndexLikeAlbum = state.loadingLikeAlbum.findIndex(
        (album) => album.albumID === action.payload
      );
      state.loadingLikeAlbum.splice(findIndexLikeAlbum, 1);
      return {
        ...state,
      };
    case LOADING_UI_LIKE_LINK:
      return {
        ...state,
        loadingLikeLink: [
          {
            linkID: action.payload,
          },
          ...state.loadingLikeLink,
        ],
      };
    case STOP_LOADING_UI_LIKE_LINK:
      let findIndexLikeLink = 0;
      findIndexLikeLink = state.loadingLikeLink.findIndex(
        (link) => link.linkID === action.payload
      );
      state.loadingLikeLink.splice(findIndexLikeLink, 1);
      return {
        ...state,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case IS_ALBUM:
      return {
        ...state,
        isAlbum: true,
      };
    case IS_NOT_ALBUM:
      return {
        ...state,
        isAlbum: false,
      };
    case SET_LINK_ERROR:
      if (!state.linkError) {
        return {
          ...state,
          loading: false,
          linkError: true,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }
    case CLEAR_LINK_ERROR:
      return {
        ...state,
        linkError: false,
      };
    default:
      return state;
  }
}
