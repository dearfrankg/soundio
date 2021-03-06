import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getPlayingSongId } from '../utils/PlayerUtils'
import {
  Player
} from '../components'

const propTypes = {
  isMobile: PropTypes.bool,
  playingSongId: PropTypes.number
}

class PlayerContainer extends Component {

  render () {
    const { isMobile, playingSongId } = this.props
    if (isMobile) {
      return this.MobilePlayer()
    }

    if (playingSongId === null) {
      return <div />
    }

    return <Player {...this.props} />
  }

  MobilePlayer () {
    return null
  }

}

PlayerContainer.propTypes = propTypes

function mapStateToProps (state) {
  const { entities, environment, player, playlists } = state
  const { isMobile } = environment
  const { songs, users } = entities
  const playingSongId = getPlayingSongId(player, playlists)

  return {
    isMobile,
    player,
    playingSongId,
    playlists,
    songs,
    users
  }
}

export default connect(mapStateToProps)(PlayerContainer)
