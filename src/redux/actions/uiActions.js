import { IS_ALBUM, IS_NOT_ALBUM, CLEAR_LINK_ERROR } from "../types";

export const setIsAlbumTrue = () => (dispatch) => {
  dispatch({ type: IS_ALBUM });
};

export const setIsAlbumFalse = () => (dispatch) => {
  dispatch({ type: IS_NOT_ALBUM });
};

export const clearLinkError = () => (dispatch) => {
  dispatch({ type: CLEAR_LINK_ERROR });
};
