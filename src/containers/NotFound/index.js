import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { browserHistory } from 'react-router'
import Helmet from 'components/Helmet'

export default class NotFound extends PureComponent {
  static propTypes = {
    location: PropTypes.any,
  }

  componentWillMount() {
    const { location } = this.props
    if (typeof window !== 'undefined' && location.pathname.includes('index.html')) {
      const redirect = location.pathname.replace(/index.html/gi, '')
      browserHistory.push(redirect)
    }
  }

  render() {
    const { not_found } = this.props.content
    return (
      <main>
        <Helmet
          title={not_found.meta_title}
          description={not_found.meta_description}
        />
        <h1>Page Not Found</h1>
      </main>
    )
  }
}
