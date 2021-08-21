import { IS_ALBUM, IS_NOT_ALBUM } from "../types";

export const setIsAlbumTrue = () => (dispatch) => {
  dispatch({ type: IS_ALBUM });
};

export const setIsAlbumFalse = () => (dispatch) => {
  dispatch({ type: IS_NOT_ALBUM });
};
