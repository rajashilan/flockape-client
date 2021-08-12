import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_ALBUM,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likesAlbum: [],
  likesLink: [],
  notifations: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        ...action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_ALBUM:
      //check if likes album already has the payload's album id in it
      const findLike = state.likesAlbum.find(
        (like) => like.albumID === action.payload.albumID
      );

      //if yes, delete that like (unlike request)
      if (findLike) {
        return {
          ...state,
          likesAlbum: state.likesAlbum.filter(
            (likesAlbum) => likesAlbum.albumID !== action.payload.albumID
          ),
        };
      } else {
        //if no, add a new like (like request)
        return {
          ...state,
          likesAlbum: [
            ...state.likesAlbum,
            {
              username: state.credentials.username,
              albumID: action.payload.albumID,
            },
          ],
        };
      }
    default:
      return state;
  }
}
