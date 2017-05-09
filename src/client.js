import 'whatwg-fetch'
import 'vanilla-autofill-event'
import React from 'react'
import ReactDOM from 'react-dom'
import Analytics from 'analytics'
import { Provider } from 'react-redux'
import { match, applyRouterMiddleware, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { useScroll } from 'react-router-scroll'
import configureStore from './store'
import createRoutes from './routes'
import './base.scss'
import 'gsap'
import 'scrollmagic'
import 'imports-loader?define=>false!../node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

const initialState = window['__initial_state__'] || {}
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store)
const routes = createRoutes(store)
const mount = document.getElementById('app')

function render(routes) {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) console.error(error)

    if (process.env.NODE_ENV === 'development') {
      document.getElementById('app').style.display = 'block'
    }

    const loader = document.getElementById('loader')
    setTimeout(() => {
      const t = new TimelineMax({})
      window.scroll(0, 0)
      t.to(loader, 0.25, { opacity: 0 })
      t.set(loader, { display: 'none' })
    }, 1)
    Analytics.mount()
    ReactDOM.render(
      <Provider store={store} history={history}>
        <Router
          render={applyRouterMiddleware(useScroll())}
          {...renderProps}
        />
      </Provider>,
      mount
    )
  })
}

if (window['preloaded']) {
  render(routes)
} else {
  document.addEventListener('preload:done', () => render(routes))
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    const createRoutes = require('./routes')
    ReactDOM.unmountComponentAtNode(mount)
    render(createRoutes(store))
  })
  module.hot.accept('./content', () => {
    const createRoutes = require('./routes')
    ReactDOM.unmountComponentAtNode(mount)
    render(createRoutes(store))
  })
}

try {
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
    console.log(...[
      '\n %c Created by TODO %c TODO website here %c \n\n',
      'color: #fff; background: #112244; padding:5px 10px; font-size:12px',
      'color: #fff; background: #222; padding:5px 10px; font-size:12px',
      'background: #fff; padding:5px 0;',
    ])
  }
} catch (error) {}
