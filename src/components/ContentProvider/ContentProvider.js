import React, { Children, cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'

import content from 'content'

export default class ContentProvider extends PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }

  default = 'en'

  get locale() {
    if (typeof window === 'undefined') return 'en'
    else if (navigator.languages) return navigator.languages[0]
    else if (navigator.userLanguage) return navigator.userLanguage
    else if (navigator.browserLanguage) return navigator.browserLanguage
    else if (navigator.language) return navigator.language
    else return this.default
  }

  get content() {
    const userLang = this.locale.toLowerCase()
    const langauges = Object.keys(content)
    const locale = langauges.includes(userLang) ? userLang : this.default
    return Object.assign(content[this.default], content[locale])
  }

  get children() {
    return Children.map(this.props.children, (child, key) => {
      return cloneElement(child, { content: this.content })
    })
  }

  render() {
    return (
      <div>
        {this.children}
      </div>
    )
  }
}
