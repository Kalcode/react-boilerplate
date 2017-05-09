import path from 'path'

const host = process.env.ENV_IP || '0.0.0.0'
const port = 3001

export const development = {
  path: path.resolve(__dirname, '..', '..', 'build', 'dist'),
  filename: '[name].js',
  chunkFilename: '[name].chunk.js',
  publicPath: `http://${host}:${port}/dist/`,
}

export const production = {
  path: path.resolve(__dirname, '..', '..', 'build', 'dist'),
  publicPath: '/dist/',
  filename: '[name].[chunkhash].js',
  chunkFilename: '[name].[chunkhash].chunk.js',
}

export const dll = {
  path: path.resolve(__dirname, '..', '..', 'build', 'dlls'),
  filename: 'dll__[name].js',
  library: 'DLL_[name]_[hash]',
}
