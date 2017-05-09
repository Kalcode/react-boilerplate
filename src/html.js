import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Loader from 'components/Loader'
import Asdf from 'asdf'

export default class HTML extends PureComponent {
  static propTypes = {
    html: PropTypes.string,
  }

  render() {
    const head = Helmet.rewind()
    const attrs = Object.assign({}, head.htmlAttributes.toComponent())

    const { html } = this.props

    return (
      <html {...attrs} className='no-js'>
        <head>
          <meta charSet='utf-8' />
          <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
          <meta content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no' name='viewport' />
          <meta name='format-detection' content='telephone=no' />
          {head.meta.toComponent()}
          {head.title.toComponent()}
          {head.base.toComponent()}
          {head.link.toComponent()}
          {Asdf.headAssets(this.props)}
        </head>
        <body>
          <div id='app' dangerouslySetInnerHTML={{__html: html}} />
          <Loader />
          {Asdf.bodyAssets(this.props)}
        </body>
      </html>
    )
  }
}
