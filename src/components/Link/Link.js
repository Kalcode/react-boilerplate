import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, match } from 'react-router'
import bind from 'autobind-decorator'
import createRoutes from '../../routes'

/**
 * A <Link /> is used an enhanced React Router Link. This Component
 * will render a plain anchor tag when the Link is external. This
 * Link will also prefetch anything in getComponent for a given route.
 * This provides a smoother experience for the user.
 *
 */
export default class PrefetchLink extends Component {
  static propTypes = {
    to: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onTouchStart: PropTypes.func,
  }

  state = { checked: false }

  @bind onMouseEnter(event) {
    this.prefetchRoute()
    if (this.props.onMouseEnter) this.props.onMouseEnter(event)
  }

  @bind onTouchStart(event) {
    this.prefetchRoute()
    if (this.props.onTouchStart) this.props.onTouchStart(event)
  }

  prefetchRoute() {
    if (!this.state.checked) {
      const routes = createRoutes()
      const location = { pathname: this.props.to }
      const checked = true
      match({ routes, location }, (e, r, pr) => this.setState({ checked }))
    }
  }

  get internal() {
    if (typeof window === 'undefined') return true
    const parser = document.createElement('a')
    parser.href = this.props.to
    return parser.host === window.location.host
  }

  internalLink() {
    const { props, onMouseEnter, onTouchStart } = this
    return <Link {...props} onMouseEnter={onMouseEnter} onTouchStart={onTouchStart} />
  }

  externalLink() {
    const { to, ...rest } = this.props
    return <a href={to} {...rest} />
  }

  render() {
    return this.internal ? this.internalLink() : this.externalLink()
  }
}
