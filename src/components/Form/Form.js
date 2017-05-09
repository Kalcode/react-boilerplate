import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Submit from './Submit'
import Wufoo from './Wufoo'

export default class Form extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    form: PropTypes.object,
    honeypot: PropTypes.string,
  }

  render() {
    const { children, form, honeypot } = this.props
    return (
      <div>
        <Wufoo
          action={form && form.action}
          id={form && form.id}
          idstamp={form && form.idstamp}
        >
          {children}
          <Submit honeypot={honeypot}>Send</Submit>
        </Wufoo>
      </div>
    )
  }
}
