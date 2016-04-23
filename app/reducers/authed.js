import * as types from '../constants/ActionTypes'

const initialState = {
  accessToken: null,
  followings: {},
  likes: {},
  newStreamSongs: [],
  playlists: [],
  user: null
}

export default function authed (state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ACCESS_TOKEN:
      return {...state,
        accessToken: action.accessToken
      }

    case types.RECEIVE_AUTHED_USER:
      return {...state,
        user: action.user
      }

    case types.RECEIVE_AUTHED_FOLLOWINGS:
      return {...state,
        followings: action.users
      }

    case types.RECEIVE_AUTHED_PLAYLISTS:
      return {...state,
        playlists: action.playlists
      }

    case types.RECEIVE_LIKES:
      return {...state,
        likes: action.likes
      }

    case types.RECEIVE_NEW_STREAM_SONGS:
      return {...state,
        newStreamSongs: [...action.songs, ...state.newStreamSongs]
      }

    case types.RESET_AUTHED:
      return {...initialState}

    case types.SET_FOLLOWING:
      return {...state,
        followings: {...state.followings,
          [action.userId]: action.following
        }
      }

    case types.SET_LIKE:
      return {...state,
        likes: {...state.likes,
          [action.songId]: action.liked
        }
      }

    case types.UNSHIFT_NEW_STREAM_SONGS:
      return {...state,
        newStreamSongs: []
      }

    default:
      return state
  }
}
