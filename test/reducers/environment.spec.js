/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/environment'
import * as types from '../../app/constants/ActionTypes'

describe('environment reducer', () => {
  const initialState = {
    isMobile: false,
    height: null,
    width: null
  }

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle CHANGE_IS_MOBILE', () => {
    const action = {
      type: types.CHANGE_IS_MOBILE,
      isMobile: true
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      isMobile: action.isMobile
    })
  })

  it('should handle CHANGE_WIDTH_AND_HEIGHT', () => {
    const action = {
      type: types.CHANGE_WIDTH_AND_HEIGHT,
      height: 500,
      width: 500
    }
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      height: action.height,
      width: action.width
    })
  })
})
