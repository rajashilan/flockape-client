import {
  IS_ALBUM,
  IS_NOT_ALBUM,
  CLEAR_ERRORS,
  CLEAR_LINK_ERROR,
  STOP_LOADING_UI,
  SET_NAV_ACTIVE,
  CLEAR_NAV_ACTIVE,
} from "../types";

export const setIsAlbumTrue = () => (dispatch) => {
  dispatch({ type: IS_ALBUM });
};

export const setIsAlbumFalse = () => (dispatch) => {
  dispatch({ type: IS_NOT_ALBUM });
};

export const clearLinkError = () => (dispatch) => {
  dispatch({ type: CLEAR_LINK_ERROR });
};

export const stopLoadingUI = () => (dispatch) => {
  dispatch({ type: STOP_LOADING_UI });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setNav = () => (dispatch) => {
  dispatch({ type: SET_NAV_ACTIVE });
};

export const clearNav = () => (dispatch) => {
  dispatch({ type: CLEAR_NAV_ACTIVE });
};
