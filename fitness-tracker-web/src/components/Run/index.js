import React from 'react'
import PropTypes from 'prop-types'
import Heading from './Heading'
import Distance from '../Distance'
import Pace from '../Pace'
import Intensity from '../Intensity'
import Time from '../Time'
import './style.css'

const Run = ({run}) => (
  <div className='run'>
    <Heading date={run.date} route={run.route} />
    <Distance actualValue={run.distance} targetValue={run.targetDistance} />
    <Pace actualValue={run.pace} targetValue={run.targetPace} />
    <Time actualValue={run.time} targetValue={run.targetTime} estimatedValue={run.estimatedTime} />
    <Intensity percentValue={run.intensity} />
  </div>
)

Run.propTypes = {
  run: PropTypes.shape({
    targetPace: PropTypes.number.isRequired,
    pace: PropTypes.number.isRequired,
    intensity: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    distance: PropTypes.number.isRequired,
    estimatedTime: PropTypes.number.isRequired,
    route: PropTypes.array.isRequired
  })
}

module.exports = Run
