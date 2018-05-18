/*
 * @Author: woden0415.wangdong
 * @Date: 2017-12-19 13:57:03
 * @Description: 首部菜单
*/

module.exports = (function () {
  return {
    topMenus: [
      {
        'message': '行情',
        'dropDownList': [
          { 'message': '行情中心', 'src': '/index.html' },
          { 'message': '自选股', 'src': '/zxg.html' }
        ]
      },
      {
        'message': '资讯',
        'dropDownList': [
          { 'message': '资讯', 'src': '/news.html' },
          { 'message': '投资日历', 'src': '/investCalendar.html' }
        ]
      },
      {
        'message': '发现',
        'dropDownList': [
          { 'message': '牛人牛股', 'src': '/nrng.html' },
          { 'message': '策略选股', 'src': '/clxg.html' }
        ]
      },
      {
        'message': '交易',
        'dropDownList': [
          { 'message': '金融商城', 'src': '/mall.html' },
          { 'message': '股票交易', 'src': '/stockTrade.html' }
        ]
      }
    ],
    topMenusBuild: [
      {
        'message': '行情',
        'dropDownList': [
          { 'message': '行情中心', 'src': './index.html' },
          { 'message': '自选股', 'src': './zxg.html' }
        ]
      },
      {
        'message': '资讯',
        'dropDownList': [
          { 'message': '资讯', 'src': './news.html' },
          { 'message': '投资日历', 'src': './investCalendar.html' }
        ]
      },
      {
        'message': '发现',
        'dropDownList': [
          { 'message': '牛人牛股', 'src': 'http://nrng.gtja.com/nrngWeb/resources/nrng/main.html' },
          { 'message': '量化选股', 'src': 'https://q.gtja.com' }
        ]
      },
      {
        'message': '交易',
        'dropDownList': [
          { 'message': '金融商城', 'src': 'https://mall.gtja.com' },
          { 'message': '股票交易', 'src': './stockTrade.html' }
        ]
      }
    ]
  }
})()
