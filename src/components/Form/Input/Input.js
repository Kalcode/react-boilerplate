import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import bind from 'autobind-decorator'
import styles from './styles'

export default class Input extends PureComponent {
  static propTypes = {
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
      className: styles.input,
      id: id,
      name: id,
      type: 'text',
    }
  }

  render() {
    const { label, required } = this.props
    return (
      <div className={styles.wrapper}>
        <input
          {...this.inputProps}
        />
        <label className={this.state.value ? styles.used : styles.label}>
          {required ? label + '*' : label}
        </label>
        <div className={styles.border} />
      </div>
    )
  }
}
