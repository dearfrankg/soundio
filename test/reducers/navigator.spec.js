/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/navigator'
import * as types from '../../app/constants/ActionTypes'

describe('navigator reducer', () => {
  const initialRoute = { path: ['songs'], query: { q: 'house' } }
  const initialState = { route: initialRoute }

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle CHANGE_PATH', () => {
    const action = {
      type: types.CHANGE_PATH,
      route: {path: 'playlists', q: 'sort=1'}
    }
    expect(reducer(initialState, action)).toEqual({
      route: action.route
    })
  })
})
