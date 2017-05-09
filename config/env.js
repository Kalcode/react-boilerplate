require('babel-polyfill')
require('babel-register')({
  ignore: /node_modules|dist/,
})
global['uglify'] = require('uglify-js')
global['modernizr'] = require('modernizr')
if (process.env.NODE_ENV === 'development') require('piping')({ hook: true })
