import bind from 'autobind-decorator'
import Progress from './progress'

export default class PreLoader {
  static images = []
  static preload(url) {
    this.images.push(url)
  }

  static render(callback) {
    this.images = []
    const html = callback()
    return { html, images: this.images }
  }

  static script({ javascript }, images) {
    return `window.__preload_images__ = ${JSON.stringify(images)};window.__preload_script__ = ${JSON.stringify(javascript.main)};`
  }

  constructor(callback) {
    this.images = {}
    this.loaders = []
    this.callback = callback
  }

  load() {
    const images = window.__preload_images__ || []
    const script = window.__preload_script__
    const promises = images.map(this.loadImage)
    promises.push(this.loadScript(script))
    this.loaders.map(l => l.load())
    return Promise.all(promises).then(this.handleTween)
  }

  @bind loadImage(url) {
    return new Promise((resolve, reject) => {
      const progress = new Progress(url)
      progress.on('complete', resolve)
      progress.on('error', resolve)
      progress.on('progress', (e) => this.handleProgress(url, e))
      this.loaders.push(progress)
    })
  }

  loadScript(src) {
    return this.loadImage(src)
      .then(() => {
        const script = document.createElement('script')
        script.src = src
        document.body.appendChild(script)
      })
  }

  handleProgress(url, event) {
    const { total, loaded } = event
    this.images[url] = { total, loaded }
    setTimeout(() => this.handleTotal(), 1)
  }

  handleTotal() {
    let runningLoaded = 0
    let runningTotal = 0

    for (let key in this.images) {
      const { total, loaded } = this.images[key]
      runningTotal += total
      runningLoaded += loaded
    }

    const progress = runningLoaded / runningTotal || 1
    this.callback(progress)
  }
}
