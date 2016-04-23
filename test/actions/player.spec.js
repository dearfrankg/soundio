/* eslint-env mocha */
import expect from 'expect'
import * as actions from '../../app/actions/player'
import * as types from '../../app/constants/ActionTypes'
import {CHANGE_TYPES} from '../../app/constants/SongConstants'
import {mockStore} from '../TestUtils'

describe('player actions', () => {
  describe('changeCurrentTime', () => {
    it('should create action CHANGE_CURRENT_TIME', () => {
      const time = 200
      expect(actions.changeCurrentTime(time)).toEqual({
        type: types.CHANGE_CURRENT_TIME, time
      })
    })
  })

  describe('changePlayingSong', () => {
    it('should create action CHANGE_PLAYING_SONG', () => {
      const songIndex = 10
      expect(actions.changePlayingSong(songIndex)).toEqual({
        type: types.CHANGE_PLAYING_SONG, songIndex
      })
    })
  })

  describe('changeSelectedPlaylists', () => {
    it('should add playlist if playlists are empty', () => {
      const playlists = []
      const playlist = 'house'
      expect(actions.changeSelectedPlaylists(playlists, playlist)).toEqual({
        type: types.CHANGE_SELECTED_PLAYLISTS,
        playlists: ['house']
      })
    })

    it('should add playlist if playlists are not empty', () => {
      const playlists = ['trance', 'dubstep']
      const playlist = 'house'
      expect(actions.changeSelectedPlaylists(playlists, playlist)).toEqual({
        type: types.CHANGE_SELECTED_PLAYLISTS,
        playlists: ['trance', 'dubstep', 'house']
      })
    })

    it('should move playlist to end if already in playlists', () => {
      const playlists = ['house', 'trance', 'dubstep']
      const playlist = 'house'
      expect(actions.changeSelectedPlaylists(playlists, playlist)).toEqual({
        type: types.CHANGE_SELECTED_PLAYLISTS,
        playlists: ['trance', 'dubstep', 'house']
      })
    })
  })

  describe('changeSong', () => {
    it('should go to the next song if the change type is NEXT there are enough songs in the current playlist', (done) => {
      const prevStore = {
        player: {currentSongIndex: 0, selectedPlaylists: ['house']},
        playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
      }
      const expectedActions = [
          {type: types.CHANGE_PLAYING_SONG, songIndex: 1}
      ]
      const store = mockStore(prevStore, expectedActions, done)
      store.dispatch(actions.changeSong(CHANGE_TYPES.NEXT))
    })

    it('should not go to the next song if the change type is NEXT there are not enough songs in the current playlist', (done) => {
      const prevStore = {
        player: {currentSongIndex: 3, selectedPlaylists: ['house']},
        playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
      }
      const expectedActions = []
      const store = mockStore(prevStore, expectedActions)
      store.dispatch(actions.changeSong(CHANGE_TYPES.NEXT))
      done()
    })

    it('should go to the previous song if the change type is PREV and the first song is not playing', (done) => {
      const prevStore = {
        player: {currentSongIndex: 3, selectedPlaylists: ['house']},
        playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
      }
      const expectedActions = [
        {type: types.CHANGE_PLAYING_SONG, songIndex: 2}
      ]
      const store = mockStore(prevStore, expectedActions, done)
      store.dispatch(actions.changeSong(CHANGE_TYPES.PREV))
    })

    it('should not go to the previous song if the change type is PREV and the first song is  playing', (done) => {
      const prevStore = {
        player: {currentSongIndex: 0, selectedPlaylists: ['house']},
        playlists: {house: {items: [{id: 1}, {id: 2}, {id: 3}, {id: 4}]}}
      }
      const expectedActions = []
      const store = mockStore(prevStore, expectedActions)
      store.dispatch(actions.changeSong(CHANGE_TYPES.PREV))
      done()
    })
  })

  describe('playSong', () => {
    const prevStore = {
      player: {
        currentSongIndex: null,
        selectedPlaylists: ['trance', 'dubstep']
      }
    }

    it('should create actions CHANGE_CURRENT_TIME, CHANGE_SELECTED_PLAYLISTS, CHANGE_PLAYING_SONG', (done) => {
      const expectedActions = [
        {type: types.CHANGE_CURRENT_TIME, time: 0},
        {type: types.CHANGE_SELECTED_PLAYLISTS, playlists: ['trance', 'dubstep', 'house']},
        {type: types.CHANGE_PLAYING_SONG, songIndex: 1}
      ]
      const store = mockStore(prevStore, expectedActions, done)
      store.dispatch(actions.playSong('house', 1))
    })
  })

  describe('toggleIsPlaying', () => {
    it('should create action TOGGLE_IS_PLAYING', () => {
      const isPlaying = true
      expect(actions.toggleIsPlaying(isPlaying)).toEqual({
        type: types.TOGGLE_IS_PLAYING,
        isPlaying
      })
    })
  })
})
