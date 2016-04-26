/* eslint-env mocha */
import expect from 'expect'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../app/actions/songs'
import * as types from '../../app/constants/ActionTypes'
import { CLIENT_ID } from '../../app/constants/Config'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('songs actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchSongIfNeeded', () => {
    it('should create actions REQUEST_SONG, RECEIVE_SONG, RECEIVE_SONGS when needed ', () => {
      nock('https://api.soundcloud.com')
        .get('/tracks/608297')
        .query({
          client_id: CLIENT_ID
        })
        .reply(200, JSON.stringify({
          id: 608297,
          user_id: 258166,
          user: {
            id: 258166,
            kind: 'user'
          },
          waveform_url: 'https://w1.sndcdn.com/ddLJ9q56UdKm_m.png'
        }))

      const store = mockStore({
        entities: {
          songs: {
            608297: {
              id: 608297,
              user: 258166,
              title: 'in the house',
              waveform_url: ['json']
            }
          }
        },
        playlists: {}
      })
      const songId = 608297

      return store.dispatch(actions.fetchSongIfNeeded(songId))
        .then((res) => {
          expect(store.getActions()[0].type).toEqual('REQUEST_SONG')
          expect(store.getActions()[1].type).toEqual('RECEIVE_SONG')
          expect(store.getActions()[2].type).toEqual('RECEIVE_SONGS')
        })
    })

    /*
    TODO
    it('should create actions XXX when not needed', () => {
        Not possible to test as is because mutiple async actions get fired off
        and we have no way to tell when they are done.

        Should refactor to wrap with a Promise.all
    })
    */
  })

  describe('receiveSong', () => {
    it('should create action RECEIVE_SONG', () => {
      const entities = {users: {1: {name: 'zippy'}, 2: {name: 'tippy'}}}
      expect(actions.receiveSong(entities)).toEqual({
        type: types.RECEIVE_SONG,
        entities
      })
    })
  })
})
