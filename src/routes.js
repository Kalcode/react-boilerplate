import React from 'react'
import { IndexRoute, Route } from 'react-router'
import App from 'containers/App'
import Home from 'containers/Home'

export default function createRoutes(store) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route
        path='test'
        getComponent={gc(() => System.import('containers/Test'))}
      />
      <Route
        path='thank-you'
        getComponent={gc(() => System.import('containers/ThankYou'))}
      />
      <Route
        path='*'
        getComponent={gc(() => System.import('containers/NotFound'))}
      />
    </Route>
  )
}

function gc(func) {
  return (next, cb = () => {}) => func().then((c) => cb(null, c))
}
