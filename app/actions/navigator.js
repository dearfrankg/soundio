import * as types from '../constants/ActionTypes'
import { constructUrl, parseUrl } from '../utils/RouteUtils'

let browser = null

export function changePath (route) {
  return {
    type: types.CHANGE_PATH,
    route
  }
}

export function initNavigator (env) {
  browser = env

  return (dispatch) => {
    browser.onpopstate = (e) => {
      dispatch(navigateBack(e))
    }

    if (browser.location.hash !== '') {
      dispatch(navigateTo(parseUrl(browser.location.hash)))
    }
  }
}

export function navigateBack (e) {
  return (dispatch) => {
    if (e.state) {
      return dispatch(navigateTo(e.state.route, false))
    }

    return null
  }
}

export function navigateTo (route, shouldPushState = true) {
  return (dispatch, getState) => {
    const { navigator } = getState()
    if (constructUrl(route) === constructUrl(navigator.route)) {
      return null
    }

    if (shouldPushState) {
      pushState(route)
    }

    return dispatch(changePath(route))
  }
}

function pushState (route) {
  browser.history.pushState({ route }, '', `#/${constructUrl(route)}`)
}
