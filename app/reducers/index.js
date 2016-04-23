import { combineReducers } from 'redux'
import counter from './counter'
import authed from './authed'
import entities from './entities'
import environment from './environment'
import modal from './modal'
import navigator from './navigator'
import player from './player'
import playlists from './playlists'

const rootReducer = combineReducers({
  authed,
  counter,
  entities,
  environment,
  modal,
  navigator,
  player,
  playlists
})

export default rootReducer
