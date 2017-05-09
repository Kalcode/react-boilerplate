import path from 'path'
import webpack from 'webpack'
import StatsPlugin from 'stats-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'

export default function modifyConfig(config) {
  config.entry = {
    server: [
      path.join(__dirname, '..', 'server', 'entry.js'),
    ],
  }

  config.output.filename = 'server.js'
  config.target = 'node'

  config.module.loaders[3].loaders.shift() // css

  if (process.env.NODE_ENV === 'development') {
    config.devtool = 'source-map'
    config.watch = true

    config.module.loaders[0].loaders.shift() // scss
    const l = config.module.loaders[0].loaders[0].replace('css-loader', 'css-loader/locals')
    config.module.loaders[0].loaders[0] = l
  }

  if (process.env.NODE_ENV === 'production') {
    config.module.loaders[0] = {
      test: /\.s?css$/,
      exclude: /node_modules/,
      loaders: [
        'css-loader/locals?modules&camelCase&-autoprefixer&importLoaders=2',
        'postcss-loader',
        'sass-loader',
        'wrap-loader?scss',
      ],
    }
  }

  config.plugins = config.plugins.map(plugin => {
    if (plugin instanceof webpack.DllReferencePlugin) return
    if (plugin instanceof webpack.HotModuleReplacementPlugin) return
    if (plugin instanceof webpack.optimize.UglifyJsPlugin) return
    if (plugin instanceof StatsPlugin) return
    if (plugin instanceof ExtractTextWebpackPlugin) return
    return plugin
  }).filter(p => p)

  config.watchOptions = {
    ignored: /node_modules/,
  }

  config.node = {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: 'mock',
    __dirname: 'mock',
  }

  config.externals = {
    'uglify-js': 'uglify',
    'modernizr': 'modernizr',
  }

  return config
}
