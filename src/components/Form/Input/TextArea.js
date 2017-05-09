import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Autosize from 'react-textarea-autosize'
import bind from 'autobind-decorator'
import styles from './styles'

export default class TextArea extends PureComponent {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.func,
    label: PropTypes.string,
    required: PropTypes.bool,
  }

  state = {
    active: false,
    height: 50,
    value: '',
  }

  @bind onChange(event) {
    this.setState({value: event.target.value})
  }

  @bind onHeightChange(height) {
    this.setState({ height })
  }

  get inputProps() {
    const { textarea, id, values, label, ...rest } = this.props // eslint-disable-line
    return {
      ...rest,
      className: styles.input,
      id: id,
      name: id,
      onChange: this.onChange,
      onFocus: this.onFocus,
      onHeightChange: this.onHeightChange,
      type: 'text',
      value: this.state.value,
      minRows: 6,
    }
  }

  render() {
    const { label, required } = this.props

    return (
      <div className={styles.wrapper}>
        <Autosize
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
