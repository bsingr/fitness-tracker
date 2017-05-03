import React from 'react'
import Run from '../Run'
import PropTypes from 'prop-types'
import './style.css'

const LoadingIndicator = () => (
  <div className='loadingindicator'>
    <div className='loadingindicator-bubble1' />
    <div className='loadingindicator-bubble2' />
    <p>Loading...</p>
  </div>
)

class Page extends React.Component {
  componentDidMount () {
    this.props.fetchRuns().then((runs) => {
      this.setState({runs})
    })
  }

  renderMainBlock () {
    if (this.state && this.state.runs) {
      return this.state.runs.map((run, i) => <Run run={run} key={i} />)
    } else {
      return <LoadingIndicator />
    }
  }

  render () {
    return (
      <div>
        <header className='topbar'>
          <div className='logo'>
            <span className='yellow'>Run</span>
            <span className='white'>Monitor</span>
          </div>
          <div className='info'>
            <a href='http://jotaen.net/oBPhB/run-monitor'>What is this?</a>
            <a href='https://github.com/jotaen/run-monitor'>Github</a>
          </div>
        </header>
        <main>
          { this.renderMainBlock() }
        </main>
      </div>
    )
  }
}

Page.propTypes = {
  // fetch: a function that returns a Promise
  fetchRuns: PropTypes.func.isRequired
}

module.exports = Page
