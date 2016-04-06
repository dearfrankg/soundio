var webpack = require('webpack') // eslint-disable-line

module.exports = function (config) {
  config.set({
    // run in Chrome
    browsers: [ 'Chrome' ],
    // just run once by default
    singleRun: true,
    // use the mocha test framework
    frameworks: [ 'mocha' ],
    files: [
      // just load this file
      'tests.webpack.js'
    ],
    // preprocess with webpack and our sourcemap loader
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },
    // report results in this format
    reporters: [ 'dots' ],
    // kind of a copy of your webpack config
    webpack: {
      // just do inline source maps instead of the default
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { test: /\.js$/, loader: 'babel-loader' }
        ]
      }
    },
    webpackServer: {
      // please don't spam the console when running in karma!
      noInfo: true,
      stats: 'errors-only'

    }
  })
}
