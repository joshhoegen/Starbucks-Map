import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Theme = ({ children }) => <div className="app">{children}</div>

Theme.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
}

export default Theme
