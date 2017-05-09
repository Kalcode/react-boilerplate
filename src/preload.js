import Preloader from 'preloader'

let progress = 0
let current = 0
let download // eslint-disable-line
let step

setTimeout(() => {
  render()
  try {
    const preloader = new Preloader(callback)
    preloader.load().then(() => callback(1)).catch(() => callback(1))
  } catch (e) {
    callback(1)
  }
}, 1)

function callback(prog) {
  progress = prog
  if (prog === 1) {
    download = Date.now()
    step = ((500) / (1000 / 60) / 1000) * (1 - current)
    if (step > 0.04) step = 0.04
  }
}

function render() {
  if (current < 1) window.requestAnimationFrame(render)
  if (current >= progress) return

  const move = step || 0.01
  current += move

  if (current > 1) dispatch()
}

function dispatch() {
  try {
    window['preloaded'] = true
    document.dispatchEvent(new window.CustomEvent('preload:done'))
  } catch (e) {
    const script = document.createElement('script')
    script.src = window.__preload_script__
    document.body.appendChild(script)

    const event = document.createEvent('Event')
    event.initEvent('preload:done', true, true)
    document.dispatchEvent(event)
  }
}
