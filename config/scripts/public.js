import fs from 'fs-extra'
import path from 'path'

const root = path.resolve(__dirname, '..', '..')
const src = path.resolve(root, 'src', 'public')
const dest = path.resolve(root, 'build')

fs.copySync(src, dest)
