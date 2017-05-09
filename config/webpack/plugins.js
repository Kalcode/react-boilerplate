import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import webpack from 'webpack'
import StatsPlugin from 'stats-webpack-plugin'
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import HardSourceWebpackPlugin from 'hard-source-webpack-plugin'

export const dll = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"development"',
  }),

  new webpack.DllPlugin({
    path: path.join(__dirname, '..', '..', 'build', 'dlls', '[name].json'),
    name: 'DLL_[name]_[hash]',
  }),
]

const manifest = path.resolve(__dirname, '..', '..', 'build', 'dlls', 'vendor.json')
if (!fs.existsSync(manifest)) stubManifest(manifest)
const needsDlls = process.env.NODE_ENV === 'development' && !process.env.SERVER
if (needsDlls) execSync('npm run build:dll')

function stubManifest(manifest) {
  try { fs.mkdirSync(path.resolve(__dirname, '..', '..', 'build')) } catch (e) {}
  try { fs.mkdirSync(path.resolve(__dirname, '..', '..', 'build', 'dlls')) } catch (e) {}
  fs.writeFileSync(manifest, '{}')
}

export const development = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.IgnorePlugin(/vertx/),
  new webpack.DllReferencePlugin({
    context: path.resolve(__dirname, '..', '..'),
    manifest: require(manifest),
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: path.resolve(__dirname, '..', '..'),
      wrap: { scss: { before: ['@import "~app.scss";'] } },
      postcss: webpack => {
        return [
          require('postcss-cssnext')({ browsers: ['last 2 versions', 'IE > 10'] }),
          require('postcss-reporter')({ clearMessages: true }),
          require('postcss-object-fit-images'),
        ]
      },
    },
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
  }),
  new StatsPlugin('stats.json'),
]

export const production = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) },
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      context: path.resolve(__dirname, '..', '..'),
      wrap: { scss: { before: ['@import "~app.scss";'] } },
      postcss: webpack => {
        return [
          require('postcss-cssnext')({ browsers: ['last 2 versions', 'IE > 10'] }),
          require('postcss-reporter')({ clearMessages: true }),
          require('postcss-object-fit-images'),
        ]
      },
    },
  }),
  new ExtractTextWebpackPlugin({ filename: '[name]-[contenthash].css', allChunks: true }),
  new webpack.optimize.OccurrenceOrderPlugin(true),
  new webpack.IgnorePlugin(/vertx/),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, comments: false, sourceMap: true }),
  new StatsPlugin('stats.json'),
  new HardSourceWebpackPlugin({
    cacheDirectory: '../../tmp/[confighash]',
    recordsPath: '../../tmp/[confighash]/records.json',
    configHash: config => require('node-object-hash')().hash(config),
  }),
]
