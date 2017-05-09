import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Preloader from 'preloader'

export default class ImageBackground extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    style: PropTypes.object,
  }

  render() {
    const { src, style, ...rest } = this.props
    Preloader.preload(src)
    const mergedStyle = Object.assign({ backgroundImage: `url('${src}')` }, style)
    return (
      <div style={mergedStyle} {...rest} />
    )
  }
}
