/* eslint-env mocha */
import expect from 'expect'
import * as actions from '../../app/actions/navigator'
import * as types from '../../app/constants/ActionTypes'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('navigator actions', () => {
  let store
  let browser = {
    one: 1,
    onpopstate: null,
    location: { hash: 'songs?q=drake' },
    history: { pushState: () => {} },
    e: {
      state: {
        route: { path: [ 'popstate' ] }
      }
    }
  }

  beforeEach(() => {
    store = mockStore({
      navigator: { route: { path: [] } }
    })
  })

  describe('changePath', () => {
    it('should create action CHANGE_PATH', () => {
      const route = {path: ['songs'], query: {q: 'drake'}}
      expect(actions.changePath(route)).toEqual({
        type: types.CHANGE_PATH, route
      })
    })
  })

  describe('initNavigator', () => {
    it('should set window.onpopstate handler', () => {
      store.dispatch(actions.initNavigator(browser))
      expect(typeof browser.onpopstate).toEqual('function')
    })

    it('should create action CHANGE_PATH when new location.hash', () => {
      store.dispatch(actions.initNavigator(browser))
      expect(store.getActions()[0]).toInclude({type: types.CHANGE_PATH})
    })

    it('should store route in history', () => {
      const spy = expect.spyOn(browser.history, 'pushState')
      store.dispatch(actions.initNavigator(browser))
      expect(spy).toHaveBeenCalled()
      expect.restoreSpies()
    })
  })

  describe('navigateBack', () => {
    it('should navigate to previous route in history', () => {
      browser.e.state.route = {path: ['navigateBack']}
      store.dispatch(actions.navigateBack(browser.e))
      expect(store.getActions()[0]).toInclude({
        type: types.CHANGE_PATH,
        route: browser.e.state.route
      })
    })
  })

  describe('navigateTo', () => {
    const route = {path: ['navigateTo']}

    it('should create action CHANGE_PATH with new route', () => {
      store.dispatch(actions.navigateTo(route))
      expect(store.getActions()[0]).toInclude({
        type: types.CHANGE_PATH,
        route
      })
    })

    it('should store route in history', () => {
      const spy = expect.spyOn(browser.history, 'pushState')
      store.dispatch(actions.navigateTo(route))
      expect(spy).toHaveBeenCalled()
      expect.restoreSpies()
    })
  })
})
