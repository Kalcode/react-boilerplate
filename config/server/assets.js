import fetch from 'node-fetch'

export default function middleware(req, res, next) {
  if (process.env.NODE_ENV === 'development') return dev(req, res, next)
  if (process.env.NODE_ENV === 'production') return prod(req, res, next)
}

function dev(req, res, next) {
  const host = process.env.ENV_IP || '0.0.0.0'
  const port = 3001
  fetch(`http://${host}:${port}/dist/stats.json`)
    .then(res => res.json())
    .then(assets => extractAssets(assets))
    .then(() => next())
    .catch(e => console.error(e))
}

function prod(req, res, next) {
  const assets = require('../../build/dist/stats.json')
  extractAssets(assets)
  next()
}

function extractAssets(assets) {
  global.assets = { javascript: {}, styles: {} }
  const publicPath = assets.publicPath
  for (let key in assets.assetsByChunkName) {
    let things = assets.assetsByChunkName[key]
    things = Array.isArray(things) ? things : [things]
    things.forEach(thing => {
      if (thing.indexOf('hot-update') > -1) return
      if (thing.indexOf('map') > -1) return
      if (thing.indexOf('.js') > -1) {
        global.assets.javascript[key] = publicPath + thing
      }
      if (thing.indexOf('.css') > -1) {
        global.assets.styles[key] = publicPath + thing
      }
    })
  }
}
