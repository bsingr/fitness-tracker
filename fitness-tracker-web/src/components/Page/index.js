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

const buildYearsFromRuns = (runs) => {
  const years = []
  runs.forEach(run => {
    const year = run.date.getFullYear();
    if (years.indexOf(year) === -1) {
      years.push(year)
    }
  })
  return years;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.setFilterYear = this.setFilterYear.bind(this);
  }
  componentDidMount () {
    this.props.fetchRuns().then((runs) => {
      const years = buildYearsFromRuns(runs).sort();
      this.setState({
        runs,
        years,
        filterYear: years[years.length - 1]
      })
      Promise.all(runs.map(run => {
        return this.props.fetchRunGeojson(run.id)
      })).then(runsGeojsons => {
        this.setState({runsGeojsons})
      })
    })
  }
  setFilterYear(e) {
    const filterYear = parseInt(e.target.text, 10);
    this.setState({filterYear});
  }

  renderFilterBlock() {
    if (this.state && this.state.years) {
      return (
        <div className="runfilter">
          {this.state.years.map(year => {
            return (
              <a key={year}
                href={`#${year}`}
                onClick={this.setFilterYear}
                className={`${year === this.state.filterYear ? 'active' : ''}`}>
                  {year}
              </a>
            )
          })}
        </div>
      )
    }
  }

  renderMainBlock () {
    if (this.state && this.state.runs) {
      return this.state.runs.filter(run => {
        return run.date.getFullYear() === this.state.filterYear
      }).map((run, i) => (
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
          { this.renderFilterBlock() }
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
