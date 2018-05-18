/*
 * @Author: duyun
 * @Date: 2018-01-06
 * @Description: k线图
*/

module.exports = (function () {
  return {
    charts: [
      {
        type: 'day',           /* 日k */
        label: '日k',
        name: 'RK',
        chartData: 'RK',
        chartID: 'RK',
        sliderId: 'sliderRK'
      },
      {
        type: 'week',         /* 周k */
        label: '周k',
        name: 'ZK',
        chartData: 'ZK',
        chartID: 'ZK',
        sliderId: 'sliderZK'
      },
      {
        type: 'month',         /* 月k */
        label: '月k',
        name: 'YK',
        chartData: 'YK',
        chartID: 'YK',
        sliderId: 'sliderYK'
      }
    ]
  }
})()
