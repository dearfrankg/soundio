import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Nav } from '../components/index'

const propTypes = {
  isMobile: PropTypes.bool
}

class NavContainer extends Component {
  render () {
    const { isMobile } = this.props
    if (isMobile) {
      return this.mobileNav()
    }

    return <Nav {...this.props} />
  }

  MobileNav () {
    return null
  }
}

function mapStateToProps (state) {
  const { authed, entities, environment, navigator } = state
  const { playlists, songs } = entities
  const { isMobile } = environment

  return {
    authed,
    authedPlaylists: playlists,
    isMobile,
    navigator,
    songs
  }
}

NavContainer.propTypes = propTypes

export default connect(mapStateToProps)(NavContainer)
