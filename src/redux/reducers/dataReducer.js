import {
  SET_ALBUMS,
  SET_SEARCH_ALBUMS,
  SET_SEARCH_LIKED_ALBUMS,
  SET_SEARCH_LIKED_LINKS,
  SET_SEARCH_ALBUM_DETAILS_LINKS,
  SET_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS,
  CLEAR_ALBUMS,
  CLEAR_SEARCH_ALBUMS,
  CLEAR_SEARCH_LIKED_ALBUMS,
  CLEAR_SEARCH_LIKED_LINKS,
  CLEAR_SEARCH_ALBUM_DETAILS_LINKS,
  CLEAR_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS,
  SET_ALBUM,
  CLEAR_ALBUM,
  SET_LINK,
  SET_FAILED_LINKS,
  CLEAR_FAILED_LINKS,
  REMOVE_ONE_FAILED_LINK,
  TRACK_LINKS,
  CLEAR_TRACKED_LINKS,
  LIKE_ALBUM,
  LIKE_LINK,
  DELETE_ALBUM,
  DELETE_LINK,
  LOADING_DATA,
  LOADING_DATA_PAGINATION,
  SET_LIKED_ALBUMS,
  CLEAR_LIKED_ALBUMS,
  SET_LIKED_LINKS,
  CLEAR_LIKED_LINKS,
  ADD_ALBUM,
  UPDATE_ONE_ALBUM,
  SET_ANOTHER_USER_PROFILE,
  CLEAR_ANOTHER_USER_PROFILE,
  REMOVE_SCROLL_LISTENER,
  RESET_SCROLL_LISTENER,
} from "../types";

const initialState = {
  albums: [],
  album: {},
  searchedAlbums: [],
  searchedLikedAlbums: [],
  searchedLikedLinks: [],
  likedAlbums: [],
  likedLinks: [],
  failedLinks: [],
  numOfLinksUploaded: 0,
  anotherUserProfile: {},
  loading: false,
  loadingPagination: false,
  scrollListener: true,
};

export default function (state = initialState, action) {
  let index = 0;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOADING_DATA_PAGINATION:
      return {
        ...state,
        loadingPagination: true,
      };
    case SET_ALBUMS:
      if (state.albums.length > 0) {
        return {
          ...state,
          albums: [...state.albums, ...action.payload],
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          albums: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    case SET_SEARCH_ALBUMS:
      if (state.searchedAlbums.length > 0) {
        return {
          ...state,
          searchedAlbums: [...state.searchedAlbums, ...action.payload],
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          searchedAlbums: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    case SET_SEARCH_LIKED_ALBUMS: {
      if (state.searchedLikedAlbums.length > 0) {
        return {
          ...state,
          searchedLikedAlbums: [
            ...state.searchedLikedAlbums,
            ...action.payload,
          ],
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          searchedLikedAlbums: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    }
    case SET_SEARCH_LIKED_LINKS: {
      if (state.searchedLikedLinks.length > 0) {
        return {
          ...state,
          searchedLikedLinks: [...state.searchedLikedLinks, ...action.payload],
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          searchedLikedLinks: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    }
    case SET_SEARCH_ALBUM_DETAILS_LINKS: {
      if (
        state.album &&
        state.album.searchedLinks &&
        state.album.searchedLinks.length > 0
      ) {
        return {
          ...state,
          album: {
            ...state.album,
            searchedLinks: [...state.album.searchedLinks, ...action.payload],
          },
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          album: {
            ...state.album,
            searchedLinks: action.payload,
          },
          loading: false,
          loadingPagination: false,
        };
      }
    }
    case CLEAR_ALBUMS:
      return {
        ...state,
        albums: [],
      };
    case CLEAR_SEARCH_ALBUMS:
      return {
        ...state,
        searchedAlbums: [],
      };
    case CLEAR_SEARCH_LIKED_ALBUMS:
      return {
        ...state,
        searchedLikedAlbums: [],
      };
    case CLEAR_SEARCH_LIKED_LINKS:
      return {
        ...state,
        searchedLikedLinks: [],
      };
    case CLEAR_SEARCH_ALBUM_DETAILS_LINKS: {
      if (
        state.album &&
        state.album.searchedLinks &&
        state.album.searchedLinks.length > 0
      ) {
        return {
          ...state,
          album: {
            ...state.album,
            links: [...state.album.links],
            searchedLinks: [],
          },
        };
      } else {
        return {
          ...state,
        };
      }
    }
    case SET_ALBUM:
      if (state.album && state.album.links && state.album.links.length > 0) {
        //this is to handle album detail link's pagination
        //here if true, action.payload contains the paginated links data
        return {
          ...state,
          album: {
            ...state.album,
            links: [...state.album.links, ...action.payload],
          },
          loading: false,
          loadingPagination: false,
        };
      } else {
        //else, action.payload contains the album detail's data as a whole
        return {
          ...state,
          album: action.payload,
        };
      }
    case CLEAR_ALBUM:
      return {
        ...state,
        album: {},
      };
    case SET_LIKED_ALBUMS:
      if (state.likedAlbums.length > 0) {
        return {
          ...state,
          likedAlbums: [...state.likedAlbums, ...action.payload],
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          likedAlbums: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    case SET_LIKED_LINKS:
      if (state.likedLinks.length > 0) {
        return {
          ...state,
          likedLinks: [...state.likedLinks, ...action.payload],
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          likedLinks: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    case CLEAR_LIKED_LINKS:
      return {
        ...state,
        likedLinks: [],
      };
    case CLEAR_LIKED_ALBUMS:
      return {
        ...state,
        likedAlbums: [],
      };
    case LIKE_ALBUM:
      //update only the album that is liked in the array index in redux
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload.albumID
      );
      state.albums[index] = action.payload;
      if (state.album && state.album.albumID === action.payload.albumID) {
        state.album.likeCount = action.payload.likeCount;
      }
      return {
        ...state,
      };
    case LIKE_LINK:
      //update only the link that is liked in the array index in redux
      //the array will be inside of album in state.data
      if (state.album.links) {
        index = state.album.links.findIndex(
          (link) => link.linkID === action.payload.linkID
        );
        state.album.links[index] = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_ALBUM:
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload
      );
      let likedAlbumIndex;
      if (state.likedAlbums.length > 0) {
        likedAlbumIndex = state.likedAlbums.findIndex(
          (album) => album.albumID === action.payload
        );
        state.likedAlbums.splice(likedAlbumIndex, 1);
      }
      if (state.album && state.album.albumID === action.payload) {
        state.album = {};
      }
      state.albums.splice(index, 1);
      return {
        ...state,
      };
    case DELETE_LINK:
      if (state.album && state.album.links) {
        index = state.album.links.findIndex(
          (link) => link.linkID === action.payload
        );
        console.log("album index", index);
        state.album.links.splice(index, 1);
      }
      let likedLinkIndex;
      if (state.likedLinks.length > 0) {
        likedLinkIndex = state.likedLinks.findIndex(
          (link) => link.linkID === action.payload
        );
        console.log("liked index", likedLinkIndex);
        state.likedLinks.splice(likedLinkIndex, 1);
      }
      return {
        ...state,
      };
    case ADD_ALBUM:
      return {
        ...state,
        albums: [action.payload, ...state.albums],
      };
    case SET_LINK:
      return {
        ...state,
        album: {
          ...state.album,
          links: [action.payload, ...state.album.links],
        },
      };
    case UPDATE_ONE_ALBUM:
      index = state.albums.findIndex(
        (album) => album.albumID === action.payload.albumID
      );
      state.albums[index] = action.payload;
      if (state.album) {
        state.album = action.payload;
      }
      return {
        ...state,
        loading: false,
      };
    case SET_ANOTHER_USER_PROFILE:
      if (state.anotherUserProfile && state.anotherUserProfile.albums) {
        return {
          ...state,
          anotherUserProfile: {
            user: { ...state.anotherUserProfile.user },
            albums: [
              ...state.anotherUserProfile.albums,
              ...action.payload.albums,
            ],
          },
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          anotherUserProfile: action.payload,
          loading: false,
          loadingPagination: false,
        };
      }
    case SET_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS:
      if (state.anotherUserProfile && state.anotherUserProfile.searchedAlbums) {
        return {
          ...state,
          anotherUserProfile: {
            ...state.anotherUserProfile,
            searchedAlbums: [
              ...state.anotherUserProfile.searchedAlbums,
              ...action.payload.searchedAlbums,
            ],
          },
          loading: false,
          loadingPagination: false,
        };
      } else {
        return {
          ...state,
          anotherUserProfile: {
            ...state.anotherUserProfile,
            searchedAlbums: action.payload.searchedAlbums,
          },
          loading: false,
          loadingPagination: false,
        };
      }
    case CLEAR_ANOTHER_USER_PROFILE:
      return {
        ...state,
        anotherUserProfile: {},
      };
    case CLEAR_ANOTHER_USER_PROFILE_SEARCHED_ALBUMS: {
      if (state.anotherUserProfile && state.anotherUserProfile.searchedAlbums) {
        return {
          ...state,
          anotherUserProfile: {
            ...state.anotherUserProfile,
            searchedAlbums: [],
          },
        };
      }
    }
    case SET_FAILED_LINKS:
      return {
        ...state,
        failedLinks: [action.payload, ...state.failedLinks],
      };
    case CLEAR_FAILED_LINKS:
      return {
        ...state,
        failedLinks: [],
      };
    case REMOVE_ONE_FAILED_LINK:
      if (state.failedLinks.length > 0) {
        state.failedLinks.splice(0, 1);
      }
      return {
        ...state,
      };
    case TRACK_LINKS:
      return {
        ...state,
        numOfLinksUploaded: state.numOfLinksUploaded + 1,
      };
    case CLEAR_TRACKED_LINKS:
      return {
        ...state,
        numOfLinksUploaded: 0,
      };
    case REMOVE_SCROLL_LISTENER:
      return {
        ...state,
        scrollListener: false,
        loading: false,
        loadingPagination: false,
      };
    case RESET_SCROLL_LISTENER:
      return {
        ...state,
        scrollListener: true,
      };
    default:
      return state;
  }
}
