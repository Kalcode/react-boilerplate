import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import bind from 'autobind-decorator'
import styles from './styles'

export default class Select extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    id: PropTypes.string,
    input: PropTypes.func,
    label: PropTypes.string,
    required: PropTypes.bool,
  }

  state = {
    active: false,
    value: '',
  }

  @bind onChange(event) {
    this.setState({value: event.target.value})
  }

  get inputProps() {
    const { id, values, label, ...rest } = this.props // eslint-disable-line
    return {
      ...rest,
      value: this.state.value,
      onChange: this.onChange,
      onFocus: this.onFocus,
      className: styles.select,
      id: id,
      name: id,
      type: 'text',
    }
  }

  render() {
    const { children, label, required } = this.props
    return (
      <div className={styles.wrapper}>
        <label className={styles.label}>
          {required ? label + '*' : label}
        </label>
        <svg className={styles.svg} viewBox='0 0 24 24'>
          <path d='M0 7.33L2.829 4.5l9.175 9.339L21.171 4.5 24 7.33 12.004 19.5z' />
        </svg>
        <select
          {...this.inputProps}
        >
          <option value='' disabled defaultValue>Choose your option</option>
          {children}
        </select>
        <div className={styles.border} />
      </div>
    )
  }
}
