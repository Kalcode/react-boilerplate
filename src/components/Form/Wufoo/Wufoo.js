import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Wufoo extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
    id: PropTypes.string,
    idstamp: PropTypes.string,
    action: PropTypes.string,
  }

  render() {
    const { children, id, idstamp, action } = this.props
    return (
      <form
        id={id}
        name={id}
        action={`https://adagency.wufoo.com/forms/${action}/#public`}
        acceptCharset='UTF-8'
        encType='multipart/form-data'
        method='post'
        >
        {children}
        <input
          type='hidden'
          id='idstamp'
          name='idstamp'
          value={idstamp}
        />
      </form>
    )
  }
}
