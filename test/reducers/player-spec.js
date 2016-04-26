/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/player'
import * as types from '../../app/constants/ActionTypes'

describe('player reducer', () => {
  const initialState = {
    currentSongIndex: null,
    currentTime: 0,
    isPlaying: false,
    selectedPlaylists: []
  }

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle CHANGE_CURRENT_TIME', () => {
    const action = {
      type: types.CHANGE_CURRENT_TIME,
      time: '11am'
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      currentTime: action.time
    })
  })

  it('should handle CHANGE_PLAYING_SONG', () => {
    const action = {
      type: types.CHANGE_PLAYING_SONG,
      songIndex: 11111
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      currentSongIndex: action.songIndex
    })
  })

  it('should handle CHANGE_SELECTED_PLAYLISTS', () => {
    const action = {
      type: types.CHANGE_SELECTED_PLAYLISTS,
      playlists: [11111, 22222]
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      selectedPlaylists: action.playlists
    })
  })

  it('should handle RESET_AUTHED', () => {
    expect(reducer(initialState, {})).toEqual({
      ...initialState
    })
  })

  it('should handle TOGGLE_IS_PLAYING', () => {
    const action = {
      type: types.TOGGLE_IS_PLAYING,
      isPlaying: true
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isPlaying: action.isPlaying
    })
  })
})
