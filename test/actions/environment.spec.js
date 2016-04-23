/* eslint-env mocha */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import * as actions from '../../app/actions/environment'
import * as types from '../../app/constants/ActionTypes'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('environment actions', () => {
  describe('changeWidthAndHeight', () => {
    it('should create action CHANGE_WIDTH_AND_HEIGHT', () => {
      const height = 200
      const width = 300

      expect(actions.changeWidthAndHeight(height, width)).toEqual({
        type: types.CHANGE_WIDTH_AND_HEIGHT,
        height,
        width
      })
    })
  })

  describe('initEnvironment', () => {
    it('should create actions CHANGE_IS_MOBILE and CHANGE_WIDTH_AND_HEIGHT', () => {
      const browser = {
        navigator: {userAgent: 'Chrome'},
        innerHeight: 100,
        innerWidth: 100
      }
      const store = mockStore({})
      store.dispatch(actions.initEnvironment(browser))
      expect(store.getActions()[0]).toInclude({type: types.CHANGE_IS_MOBILE})
      expect(store.getActions()[1]).toInclude({type: types.CHANGE_WIDTH_AND_HEIGHT})
      expect(store.getActions()[0]).toIncludeKeys(['type', 'isMobile'])
      expect(store.getActions()[1]).toIncludeKeys(['type', 'height', 'width'])
    })
  })
})
