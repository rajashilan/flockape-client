import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
  LOADING_NOTIFICATIONS,
  STOP_LOADING_NOTIFICATIONS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_ALBUM,
  LIKE_LINK,
  SET_CHECK_LIKED_ALBUMS,
  CLEAR_CHECK_LIKED_ALBUMS,
  SET_CHECK_LIKED_LINKS,
  CLEAR_CHECK_LIKED_LINKS,
  MARK_NOTIFICATIONS_READ,
  SET_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likesAlbum: [],
  likesLink: [],
  notifications: [],
  loadingNotifications: false,
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
        loadingNotifications: false,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LOADING_NOTIFICATIONS:
      return {
        ...state,
        loadingNotifications: true,
      };
    case STOP_LOADING_NOTIFICATIONS:
      return {
        ...state,
        loadingNotifications: false,
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
    case SET_CHECK_LIKED_ALBUMS:
      if (state.likesAlbum.length > 0) {
        return {
          ...state,
          likesAlbum: [...state.likesAlbum, ...action.payload],
        };
      } else {
        return {
          ...state,
          likesAlbum: action.payload,
        };
      }
    case SET_CHECK_LIKED_LINKS:
      if (state.likesLink.length > 0) {
        return {
          ...state,
          likesLink: [...state.likesLink, ...action.payload],
        };
      } else {
        return {
          ...state,
          likesLink: action.payload,
        };
      }
    case CLEAR_CHECK_LIKED_ALBUMS:
      state.likesAlbum.splice(20);
      return {
        ...state,
        likesAlbum: state.likesAlbum,
      };
    case CLEAR_CHECK_LIKED_LINKS:
      state.likesLink.splice(16);
      return {
        ...state,
        likesLink: state.likesLink,
      };
    case SET_NOTIFICATIONS:
      if (state.notifications.length > 0) {
        return {
          ...state,
          notifications: [...state.notifications, ...action.payload],
          loadingNotifications: false,
          loading: false,
        };
      } else {
        return {
          ...state,
          notifications: action.payload,
          loadingNotifications: false,
          loading: false,
        };
      }
    case CLEAR_NOTIFICATIONS:
      state.notifications.splice(16);
      return {
        ...state,
        notifications: state.notifications,
      };
    default:
      return state;
  }
}
