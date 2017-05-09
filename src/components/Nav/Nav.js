import React, { Component } from 'react'
import Link from 'components/Link'
import PropTypes from 'prop-types'
import styles from './styles'

export default class Nav extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  render() {
    const { pathname } = this.context.router.location
    return (
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to='/'>
              {pathname === '/' ? 'HOME' : 'home'}
            </Link>
          </li>
          <li>
            <Link to='/thank-you'>
              {pathname === '/thank-you' ? 'THANK YOU' : 'thank you'}
            </Link>
          </li>
          <li>
            <Link to='/test'>
              {pathname === '/test' ? 'TEST' : 'test'}
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}
