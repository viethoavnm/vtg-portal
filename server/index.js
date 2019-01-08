const express = require('express')
const compression = require('compression')
const next = require('next')
const routes = require('./routes')
require('dotenv').config()

const IntlPolyfill = require('intl')
Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat

const { readFileSync } = require('fs')

const localeDataCache = new Map()
const getLocaleDataScript = (locale) => {
  const lang = locale.split('-')[0]
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
    const localeDataScript = readFileSync(localeDataFile, 'utf8')
    localeDataCache.set(lang, localeDataScript)
  }
  return localeDataCache.get(lang)
}
const getMessages = (locale) => {
  return require(`./lang/${locale}.json`)
}

const HTTP_PORT = parseInt(process.env.HTTP_PORT, 10) || 80

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()
    if (!dev) {
      server.use(compression())
    }

    server.get('*', (req, res) => {
      const locale = 'en-US';
      req.locale = locale
      req.localeDataScript = getLocaleDataScript(locale)
      req.messages = getMessages(locale)
      return handle(req, res)
    })
    server.listen(HTTP_PORT, (error) => {
      if (error) {
        process.exit(0)
        throw error
      }
      console.log('========================================')
      console.log('*          APP IS RUNNING...           *')
      console.log('*                         :: ' + HTTP_PORT + '.')
      console.log('========================================')
    })
  })

