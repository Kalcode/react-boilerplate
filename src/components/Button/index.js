import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Link'
import styles from './styles'

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    to: PropTypes.string,
  }

  render() {
    const { children, to, ...rest } = this.props
    const Comp = to ? Link : 'button'
    return (
      <Comp to={to} className={styles.button} {...rest}>
        {children}
      </Comp>
    )
  }
}
