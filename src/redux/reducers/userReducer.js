import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_ALBUM,
  LIKE_LINK,
  MARK_NOTIFICATIONS_READ,
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
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
      };
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
      const findLikeAlbum = state.likesAlbum.find(
        (like) => like.albumID === action.payload.albumID
      );

      //if yes, delete that like (unlike request)
      if (findLikeAlbum) {
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
    case LIKE_LINK:
      //check if likes link already has the payload's link id in it
      const findLikeLink = state.likesLink.find(
        (like) => like.linkID === action.payload.linkID
      );

      //if yes, delete that like (unlike request)
      if (findLikeLink) {
        return {
          ...state,
          likesLink: state.likesLink.filter(
            (likesLink) => likesLink.linkID !== action.payload.linkID
          ),
        };
      } else {
        //if no, add a new like (like request)
        return {
          ...state,
          likesLink: [
            ...state.likesLink,
            {
              username: state.credentials.username,
              linkID: action.payload.linkID,
            },
          ],
        };
      }
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((notification) => (notification.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
