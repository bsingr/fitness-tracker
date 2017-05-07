import React from 'react'
import PropTypes from 'prop-types'

const formatDate = (date) => {
  return [
    (d) => d.toLocaleDateString('en-US', {weekday: 'long'}),
    (_) => ', ',
    (d) => d.toLocaleDateString('en-US', {day: 'numeric'}),
    (_) => '. ',
    (d) => d.toLocaleDateString('en-US', {month: 'long'}),
    (_) => ' ',
    (d) => 1900 + d.getYear(),
    (_) => ' – ',
    (d) => d.getHours(),
    (_) => ':',
    (d) => ('0' + d.getMinutes()).substr(-2)
  ].reduce((res, cb) => res.concat(cb(date)), '')
}

const Heading = ({date, route}) => (
  <div className='run__heading'>
    <div className='run__date'>{formatDate(date)}</div>
    <div className='run__route'>{route.join(' — ')}</div>
  </div>
)

Heading.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  route: PropTypes.array.isRequired
}

module.exports = Heading
