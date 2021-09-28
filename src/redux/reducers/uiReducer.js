import {
  SET_ERRORS,
  SET_LINK_ERROR,
  CLEAR_LINK_ERROR,
  CLEAR_ERRORS,
  CLEAR_ERRORS_WITHOUT_LOAD,
  SET_ERRORS_WITHOUT_LOAD,
  LOADING_UI,
  STOP_LOADING_UI,
  LOADING_UI_LIKE_ALBUM,
  STOP_LOADING_UI_LIKE_ALBUM,
  LOADING_UI_LIKE_LINK,
  STOP_LOADING_UI_LIKE_LINK,
  IS_ALBUM,
  IS_NOT_ALBUM,
  SET_NAV_ACTIVE,
  CLEAR_NAV_ACTIVE,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  loadingLikeAlbum: [],
  loadingLikeLink: [],
  isAlbum: false,
  linkError: false,
  navActive: false,
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
    case SET_ERRORS_WITHOUT_LOAD:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS_WITHOUT_LOAD:
      return {
        ...state,
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
          linkError: true,
        };
      } else {
        return {
          ...state,
        };
      }
    case CLEAR_LINK_ERROR:
      return {
        ...state,
        linkError: false,
      };
    case SET_NAV_ACTIVE:
      return {
        ...state,
        navActive: true,
      };
    case CLEAR_NAV_ACTIVE:
      return {
        ...state,
        navActive: false,
      };
    default:
      return state;
  }
}
