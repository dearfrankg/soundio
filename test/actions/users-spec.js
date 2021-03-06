/* eslint-env mocha */
import expect from 'expect'
import nock from 'nock'
import * as actions from '../../app/actions/users'
import * as types from '../../app/constants/ActionTypes'
import {mockStore} from '../TestUtils'
import fetch from 'isomorphic-fetch' // eslint-disable-line

describe('users actions', () => {
  describe('fetchUserIfNeeded', () => {
    afterEach(() => {
      nock.cleanAll()
    })

    it('should not fetch if user is already loaded', (done) => {
      const store = mockStore({entities: {users: {100: {id: 100, description: 'foo'}}}}, [])
      store.dispatch(actions.fetchUserIfNeeded(100))
      done()
    })
  })

  describe('receiveUserFollowings', () => {
    it('should create RECEIVE_USER_FOLLOWINGS action', () => {
      const entities = {
        users: {
          1: {
            id: 1,
            followings: [2, 3, 4]
          },
          2: {id: 2},
          3: {id: 3},
          4: {id: 4}
        }
      }
      expect(actions.receiveUserFollowings(entities)).toEqual({
        type: types.RECEIVE_USER_FOLLOWINGS,
        entities
      })
    })
  })

  describe('receiveUser', () => {
    it('should create RECEIVE_USER action', () => {
      const entities = {users: {200: {id: 200, username: 'kygo'}}}
      expect(actions.receiveUser(entities)).toEqual({
        type: types.RECEIVE_USER, entities
      })
    })
  })

  describe('receiveUserProfiles', () => {
    it('should create RECEIVE_USER_PROFILES action', () => {
      const entities = {users: {1: {profiles: [{service: 'facebook'}, {service: 'twitter'}]}}}
      expect(actions.receiveUserProfiles(entities)).toEqual({
        type: types.RECEIVE_USER_PROFILES, entities
      })
    })
  })

  describe('requestUser', () => {
    it('should create REQUEST_USER action', () => {
      const userId = 200
      expect(actions.requestUser(userId)).toEqual({
        type: types.REQUEST_USER, userId
      })
    })
  })
})
