import createServer from '../../server/server'
import routerToArray from 'react-router-to-array'
import Scraper from './Scraper'

const routes = routerToArray(global.routes)
routes.push('/404/')

function loadNext() {
  if (routes.length === 0) return Promise.resolve()
  const route = routes.splice(0, 1)[0]
  const scraper = new Scraper(route)
  return scraper.resolve().then(loadNext)
}

createServer(3002, server => {
  loadNext().then(() => server.close())
})
