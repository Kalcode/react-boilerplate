import path from 'path'
import express from 'express'
import assets from './assets'
const { render } = global

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(path.join(__dirname, '..', '..', 'build'), { index: false }))
  app.use(express.static(path.join(__dirname, '..', '..', 'src', 'public')))
} else {
  app.use(express.static(path.join(__dirname, '..', '..', 'build')))
}
app.use(assets)
app.use(render)

export default function createServer(port = 3000, callback = () => {}) {
  const server = app.listen(port, '0.0.0.0', (err) => {
    if (err) return console.error(err)
    console.info('==> 👻  render server listening on port %s', port)
    callback(server)
  })
  server.timeout = 10000
}
