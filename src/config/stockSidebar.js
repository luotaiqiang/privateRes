/*
 * @Author: woden0415.wangdong
 * @Date: 2017-12-19 13:57:03
 * @Description: 个股侧边栏
*/

module.exports = (function () {
  return {
    stockSidebar: [
      {
        title: '公司概况',
        stockList: [
          {
            name: '公司简介',
            src: '/companyPro.html'
          },
          {
            name: '公司高管',
            src: 'javasctipt:;'
          },
          {
            name: 'IPO文件',
            src: 'javasctipt:;'
          }
        ]
      },
      {
        title: '股权信息',
        stockList: [
          {
            name: '股本结构',
            src: '/stockStructure.html'
          },
          {
            name: '主要股东',
            src: 'javasctipt:;'
          },
          {
            name: '流动股东',
            src: 'javasctipt:;'
          },
          {
            name: '基金持股',
            src: 'javasctipt:;'
          },
          {
            name: '高管持股',
            src: 'javasctipt:;'
          },
          {
            name: '股东户数',
            src: 'javasctipt:;'
          }
        ]
      },
      {
        title: '股权交易',
        stockList: [
          {
            name: '成交明细',
            src: 'javasctipt:;'
          },
          {
            name: '分价表',
            src: 'javasctipt:;'
          },
          {
            name: '大单统计',
            src: 'javasctipt:;'
          },
          {
            name: '大宗交易',
            src: 'javasctipt:;'
          },
          {
            name: '龙虎榜数据',
            src: 'javasctipt:;'
          },
          {
            name: '融资融券',
            src: 'javasctipt:;'
          }
        ]
      },
      {
        title: '财务数据',
        stockList: [
          {
            name: '业务报告',
            src: 'javasctipt:;'
          },
          {
            name: '主要财务指标',
            src: 'javasctipt:;'
          },
          {
            name: '资产负债表',
            src: 'javasctipt:;'
          },
          {
            name: '现金流量表',
            src: 'javasctipt:;'
          },
          {
            name: '所有者权益变动',
            src: 'javasctipt:;'
          }
        ]
      }
    ]
  }
})()
