/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/playlists'
import * as types from '../../app/constants/ActionTypes'
import { AUTHED_PLAYLIST_SUFFIX } from '../../app/constants/PlaylistConstants'
import merge from 'lodash/merge'

const LIKES_PLAYLIST_KEY = `likes${AUTHED_PLAYLIST_SUFFIX}`
const STREAM_PLAYLIST_KEY = `stream${AUTHED_PLAYLIST_SUFFIX}`

describe('playlists reducer', () => {
  const initialState = {
    [LIKES_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null },
    [STREAM_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null }
  }

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle APPEND_LIKE', () => {
    const action = {
      type: types.APPEND_LIKE,
      action: 1
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      [LIKES_PLAYLIST_KEY]: playlist(initialState[LIKES_PLAYLIST_KEY], action)
    })
  })

  it('should handle RECEIVE_SONGS', () => {
    const action = {
      type: types.RECEIVE_SONGS,
      songs: [11111, 22222]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      [action.playlist]: playlist(initialState[action.playlist], action)
    })
  })

  it('should handle RECEIVE_NEW_STREAM_SONGS', () => {
    const action = {
      type: types.RECEIVE_NEW_STREAM_SONGS,
      action: 1
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      [STREAM_PLAYLIST_KEY]: playlist(initialState[STREAM_PLAYLIST_KEY], action)
    })
  })

  it('should handle REMOVE_UNLIKED_SONGS', () => {
    const action = {
      type: types.REMOVE_UNLIKED_SONGS,
      songs: [11111]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      [LIKES_PLAYLIST_KEY]: playlist(initialState[LIKES_PLAYLIST_KEY], action)
    })
  })

  it('should handle REQUEST_SONGS', () => {
    const action = {
      type: types.REQUEST_SONGS
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      [action.playlist]: playlist(initialState[action.playlist], action)
    })
  })

  it('should handle RESET_AUTHED', () => {
    const action = {
      type: types.RESET_AUTHED,
      playlists: {}
    }
    const resetedPlaylists = [...action.playlists, STREAM_PLAYLIST_KEY, LIKES_PLAYLIST_KEY]
    const newState = resetedPlaylists
      .reduce((obj, p) => merge({}, obj, { [p]: initialPlaylistState }), {})
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      newState
    })
  })

  it('should handle UNSHIFT_NEW_STREAM_SONGS', () => {
    const action = {
      type: types.UNSHIFT_NEW_STREAM_SONGS,
      songs: [11111],
      items: [11111]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      [STREAM_PLAYLIST_KEY]: playlist(initialState[STREAM_PLAYLIST_KEY], action)
    })
  })
})

const initialPlaylistState = {
  isFetching: false,
  items: [],
  futureUrl: false,
  nextUrl: false
}

function playlist (state = initialPlaylistState, action) {
  switch (action.type) {
    case types.APPEND_LIKE:
      return {...state,
        items: [action.songId, ...state.items]
      }

    case types.RECEIVE_SONGS:
      return {...state,
        isFetching: false,
        items: [...state.items, ...action.songs],
        futureUrl: action.futureUrl,
        nextUrl: action.nextUrl
      }

    case types.RECEIVE_NEW_STREAM_SONGS:
      return {...state,
        futureUrl: action.futureUrl
      }

    case types.REMOVE_UNLIKED_SONGS:
      return {...state,
        items: [...action.songs]
      }

    case types.REQUEST_SONGS:
      return {...state,
        isFetching: true, nextUrl: null
      }

    case types.UNSHIFT_NEW_STREAM_SONGS:
      return {...state,
        items: [...action.songs, ...state.items]
      }

    default:
      return state
  }
}
