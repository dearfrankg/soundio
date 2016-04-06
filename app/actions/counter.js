import * as types from '../constants/ActionTypes'

function action (type, payload = {}) {
  return {type, ...payload}
}

export const increment = () => action(types.INCREMENT)
export const decrement = () => action(types.DECREMENT)
