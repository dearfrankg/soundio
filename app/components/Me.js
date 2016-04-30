import React, { Component, PropTypes } from 'react'
import { fetchSongsIfNeeded } from '../actions/playlists'
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants'
import {
  MePromptStream,
  MePromptLikes,
  SongCards
} from '../components'

const propTypes = {
  authed: PropTypes.object.isRequired,
  authedPlaylists: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired
}

class Me extends Component {

  getPlaylist () {
    const { authedPlaylists, route } = this.props
    const { path } = route

    switch (path[1]) {
      case 'stream':
        return 'stream'
      case 'likes':
        return 'likes'
      case 'playlists':
        if (path.length < 3 || !(path[2] in authedPlaylists)) {
          return 'playlists'
        }
        const playlist = authedPlaylists[path[2]]
        return playlist.title
      default:
        return 'stream'
    }
  }

  renderPrompt () {
    const { authed, dispatch, playlists } = this.props
    switch (this.getPlaylist()) {
      case 'stream':
        return (
          <MePromptStream
            authed={authed}
            dispatch={dispatch}
          />
        )
      case 'likes':
        return (
          <MePromptLikes
            authed={authed}
            dispatch={dispatch}
            playlists={playlists}
          />
        )
      default:
        return null
    }
  }

  render () {
    const {
      authed, dispatch, height, playingSongId, playlists, songs, users
    } = this.props
    const playlist = this.getPlaylist() + AUTHED_PLAYLIST_SUFFIX
    const scrollFunc = fetchSongsIfNeeded.bind(null, playlist)
    return (
      <div className='me'>
        {this.renderPrompt()}
        <div className='container'>
          <SongCards
            authed={authed}
            dispatch={dispatch}
            height={height}
            playingSongId={playingSongId}
            playlist={playlist}
            playlists={playlists}
            scrollFunc={scrollFunc}
            songs={songs}
            users={users}
          />
        </div>
      </div>
    )
  }

}

Me.propTypes = propTypes

export default Me
