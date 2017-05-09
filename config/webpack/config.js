import path from 'path'
import * as entry from './entry'
import * as output from './output'
import * as devtool from './devtool'
import * as resolve from './resolve'
import * as plugins from './plugins'
import * as moduleConfig from './module'
import server from './server'

const env = process.env.NODE_ENV

const config = {
  entry: entry[env],
  output: output[env],
  devtool: devtool[env],
  resolve: resolve[env],
  plugins: plugins[env],
  module: moduleConfig[env],
  target: 'web',
  context: path.resolve(__dirname, '..', '..'),
  stats: { children: false },
  profile: false,
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js'],
    mainFields: ['jsnext:main', 'main'],
  },
  performance: {
    hints: false,
  },
}

if (process.env.SERVER) server(config)
export default config
