import React from 'react'
import options from '../../src/modernizr'
import Preloader from './preloader'
import google from './google'
import typekit from './typekit'
const { uglify, modernizr } = global

let compiled
modernizr.build(options, result => {
  const opts = { fromString: true }
  compiled = uglify.minify(result, opts).code
})

export default class Asdf {
  static headAssets(props) {
    return [
      this.modernizr(props),
      this.hidden(props),
      this.css(props),
      this.storeState(props),
      this.preloader(props),
      this.googleAnalytics(props),
    ]
  }

  static bodyAssets(props) {
    return [
      typekit(),
      this.dll(props),
      this.script(props),
    ]
  }

  static modernizr() {
    return <script dangerouslySetInnerHTML={{ __html: compiled }} key='modernizr' />
  }

  static hidden() {
    if (process.env.NODE_ENV === 'production') return
    const style = '#app { display: none; }'
    return <style dangerouslySetInnerHTML={{ __html: style }} key='hide' />
  }

  static css({ assets: { styles } }) {
    return Object.keys(styles).map((style, key) => {
      return <link rel='stylesheet' href={styles[style]} />
    })
  }

  static googleAnalytics() {
    if (process.env.NODE_ENV === 'development') return
    return <script dangerouslySetInnerHTML={{__html: google}} key='ga' />
  }

  static preloader({ assets, images }) {
    const script = Preloader.script(assets, images)
    return <script dangerouslySetInnerHTML={{ __html: script }} key='preload' />
  }

  static storeState({ store }) {
    const data = JSON.stringify(store.getState())
    const script = `window['__initial_state__'] = ${data};`
    return <script key='state' dangerouslySetInnerHTML={{ __html: script }} />
  }

  static dll({ assets }) {
    if (process.env.NODE_ENV === 'production') return
    return <script key='dll' src='/dlls/dll__vendor.js' />
  }

  static script({ assets: { javascript } }) {
    return <script key='script' src={javascript.preloader} />
  }
}
