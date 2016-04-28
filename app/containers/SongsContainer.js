import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSongsIfNeeded } from '../actions/playlists'
import { getPlayingSongId } from '../utils/PlayerUtils'
import {Songs} from '../components'

const propTypes = {
  isMobile: PropTypes.bool
}

class SongsContainer extends Component {

  render () {
    const { isMobile } = this.props
    if (isMobile) {
      return this.MobileSongs()
    }

    return <Songs {...this.props} />
  }

  MobileSongs () {
    return null
  }

}

SongsContainer.propTypes = propTypes

function mapStateToProps (state) {
  const { authed, entities, environment, navigator, player, playlists } = state
  const { height, isMobile } = environment
  const { songs, users } = entities
  const { query } = navigator.route
  const playingSongId = getPlayingSongId(player, playlists)

  const time = query && query.t ? query.t : null
  let playlist = query && query.q ? query.q : 'house'
  if (time) {
    playlist = `${playlist} - ${time}`
  }

  return {
    authed,
    height,
    isMobile,
    playingSongId,
    playlist,
    playlists,
    scrollFunc: fetchSongsIfNeeded.bind(null, playlist),
    songs,
    time,
    users
  }
}

export default connect(mapStateToProps)(SongsContainer)
