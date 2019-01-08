const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const withLess = require('@zeit/next-less');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const lessToJS = require('less-vars-to-js');

if (typeof require !== 'undefined') {
  require.extensions['.less'] = () => { };
}

const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './asserts/antd-custom.less'),
    'utf8'
  )
)

module.exports = withBundleAnalyzer(withLess({
  lessLoaderOptions: { javascriptEnabled: true, modifyVars: themeVariables },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: { analyzerMode: 'static', reportFilename: '../bundles/server.html' },
    browser: { analyzerMode: 'static', reportFilename: './bundles/client.html' }
  },
  webpack: (config) => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
    config.optimization = config.optimization || {}
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|antd|@ant-design|core-js)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        }
      }
    }
    return config
  }
}))
