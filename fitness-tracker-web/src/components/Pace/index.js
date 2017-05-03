import React from 'react'
import PropTypes from 'prop-types'
import Label from '../Label'
import { to90Degree } from '../../lib/number'
import './style.css'

const tickStyle = (degrees) => ({transform: `rotate(${degrees}deg)`})

const rotateStyle = (value) => ({transform: `rotate(${value.toFixed(0)}deg)`})

const scaledRelation = (actualValue, targetValue) => {
  const factor = 0.6
  const scaledActualPace = actualValue * factor
  const scaledTargetPace = targetValue * factor
  const middle = scaledActualPace - scaledTargetPace
  return 2.5 * middle / scaledTargetPace
}

const Scale = () => (
  <div>
    <div style={tickStyle(-60)} className='clock__tick clock__tick--super-bad' />
    <div style={tickStyle(-30)} className='clock__tick clock__tick--bad' />
    <div style={tickStyle(0)} className='clock__tick clock__tick--neutral' />
    <div style={tickStyle(30)} className='clock__tick clock__tick--good' />
    <div style={tickStyle(60)} className='clock__tick clock__tick--super-good' />
  </div>
)

const Pace = ({actualValue, targetValue}) => {
  const deviation = scaledRelation(actualValue, targetValue)
  return (
    <div title='Pace' className='run__widget'>
      <Label value={actualValue.toFixed(1)} element='pace' modifier='actual' />
      <Label value={targetValue.toFixed(1)} element='pace' modifier='target' />
      <div className='clock'>
        <Scale />
        <div className='clock-needle' style={rotateStyle(to90Degree(deviation))}>
          <div className='clock-needle__origin' />
          <div className='clock-needle__pointer' />
        </div>
      </div>
    </div>
  )
}

Pace.propTypes = {
  // actualValue: number greater 0
  actualValue: PropTypes.number.isRequired,
  // targetValue: number greater 0
  targetValue: PropTypes.number.isRequired
}

module.exports = Pace
