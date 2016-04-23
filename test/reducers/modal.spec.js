/* eslint-env mocha */
import expect from 'expect'
import reducer from '../../app/reducers/modal'
import * as types from '../../app/constants/ActionTypes'

describe('modal reducer', () => {
  const initialState = null

  it('should handle initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle CHANGE_MODAL', () => {
    const action = {
      type: types.CHANGE_MODAL,
      modal: {modalName: 'login form'}
    }
    expect(reducer(initialState, action)).toEqual({
      ...action.modal
    })
  })
})
