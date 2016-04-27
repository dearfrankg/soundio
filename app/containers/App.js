import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import { initAuth } from '../actions/authed'
import { initEnvironment } from '../actions/environment'
import { initNavigator } from '../actions/navigator'

import {
  MeContainer,
  ModalContainer,
  NavContainer,
  PlayerContainer,
  SongContainer,
  SongsContainer,
  UserContainer
} from './index'

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  isMobile: PropTypes.bool,
  path: PropTypes.array.isRequired
}

class App extends Component {

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(initEnvironment(window))
    dispatch(initAuth())
    dispatch(initNavigator(window))
  }

  renderContent () {
    const { path } = this.props
    switch (path[0]) {
      case 'songs':
        switch (path.length) {
          case 1:
            return <SongsContainer />
          case 2:
            return <SongContainer />
          default:
            return null
        }
      case 'users':
        return <UserContainer />
      case 'me':
        return <MeContainer />
      default:
        return null
    }
  }

  render () {
    const { width, height, isMobile } = this.props

    if (isMobile) {
      return this.renderMobile(width, height)
    }

    return (
      <div>
        <NavContainer />
        {this.renderContent()}
        <PlayerContainer />
        <ModalContainer />
      </div>
    )
  }

  renderMobile (width, height) {
    return (
      <div className='mobile' style={{ width: `${width}px`, height: `${height}px` }}>
        <PlayerContainer />
        {this.renderContent()}
        <NavContainer />
      </div>
    )
  }

}

App.propTypes = propTypes

function mapStateToProps (state) {
  const { environment, navigator } = state
  const { width, height, isMobile } = environment
  const { path } = navigator.route

  return {
    width,
    height,
    isMobile,
    path
  }
}

export default connect(mapStateToProps)(App)
