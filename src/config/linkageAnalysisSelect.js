/*
 * @Author: duyun
 * @Date: 2018-03-01
 * @Description: 个股联动分析下拉框
*/

module.exports = (function () {
  return {
    options1: [
      {
        value: '0',
        label: '全部'
      },
      {
        value: '1',
        label: '6个月'
      },
      {
        value: '2',
        label: '1年'
      },
      {
        value: '3',
        label: '5年'
      }
    ],
    options2: [
      {
        value: '3',
        label: '3日'
      },
      {
        value: '5',
        label: '5日'
      },
      {
        value: '10',
        label: '10日'
      }
    ],
    options4: [
      {
        value: '0',
        label: '小于'
      },
      {
        value: '1',
        label: '大于'
      },
      {
        value: '2',
        label: '之间'
      },
      {
        value: '3',
        label: '之外'
      }
    ]
    // options5: [
    //   {
    //     value: '0',
    //     label: '之前'
    //   },
    //   {
    //     value: '1',
    //     label: '之后'
    //   }
    // ],
    // options6: [
    //   {
    //     value: '0',
    //     label: '之前'
    //   },
    //   {
    //     value: '1',
    //     label: '之后'
    //   }
    // ]
  }
})()
