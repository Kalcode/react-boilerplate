import React from 'react'
import ReactDOM from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import createStore from '../../src/store'
import Html from '../../src/html'
import { syncHistoryWithStore } from 'react-router-redux'
import createHistory from 'react-router/lib/createMemoryHistory'
import { Provider } from 'react-redux'
import createRoutes from '../../src/routes'
import Preloader from 'preloader'

function render(request, response) {
  const location = request.originalUrl
  const memoryHistory = createHistory(location)
  const initialState = {}
  const store = createStore(initialState, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store, {})
  const routes = createRoutes(store)

  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      response.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error) {
      console.error('ROUTER ERROR:', error)
      response.status(500)
    }

    if (renderProps.params && renderProps.params.splat) {
      response.status(404)
    }

    let data
    try {
      data = Preloader.render(() => {
        return ReactDOM.renderToString(
          <Provider store={store} history={history}>
            <RouterContext {...renderProps} />
          </Provider>
        )
      })
    } catch (error) {
      data = { html: '', images: [] }
      console.error('ERROR:', error)
    }

    const { html, images } = data
    const page = ReactDOM.renderToStaticMarkup(
      <Html
        assets={global.assets}
        images={images}
        html={html}
        store={store}
      />
    )
    if (!response.statusCode) response.status(200)
    response.send('<!doctype html>\n' + page)
    response.end()
  })
}

module.exports = render
global.render = render

const memoryHistory = createHistory('/')
const store = createStore({}, memoryHistory)
const routes = createRoutes(store)
global.routes = routes
