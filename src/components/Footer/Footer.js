import React from 'react'
import PropTypes from 'prop-types'

export default function Footer({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

Footer.propTypes = {
  children: PropTypes.any,
}
