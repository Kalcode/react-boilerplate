import Express from 'express'
import webpack from 'webpack'
import config from '../webpack'
const compiler = webpack(config)

const host = '0.0.0.0'
const port = 3001
const serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    assets: true,
    colors: true,
    chunks: false,
    errors: true,
    errorDetails: true,
    warnings: true,
  },
}

const app = new Express()
app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, function onAppListening(err) {
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port)
  }
})
