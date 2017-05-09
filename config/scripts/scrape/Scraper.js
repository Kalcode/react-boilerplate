import fs from 'fs-extra'
import path from 'path'
import fetch from 'node-fetch'
import Processor from './Processor'

export default class Scraper {
  constructor(route) {
    this.route = route
  }

  get url() {
    return `http://0.0.0.0:3002${this.route}`
  }

  resolve() {
    console.log(`[scraper] fetching ${this.route}`)
    return fetch(this.url)
      .then(response => response.text())
      .then(html => {
        console.log(`[scraper] processing ${this.route}`)
        const processor = new Processor(html)
        return processor.resolve()
      })
      .then(content => {
        const build = path.resolve(__dirname, '..', '..', '..', 'build')
        const filePath = path.join(build, this.route, 'index.html')
        console.log(`[scraper] scraped ${this.route}`)
        fs.ensureDirSync(path.join(build, this.route))
        fs.writeFileSync(filePath, content)
      }).catch(e => console.error(e))
  }
}
