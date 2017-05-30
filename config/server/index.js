require('../env')

function tryBundle() {
  try {
    require('../../build/dist/server.js')
    require('./server')()
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') console.error(e)
    setTimeout(tryBundle, 1000)
  }
}

if (process.env.NODE_ENV === 'production' || require('piping')({ hook: true })) {
  tryBundle()
}
