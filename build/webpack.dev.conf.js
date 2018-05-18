var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'zxg.html',
      template: 'index.html',
      inject: true,
      chunks:['zxg']
    }),
    // 投资者日历页面
    new HtmlWebpackPlugin({
      filename: 'investCalendar.html',
      template: 'index.html',
      inject: true,
      chunks:['investCalendar']
    }),
    // 资讯页面
    new HtmlWebpackPlugin({
      filename: 'news.html',
      template: 'index.html',
      inject: true,
      chunks:['news']
    }),
    // 热点分析页面
    new HtmlWebpackPlugin({
      filename: 'hotAnalysis.html',
      template: 'index.html',
      inject: true,
      chunks:['hotAnalysis']
    }),
    // 周期分析页面
    new HtmlWebpackPlugin({
      filename: 'periodicAnalysis.html',
      template: 'index.html',
      inject: true,
      chunks:['periodicAnalysis']
    }),
    // 资讯详情页面
    new HtmlWebpackPlugin({
      filename: 'zxDetail.html',
      template: 'index.html',
      inject: true,
      chunks:['zxDetail']
    }),
    // 阿尔法资讯详情页面
    new HtmlWebpackPlugin({
      filename: 'zxARFDetail.html',
      template: 'index.html',
      inject: true,
      chunks:['zxARFDetail']
    }),
    // 个股页面
    new HtmlWebpackPlugin({
      filename: 'stock.html',
      template: 'index.html',
      inject: true,
      chunks:['stock']
    }),
    // 四大指数个股页面
    new HtmlWebpackPlugin({
      filename: 'indexStock.html',
      template: 'index.html',
      inject: true,
      chunks:['indexStock']
    }),
    new HtmlWebpackPlugin({
      filename: 'companyPro.html',
      template: 'index.html',
      inject: true,
      chunks:['companyPro']
    }),
    new HtmlWebpackPlugin({
      filename: 'stockStructure.html',
      template: 'index.html',
      inject: true,
      chunks:['stockStructure']
    }),
    new FriendlyErrorsPlugin()
  ]
})
