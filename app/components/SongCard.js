import React, { Component, PropTypes } from 'react'
import { IMAGE_SIZES } from '../constants/SongConstants'
import { formatSongTitle } from '../utils/FormatUtils'
import { getImageUrl } from '../utils/SongUtils'
import {Link} from '../components'
import SongHeart from '../components/SongHeart'
import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer'

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

class SongCard extends Component {
  renderTogglePlayButton () {
    const { isActive, playSong } = this.props

    if (isActive) {
      return <TogglePlayButtonContainer />
    }

    return (
      <div className='toggle-play-button' onClick={playSong}>
        <i className='toggle-play-button-icon ion-ios-play' />
      </div>
    )
  }

  render () {
    const { authed, dispatch, isActive, song, user } = this.props
    const isLiked = Boolean(song.id in authed.likes && authed.likes[song.id] === 1)
    const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE)

    return (
      <div className={`card song-card ${(isActive ? ' active' : '')}`}>
        <div className='song-card-image' style={{ backgroundImage: `url(${image})` }}>
          {this.renderTogglePlayButton()}
        </div>
        <div className='song-card-user clearfix'>
          <img
            className='song-card-user-image'
            src={getImageUrl(user.avatar_url)}
          />
          <div className='song-card-details'>
            <Link
              className='song-card-title'
              dispatch={dispatch}
              route={{ path: ['songs', song.id] }}
              title={song.title}
            >
              {formatSongTitle(song.title)}
            </Link>
            <Link
              className='song-card-user-username'
              dispatch={dispatch}
              route={{ path: ['users', user.id] }}
              title={user.username}
            >
              {user.username}
            </Link>
            <SongHeart
              authed={authed}
              className='song-card-heart'
              dispatch={dispatch}
              isLiked={isLiked}
              songId={song.id}
            />
          </div>
        </div>
      </div>
    )
  }
}

SongCard.propTypes = propTypes

export default SongCard

/*
# Goes under last Link

<SongHeart
  authed={authed}
  className='song-card-heart'
  dispatch={dispatch}
  isLiked={isLiked}
  songId={song.id}
/>

*/
