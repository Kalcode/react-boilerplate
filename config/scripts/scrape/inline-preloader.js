import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'

let preloader
export default function inlinePreloader(html) {
  const $ = cheerio.load(html)
  if (!preloader) savePreloader($)

  $('body script').last().replaceWith(`<script>${preloader}</script>`)
  return Promise.resolve($.html())
}

function savePreloader($) {
  const src = $('body script').last().attr('src')
  const preloaderPath = path.join(__dirname, '..', '..', '..', 'build', src)
  preloader = fs.readFileSync(preloaderPath).toString()
}
