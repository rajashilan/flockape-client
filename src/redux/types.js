//user reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export const SET_USER = "SET_USER";
export const LOADING_USER = "LOADING_USER";
export const MARK_NOTIFICATIONS_READ = "MARK_NOTIFICATIONS_READ";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS"; //for notifications pagination
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS"; //clear the remaining notifications to avoid duplicate data
export const LOADING_NOTIFICATIONS = "LOADING_NOTIFICATIONS"; //loading for notifications pagination
export const STOP_LOADING_NOTIFICATIONS = "STOP_LOADING_NOTIFICATIONS"; //stop loading sign for when scroll listener is removed for notifications page

//ui reducer types
export const SET_ERRORS = "SET_ERRORS";
export const LOADING_UI = "LOADING_UI";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const LOADING_DATA = "LOADING_DATA";
export const STOP_LOADING_UI = "STOP_LOADING_UI";
export const IS_ALBUM = "IS_ALBUM";
export const IS_NOT_ALBUM = "IS_NOT_ALBUM";
export const SET_LINK_ERROR = "SET_LINK_ERROR";
export const CLEAR_LINK_ERROR = "CLEAR_LINK_ERROR";
export const CLEAR_ERRORS_WITHOUT_LOAD = "CLEAR_ERRORS_WITHOUT_LOAD";
export const SET_ERRORS_WITHOUT_LOAD = "SET_ERRORS_WITHOUT_LOAD";
export const SET_NAV_ACTIVE = "SET_NAV_ACTIVE";
export const CLEAR_NAV_ACTIVE = "CLEAR_NAV_ACTIVE";

//data reducer types
export const SET_ALBUMS = "SET_ALBUMS";
export const SET_SEARCH_ALBUMS = "SET_SEARCH_ALBUMS";
export const SET_SEARCH_LIKED_ALBUMS = "SET_SEARCH_LIKED_ALBUMS";
export const SET_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS =
  "SET_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS";
export const CLEAR_ALBUMS = "CLEAR_ALBUMS";
export const CLEAR_SEARCH_ALBUMS = "CLEAR_SEARCH_ALBUMS";
export const CLEAR_SEARCH_LIKED_ALBUMS = "CLEAR_SEARCH_LIKED_ALBUMS";
export const CLEAR_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS =
  "CLEAR_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS";
export const SET_ALBUM = "SET_ALBUM";
export const CLEAR_ALBUM = "CLEAR_ALBUM";
export const LIKE_ALBUM = "LIKE_ALBUM";
export const LIKE_ALBUM_DETAILS_PAGINATION_CHECK =
  "LIKE_ALBUM_DETAILS_PAGINATION_CHECK";
export const LIKE_LINK = "LIKE_LINK";
export const DELETE_ALBUM = "DELETE_ALBUM";
export const DELETE_LINK = "DELETE_LINK";
export const SET_LIKED_ALBUMS = "SET_LIKED_ALBUMS";
export const CLEAR_LIKED_ALBUMS = "CLEAR_LIKED_ALBUMS";
export const SET_LIKED_LINKS = "SET_LIKED_LINKS";
export const CLEAR_LIKED_LINKS = "CLEAR_LIKED_LINKS";
export const ADD_ALBUM = "ADD_ALBUM";
export const UPDATE_ONE_ALBUM = "UPDATE_ONE_ALBUM";
export const SET_LINK = "SET_LINK";
export const LOADING_UI_LIKE_ALBUM = "LOADING_UI_LIKE_ALBUM";
export const STOP_LOADING_UI_LIKE_ALBUM = "STOP_LOADING_UI_LIKE_ALBUM";
export const LOADING_UI_LIKE_LINK = "LOADING_UI_LIKE_LINK";
export const STOP_LOADING_UI_LIKE_LINK = "STOP_LOADING_UI_LIKE_LINK";
export const SET_ANOTHER_USER_PROFILE = "SET_ANOTHER_USER_PROFILE";
export const CLEAR_ANOTHER_USER_PROFILE = "CLEAR_ANOTHER_USER_PROFILE";
export const SET_FAILED_LINKS = "SET_FAILED_LINKS";
export const CLEAR_FAILED_LINKS = "CLEAR_FAILED_LINKS";
export const REMOVE_ONE_FAILED_LINK = "REMOVE_ONE_FAILED_LINK";
export const TRACK_LINKS = "TRACK_LINKS";
export const CLEAR_TRACKED_LINKS = "CLEAR_TRACKED_LINKS";
export const REMOVE_SCROLL_LISTENER = "REMOVE_SCROLL_LISTENER";
export const RESET_SCROLL_LISTENER = "RESET_SCROLL_LISTENER";
export const LOADING_DATA_PAGINATION = "LOADING_DATA_PAGINATION";
export const SET_CHECK_LIKED_ALBUMS = "SET_CHECK_LIKED_ALBUMS"; //albums pagination for the likes in get authenticated user function
export const CLEAR_CHECK_LIKED_ALBUMS = "CLEAR_CHECK_LIKED_ALBUMS";
export const SET_CHECK_LIKED_LINKS = "SET_CHECK_LIKED_LINKS"; //links pagination for the likes in get authenticated user function
export const CLEAR_CHECK_LIKED_LINKS = "CLEAR_CHECK_LIKED_LINKS";
export const SET_LAST_LIKED_ALBUM_DETAIL_LINK =
  "SET_LAST_LIKED_ALBUM_DETAIL_LINK";
export const CLEAR_LAST_LIKED_ALBUM_DETAIL_LINK =
  "CLEAR_LAST_LIKED_ALBUM_DETAIL_LINK";
