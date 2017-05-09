import inlineCss from './inline-css'
import inlinePreloader from './inline-preloader'

export default class Processor {
  constructor(html) {
    this.html = html
  }

  resolve() {
    return inlineCss(this.html)
      .then(inlinePreloader)
  }
}
