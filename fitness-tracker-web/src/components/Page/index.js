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
      Promise.all(runs.map(run => {
        return this.props.fetchRunGeojson(run.id)
      })).then(runsGeojsons => {
        this.setState({runsGeojsons})
      })
    })
  }

  renderMainBlock () {
    if (this.state && this.state.runs) {
      return this.state.runs.map((run, i) => (
        <Run
          run={run}
          key={i}
          runGeojson={(this.state.runsGeojsons || [])[i]}
          mapboxToken={this.props.mapboxToken}
          />
      ))
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
            <a href='https://github.com/bsingr/fitness-tracker'>Github</a>
            <a href='http://leafletjs.com/'>Maps © Mapbox © OpenStreetMap</a>
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
  fetchRuns: PropTypes.func.isRequired,
  fetchRunGeojson: PropTypes.func.isRequired,
  mapboxToken: PropTypes.string.isRequired
}

module.exports = Page
