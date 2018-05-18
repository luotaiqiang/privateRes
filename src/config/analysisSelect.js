/*
 * @Author: duyun
 * @Date: 2018-02-03
 * @Description: 分析下拉框
*/

module.exports = (function () {
  return {
    level: [
      {
        value: '0',
        label: '个股'
      },
      {
        value: '1',
        label: '板块'
      },
      {
        value: '2',
        label: '指数'
      }
    ],
    type: [
      {
        value: '0',
        label: '每年某天'
      },
      {
        value: '2',
        label: '每年某月'
      },
      {
        value: '3',
        label: '某月某周'
      },
      {
        value: '4',
        label: '每月某周'
      },
      {
        value: '5',
        label: '每周周几'
      },
      {
        value: '6',
        label: '每年某季'
      },
      {
        value: '7',
        label: '重要节日'
      },
      {
        value: '8',
        label: '其他节日'
      }
    ],
    index: [
      {
        value: '',
        label: '全部'
      },
      {
        value: '006601',
        label: '上证指数'
      },
      {
        value: '006301',
        label: '创业板指'
      },
      {
        value: '399001',
        label: '深圳成指'
      },
      {
        value: '000300',
        label: '沪深300'
      },
      {
        value: '399006',
        label: '中小板指'
      }
    ],
    month: [
      {
        value: '1',
        label: '1月'
      },
      {
        value: '2',
        label: '2月'
      },
      {
        value: '3',
        label: '3月'
      },
      {
        value: '4',
        label: '4月'
      },
      {
        value: '5',
        label: '5月'
      },
      {
        value: '6',
        label: '6月'
      },
      {
        value: '7',
        label: '7月'
      },
      {
        value: '8',
        label: '8月'
      },
      {
        value: '9',
        label: '9月'
      },
      {
        value: '10',
        label: '10月'
      },
      {
        value: '11',
        label: '11月'
      },
      {
        value: '12',
        label: '12月'
      }
    ],
    week: [
      {
        value: '1',
        label: '第1周'
      },
      {
        value: '2',
        label: '第2周'
      },
      {
        value: '3',
        label: '第3周'
      },
      {
        value: '4',
        label: '第4周'
      },
      {
        value: '5',
        label: '第5周'
      }
    ],
    weekDay: [
      {
        value: '1',
        label: '周一'
      },
      {
        value: '2',
        label: '周二'
      },
      {
        value: '3',
        label: '周三'
      },
      {
        value: '4',
        label: '周四'
      },
      {
        value: '5',
        label: '周五'
      }
    ],
    quarter: [
      {
        value: '1',
        label: '第1季度'
      },
      {
        value: '2',
        label: '第2季度'
      },
      {
        value: '3',
        label: '第3季度'
      },
      {
        value: '4',
        label: '第4季度'
      }
    ]
  }
})()
