// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'), // 首页行情
    zxg: path.resolve(__dirname, '../dist/zxg.html'), //自选股页面
    periodicAnalysis: path.resolve(__dirname, '../dist/periodicAnalysis.html'), // 周期分析页面
    hotAnalysis: path.resolve(__dirname, '../dist/hotAnalysis.html'), // 热点分析页面
    investCalendar: path.resolve(__dirname, '../dist/investCalendar.html'), // 投资日历
    news: path.resolve(__dirname, '../dist/news.html'), // 资讯页面
    zxDetail: path.resolve(__dirname, '../dist/zxDetail.html'), // 资讯详情页面
    zxARFDetail: path.resolve(__dirname, '../dist/zxARFDetail.html'), // 阿尔法资讯详情页面
    stock: path.resolve(__dirname, '../dist/stock.html'),// 个股页面
    indexStock: path.resolve(__dirname, '../dist/indexStock.html'),// 四大指数个股页面
    companyPro: path.resolve(__dirname, '../dist/companyPro.html'),
    stockStructure: path.resolve(__dirname, '../dist/stockStructure.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9998,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 代理
    proxyTable: {
      '/hqapi': {
        // target: 'http://localhost:9998/',
        target: 'https://i.gtja.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/hqapi': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }

}
