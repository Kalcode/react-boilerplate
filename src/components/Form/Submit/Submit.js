import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import bind from 'autobind-decorator'
import styles from './styles'

export default class Submit extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    honeypot: PropTypes.string,
  }

  @bind onClick(event) {
    if (this.refs.honeypot.value) {
      event.preventDefault()
      document.location.href = '/thank-you/'
    }
  }

  get honeypot() {
    const { honeypot } = this.props
    return (
      <input
        type='text'
        id={honeypot}
        name={honeypot}
        style={{ transform: 'translateX(100vw)' }}
        ref='honeypot'
      />
    )
  }

  render() {
    const { children, honeypot } = this.props
    return (
      <div className={styles.container}>
        <button onClick={this.onClick} type='submit' className={styles.button}>
          {children}
        </button>
        {honeypot && this.honeypot}
      </div>
    )
  }
}
