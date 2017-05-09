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

tryBundle()
