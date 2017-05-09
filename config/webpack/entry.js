import path from 'path'

const host = process.env.ENV_IP || '0.0.0.0'
const port = 3001

export const development = {
  main: [
    'babel-polyfill',
    `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
    path.join(__dirname, '..', '..', 'src', 'client'),
  ],
  preloader: [
    path.join(__dirname, '..', '..', 'src', 'preload'),
  ],
}

export const production = {
  main: [
    'babel-polyfill',
    path.join(__dirname, '..', '..', 'src', 'client'),
  ],
  preloader: [
    path.join(__dirname, '..', '..', 'src', 'preload'),
  ],
}

export const dll = {
  vendor: [
    'autobind-decorator',
    'babel-polyfill',
    'component-emitter',
    'gsap',
    'html-entities',
    'invariant',
    'lodash',
    'querystring-es3',
    'react',
    'react-dom',
    'react-helmet',
    'react-redux',
    'react-router',
    'react-router/es',
    'react-router-redux',
    'react-router-scroll',
    'redux',
    'scrollmagic',
  ],
}
