/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/entities'
import * as types from '../../app/constants/ActionTypes'
import merge from 'lodash/merge'

describe('entities reducer', () => {
  const initialState = {
    playlists: {},
    songs: {},
    users: {}
  }

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle adding entities', () => {
    const action = {
      entities: {playlists: {playlist1: 1}}
    }
    expect(reducer(initialState, action)).toEqual(
      merge({}, initialState, action.entities)
    )
  })
})
