/* eslint-env mocha */
import expect from 'expect'
import * as actions from '../../app/actions/modal'
import * as types from '../../app/constants/ActionTypes'

describe('modal actions', () => {
  describe('changeModal', () => {
    it('should create action CHANGE_MODAL', () => {
      const modal = 200

      expect(actions.changeModal(modal)).toEqual({
        type: types.CHANGE_MODAL,
        modal
      })
    })
  })
})
