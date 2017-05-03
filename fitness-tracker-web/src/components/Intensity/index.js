import React from 'react'
import PropTypes from 'prop-types'
import Label from '../Label'
import { fullPercent } from '../../lib/number'
import './style.css'

const widthStyle = (value) => ({width: `${value.toFixed(0)}%`})

const Intensity = ({percentValue}) => {
  const value = fullPercent(percentValue)
  return (
    <div title='Intensity' className='run__widget'>
      <Label value={value.toFixed(0)} element='intensity' />
      <div className='progressbar'>
        <div style={widthStyle(value)} className='progressbar__gauge' />
      </div>
    </div>
  )
}

Intensity.propTypes = {
  // percentValue: number between 0 and 1 (inclusive)
  percentValue: PropTypes.number.isRequired
}

module.exports = Intensity
