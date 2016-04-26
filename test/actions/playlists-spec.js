/* eslint-env mocha */
import expect from 'expect'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../app/actions/playlists'
import * as types from '../../app/constants/ActionTypes'
import { CLIENT_ID } from '../../app/constants/Config'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('playlist actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchSongs', () => {
    it('should create actions REQUEST_SONGS and RECEIVE_SONGS', () => {
      const store = mockStore({})
      const baseUrl = 'http://example.com'
      const urlPredicate = '/songs/'
      const fullUrl = baseUrl + urlPredicate
      const playlist = []

      nock(baseUrl)
        .get(urlPredicate)
        .reply(200, { collection: ['song1', 'song2'] })

      return store.dispatch(actions.fetchSongs(fullUrl, playlist))
        .then((res) => {
          const expectedActions = [
            { type: 'REQUEST_SONGS',
              playlist: []
            },
            { type: 'RECEIVE_SONGS',
              entities: {},
              futureUrl: null,
              nextUrl: null,
              playlist: [],
              songs: []
            }
          ]
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('fetchSongsIfNeeded', () => {
    it('should create actions REQUEST_SONGS and RECEIVE_SONGS when fetching', () => {
      nock('https://api.soundcloud.com')
        .get('/tracks')
        .query({
          linked_partitioning: 1,
          client_id: CLIENT_ID,
          limit: 50,
          offset: 0,
          tags: 'house'
        })
        .reply(200, { collection: ['song1', 'song2'] })

      const store = mockStore({
        authed: {accessToken: 'xxx'},
        playlists: []
      })

      return store.dispatch(actions.fetchSongsIfNeeded('house'))
        .then((res) => {
          const expectedActions = [
            { type: 'REQUEST_SONGS',
              playlist: 'house'
            },
            { type: 'RECEIVE_SONGS',
              entities: {},
              futureUrl: null,
              nextUrl: null,
              playlist: 'house',
              songs: []
            }
          ]
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })

  describe('receiveSongs', () => {
    it('should create action RECEIVE_SONGS', () => {
      const entities = {users: {1: {name: 'Ain\'t Nobody'}, 2: {name: 'Firestone'}}}
      const songs = [1, 2]
      const playlist = 'kygo'
      expect(actions.receiveSongs(entities, songs, playlist)).toEqual({
        type: types.RECEIVE_SONGS,
        entities,
        futureUrl: undefined,
        nextUrl: undefined,
        playlist,
        songs
      })
    })
  })

  describe('removeUnlikedSongsPre', () => {
    it('should create actions CHANGE_PLAYING_SONG and REMOVE_UNLIKED_SONGS', () => {
      const store = mockStore({
        authed: {
          accessToken: 'xxx',
          likes: {'foo': 1}
        },
        playlists: {
          'likes|authed': {items: ['foo']}
        },
        player: {
          currentSongIndex: 1,
          selectedPlaylists: ['house', 'likes|authed']
        }
      })

      store.dispatch(actions.removeUnlikedSongsPre())

      const expectedActions = [
        { type: 'CHANGE_PLAYING_SONG', songIndex: null },
        { type: 'REMOVE_UNLIKED_SONGS', songs: [ 'foo' ] }
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
