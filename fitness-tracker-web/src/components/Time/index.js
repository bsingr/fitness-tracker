import React from 'react'

import PropTypes from 'prop-types'
import Label from '../Label'
import PieChart from '../PieChart'
import './style.css'

const timeString = (minutes) => {
  const h = Math.floor(minutes / 60)
  const mm = ('0' + Math.round(minutes % 60)).substr(-2)
  return h + ':' + mm
}

const Time = ({actualValue, targetValue, estimatedValue}) => {
  return (
    <div title='Time' className='run__widget'>
      <Label value={timeString(actualValue)} element='time' modifier='actual' />
      <Label value={timeString(targetValue)} element='time' modifier='target' />
      <Label value={timeString(estimatedValue)} element='time' modifier='estimated' />
      <PieChart radius={0.25} stroke={0.5} percent={actualValue / targetValue} modifier='time' />
    </div>
  )
}

Time.propTypes = {
  // actualValue: number greater than 0
  actualValue: PropTypes.number.isRequired,
  // targetValue: number greater than 0
  targetValue: PropTypes.number.isRequired,
  // estimatedValue: number greater than 0
  estimatedValue: PropTypes.number.isRequired
}

module.exports = Time
