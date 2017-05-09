import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Preloader from 'preloader'

export default class Image extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
  }

  render() {
    const { alt, src, ...rest } = this.props
    Preloader.preload(src)
    return (
      <img alt={alt} src={src} {...rest} />
    )
  }
}
