/*
 * @Author: woden0415.wangdong
 * @Date: 2017-12-19 13:57:03
 * @Description: 行情指数
*/

module.exports = (function () {
  return {
    indexhangqing: [
      {
        stock_code: '000001',    /* 上证指数 */
        market: 'SH'
      },
      {
        stock_code: '399001',    /* 深证成指 */
        market: 'SZ'
      },
      {
        stock_code: '399006',    /* 创业板指 */
        market: 'SZ'
      },
      {
        stock_code: '000300',    /* 沪深300 */
        market: 'SH'
      }
    ]
  }
})()
