import path from 'path'

function shim(name) {
  return path.resolve(__dirname, '..', 'shims', name)
}

const resolve = {
  modules: ['src', 'node_modules'],
  extensions: ['.js', '.scss'],
  mainFields: ['jsnext:main', 'main'],
  alias: {
    asdf: shim('asdf'),
    scrollmagic: shim('scrollmagic'),
    ScrollMagic: shim('scrollmagic'),
    analytics: shim('analytics'),
    preloader: shim('preloader'),
    RoundPropsPlugin: 'gsap/src/uncompressed/plugins/RoundPropsPlugin',
    TweenLite: 'gsap',
  },
}

export const development = resolve
export const production = resolve
export const dll = {
  extensions: ['.js'],
}
