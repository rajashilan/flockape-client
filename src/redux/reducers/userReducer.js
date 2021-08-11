import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
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
    default:
      return state;
  }
}
