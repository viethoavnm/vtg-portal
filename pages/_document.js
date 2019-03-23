import React from 'react'
import NextDocument, { Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context)
    const { req: { locale, localeDataScript } } = context
    return {
      ...props,
      locale,
      localeDataScript
    }
  }

  render() {
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${this.props.locale}`
    return (
      <html>
        <Head>
          <link rel='stylesheet' href='/static/grid.min.css' />
          <link rel='stylesheet' href='/static/custom.css' />
          <link rel="icon" type="image/png" href="/static/images/logo.png" />
          <link href="https://fonts.googleapis.com/css?family=Charmonman" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&ampsubset=vietnamese" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700&amp;subset=vietnamese" rel="stylesheet" />
          <title>Spetrip.com - Đặt khách sạn, homestay giá rẻ</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}