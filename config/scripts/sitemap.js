import fs from 'fs'
import path from 'path'
import config from '../../src/config'
import routerToArray from 'react-router-to-array'
import { createSitemap } from 'sitemap'

const routes = routerToArray(global.routes)
routes.push('/404/')

const sitemap = createSitemap({
  hostname: config.url,
  cachetime: 60000,
  urls: routes.map(r => {
    return {
      url: r,
      changefreq: 'monthly',
      priority: 0.5,
    }
  }),
})

const sitemapPath = path.join(__dirname, '..', '..', 'build', 'sitemap.xml')
fs.writeFileSync(sitemapPath, sitemap.toString())
