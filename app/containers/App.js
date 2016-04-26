import React from 'react'
import {connect} from 'react-redux'
import * as counterActions from '../actions/counter'
import Header from '../components/Header'

export class App extends React.Component {

  render () {
    const {counter, increment, decrement} = this.props
    return (
      <div>
        <Header>Redux Starter App 2016</Header>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <div>{counter}</div>
        {this.Blocks(counter)}
      </div>
    )
  }

  Blocks (blocks) {
    if (blocks < 1) {
      return null
    }
    let results = []
    while (blocks--) {
      results.push(
        <div
          key={blocks}
          className='block'
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            background: 'palegreen',
            margin: '5px',
            border: '1px solid #ccc'
          }}>
        </div>)
    }
    return results
  }

}

export default connect((state) => ({
  counter: state.counter
}), {
  ...counterActions
})(App)
