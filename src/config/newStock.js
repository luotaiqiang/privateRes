/*
 * @Author: woden0415.wangdong
 * @Date: 2017-12-19 13:57:03
 * @Description: 行情指数
*/

module.exports = (function () {
  return {
    stockList: [
      {
        prop: 'stockName',
        label: '股票简称',
        className: 'color-default'
      },
      {
        prop: 'stockCode',
        label: '申购代码'
      },
      {
        prop: 'purchaseDate',
        label: '申购日期'
      },
      {
        prop: 'issueVol',
        label: '发行量(万)'
      },
      {
        prop: 'onlineIssueVol',
        label: '网上发行量(万)'
      },
      {
        prop: 'accuSubShrMax',
        label: '申购上限(万)'
      },
      {
        prop: 'iccPrc',
        label: '发行价'
      },
      {
        prop: 'announcementDate',
        label: '中签结果公告日'
      },
      {
        prop: 'pe',
        label: '市盈率'
      }
    ]
  }
})()
