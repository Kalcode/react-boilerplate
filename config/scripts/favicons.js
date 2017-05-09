import rimraf from 'rimraf'
import path from 'path'
import fs from 'fs-extra'
import favicons from 'favicons'

const root = path.resolve(__dirname, '..', '..')
const source = path.join(root, 'src', 'public', 'favicon.png')
const options = {
  appName: null,
  appDescription: null,
  developerName: null,
  developerURL: null,
  background: '#fff',
  path: '/',
  display: 'standalone',
  orientation: 'portrait',
  start_url: '/?homescreen=1',
  version: '1.0',
  logging: false,
  online: false,
  preferOnline: false,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: { offset: 25 },
    favicons: true,
    firefox: true,
    windows: true,
    yandex: false,
  },
}

console.log('Generating Favicons')
rimraf.sync(path.join(root, 'build', 'favicons'))
fs.mkdirSync(path.join(root, 'build', 'favicons'))

favicons(source, options, (error, response) => {
  if (error) return console.error(error)

  const { images } = response
  const promises = []
  promises.push(images.map(write))

  Promise.all(promises).then(() => {
    console.log('Done Faviconing')
  })
})

function write({ name, contents }) {
  return new Promise((resolve, reject) => {
    const full = path.join(root, 'build', 'favicons', name)
    if (name === 'favicon.ico') fs.writeFileSync(path.join(root, 'build', name), contents)
    fs.writeFile(full, contents, (error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}
