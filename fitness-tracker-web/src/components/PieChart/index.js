import React from 'react'
import PropTypes from 'prop-types'
import { fullPercent } from '../../lib/number'
import './style.css'

const PieChart = ({radius, stroke, percent, modifier}) => {
  const radFactor = radius * 2 * 3.14159
  const partCircle = radFactor * fullPercent(percent)
  const fullCircle = radFactor * 100
  const strokeStyle = {
    strokeWidth: `${fullPercent(stroke)}%`,
    strokeDasharray: `${partCircle.toFixed(0)}% ${fullCircle.toFixed(0)}%`
  }
  return (
    <div className={`pie pie--${modifier}`}>
      <svg className={`pie__void pie__void--${modifier}`} width='100%' height='100%'>
        <circle
          r={`${radius * 100}%`}
          cx='50%'
          cy='50%'
          className={`pie__fill pie__fill--${modifier}`}
          style={strokeStyle}
        />
      </svg>
    </div>
  )
}

PieChart.propTypes = {
  // radius: radius of the stroke circle. Between 0 and 1 (inclusive)
  radius: PropTypes.number.isRequired,
  // stroke: width/thickness of the stroke. Between 0 and 1 (inclusive)
  stroke: PropTypes.number.isRequired,
  // percent: filling level in percentage. Between 0 and 1 (inclusive)
  percent: PropTypes.number.isRequired,
  // modifier: BEM modifier for custom styling
  modifier: PropTypes.string
}

PieChart.DefaultProps = {
  modifier: ''
}

module.exports = PieChart
