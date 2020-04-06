'use strict'
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const utils = require('./utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const modelPath = resolve('src/vue-tab-router')

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/vue-tab-router/index.js'
  },
  output: {
    path: utils.assetsPath(''),
    // publicPath: '/'
    filename: 'index.js',
    library: 'TabRouter',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [modelPath],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [modelPath]
      },
      {
        test: /\.styl$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        },{
          loader: "stylus-loader"
        }],
        include: [modelPath]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    })
  ]
}
