var path = require('path')
var utils = require('./utils')
var webpack=require('webpack')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    index: './src/pages/hangqing/index.js', // 首页页面
    zxg: './src/pages/hangqing/zxg.js', // 自选股页面
    investCalendar: './src/pages/news/investCalendar.js', //投资者日历页面
    news: './src/pages/news/news.js',// 资讯页面
    periodicAnalysis: './src/pages/news/periodicAnalysis.js',// 周期分析页面
    hotAnalysis: './src/pages/news/hotAnalysis.js',// 热点分析页面
    stock: './src/pages/stock/stock.js',// 个股页面
    indexStock: './src/pages/stock/indexStock.js',// 四大指数个股页面
    zxARFDetail: './src/pages/others/zxARFDetail.js',// 阿尔法资讯详情
    zxDetail: './src/pages/others/zxDetail.js',// 资讯详情
    companyPro: './src/pages/stock/companyPro.js',
    stockStructure: './src/pages/stock/stockStructure.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    vue: 'window.Vue',
    'element-ui': 'window.ELEMENT'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'jquery': path.resolve(__dirname, '../node_modules/jquery/src/jquery')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "windows.jQuery":"jquery",
      raty:"raty"
    })
  ]
}
