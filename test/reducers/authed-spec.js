/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/authed'
import * as types from '../../app/constants/ActionTypes'

describe('authed reducer', () => {
  const initialState = {
    accessToken: null,
    followings: {},
    likes: {},
    newStreamSongs: [],
    playlists: [],
    user: null
  }

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle RECEIVE_ACCESS_TOKEN', () => {
    const action = {
      type: types.RECEIVE_ACCESS_TOKEN,
      accessToken: 'token'
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      accessToken: 'token'
    })
  })

  it('should handle RECEIVE_AUTHED_USER', () => {
    const action = {
      type: types.RECEIVE_AUTHED_USER,
      user: 12345
    }
    expect(reducer(initialState, {
      type: types.RECEIVE_AUTHED_USER,
      user: 12345
    })).toEqual({
      ...initialState,
      user: action.user
    })
  })

  it('should handle RECEIVE_AUTHED_FOLLOWINGS', () => {
    const action = {
      type: types.RECEIVE_AUTHED_FOLLOWINGS,
      users: {
        11111: 1,
        22222: 1
      }
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      followings: action.users
    })
  })

  it('should handle RECEIVE_AUTHED_PLAYLISTS', () => {
    const action = {
      type: types.RECEIVE_AUTHED_PLAYLISTS,
      playlists: [11111, 22222]
    }
    expect(reducer(initialState, {
      type: types.RECEIVE_AUTHED_PLAYLISTS,
      playlists: [11111, 22222]
    })).toEqual({
      ...initialState,
      playlists: action.playlists
    })
  })

  it('should handle RECEIVE_LIKES', () => {
    const action = {
      type: types.RECEIVE_LIKES,
      likes: {
        11111: 1,
        22222: 1
      }
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      likes: action.likes
    })
  })

  it('should handle RECEIVE_NEW_STREAM_SONGS', () => {
    const action = {
      type: types.RECEIVE_NEW_STREAM_SONGS,
      songs: [11111, 22222]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      newStreamSongs: [...action.songs, ...initialState.newStreamSongs]
    })
  })

  it('should handle RESET_AUTHED', () => {
    const action = {
      type: types.RESET_AUTHED
    }
    expect(reducer({}, action)).toEqual({
      ...initialState
    })
  })

  it('should handle SET_FOLLOWING', () => {
    const action = {
      type: types.SET_FOLLOWING,
      userId: 11111,
      following: [22222, 33333]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      followings: {...initialState.followings,
        [action.userId]: action.following
      }
    })
  })

  it('should handle SET_LIKE', () => {
    const action = {
      type: types.SET_LIKE,
      songId: 11111,
      liked: [22222, 33333]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      likes: {...initialState.likes,
        [action.songId]: action.liked
      }
    })
  })

  it('should handle UNSHIFT_NEW_STREAM_SONGS', () => {
    const action = {
      type: types.UNSHIFT_NEW_STREAM_SONGS
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      newStreamSongs: []
    })
  })
})
