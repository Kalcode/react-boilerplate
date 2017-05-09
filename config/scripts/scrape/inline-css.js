import cheerio from 'cheerio'
import cssnano from 'cssnano'
import uncss from 'uncss'

export default function inlineCss(html) {
  return new Promise((resolve, reject) => {
    const options = createOptions(html)
    uncss(html, options, (error, output) => {
      if (error) console.error(error)

      cssnano.process(output, { discardComments: { removeAll: true } }).then(result => {
        const $ = cheerio.load(html)
        const inline = $(`<style>${result}</style>`)
        const sheet = $('link[rel="stylesheet"]')
        const href = sheet.attr('href')
        sheet.replaceWith(inline)
        const link = $(`<link rel='stylesheet' href=${href} />`)
        $('body').append(link)
        resolve($.html())
      })
    })
  })
}

function createOptions(html) {
  const $ = cheerio.load(html)
  const sheet = $('link[rel="stylesheet"]').attr('href')
  return {
    ignore: ['.no-js', /@font-face/],
    csspath: 'build',
    stylesheets: [sheet],
    report: false,
  }
}
