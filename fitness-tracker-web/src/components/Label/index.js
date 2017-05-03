import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Label = ({value, element, modifier}) => {
  const bem = `label__${element} label--${modifier} label__${element}--${modifier}`
  return (
    <div className='label'>
      <div className={bem}>{value}</div>
    </div>
  )
}

Label.propTypes = {
  // value: the value that is displayed
  value: PropTypes.string.isRequired,
  // element: BEM element
  element: PropTypes.string.isRequired,
  // modifier: BEM modifier
  modifier: PropTypes.string
}

Label.defaultProps = {
  modifier: 'actual'
}

module.exports = Label
