/*
 * @Author:duyun
 * @Date: 2018-01-29
 * @Description: 资讯模板：三大指数
*/

<template>
  <ul class="news-top clearfix">
    <li class="top-data">{{year}}年{{month}}月<br><i class="day">{{day}}日</i></li>
    <li >上证指数：<i :class="{up: valueList[0].stockZd > 0, down: valueList[0].stockZd < 0}">{{valueList[0].stockPrise}}</i></li>
    <li >深证成指：<i :class="{up: valueList[1].stockZd > 0, down: valueList[1].stockZd < 0}">{{valueList[1].stockPrise}}</i></li>
    <li >创业板指：<i :class="{up: valueList[2].stockZd > 0, down: valueList[2].stockZd < 0}">{{valueList[2].stockPrise}}</i></li>
    <li >沪深300：<i :class="{up: valueList[3].stockZd > 0, down: valueList[3].stockZd < 0}">{{valueList[3].stockPrise}}</i></li>
  </ul>
</template>

<script>
import { indexhangqing as INDEXHANGQING } from '@/config/indexhangqing.js'
export default {
  data () {
    return {
      year: '---',
      month: '---',
      day: '---',
      valueList: [
        {
          stockName: '上证指数',
          stockCode: '000001',
          stockZd: 0,
          stockPrise: 0
        },
        {
          stockName: '深证成指',
          stockCode: '399001',
          stockZd: 0,
          stockPrise: 0
        },
        {
          stockName: '创业板指',
          stockCode: '399006',
          stockZd: 0,
          stockPrise: 0
        },
        {
          stockName: '沪深300',
          stockCode: '000300',
          stockZd: 0,
          stockPrise: 0
        }
      ]
    }
  },
  mounted () {
    var that = this
    that.getIndex()
    setInterval(function () {
      that.getIndex()
    }, 5000)
  },
  methods: {
    getIndex () {
      var that = this
      INDEXHANGQING.forEach(function (item, index, array) {
        that.$http.getIndexValue({
          market: item.market,
          stock_code: item.stock_code
        }).then(result => {
          let hqItemObj = JSON.parse(result.data.slice(6))
          // 获取当前时间
          if (index === 1) {
            var curDate = hqItemObj[0].date
            that.year = curDate.substr(0, 4)
            that.month = curDate.substr(4, 2)
            that.day = curDate.substr(6, 2)
          }
          // 获取行情信息
          switch (hqItemObj[0].stkCode) {
            case '000001':
              that.valueList[0].stockZd = hqItemObj[0].zd
              that.valueList[0].stockPrise = parseFloat(hqItemObj[0].price).toFixed(2)
              break
            case '399001':
              that.valueList[1].stockZd = hqItemObj[0].zd
              that.valueList[1].stockPrise = parseFloat(hqItemObj[0].price).toFixed(2)
              break
            case '399006':
              that.valueList[2].stockZd = hqItemObj[0].zd
              that.valueList[2].stockPrise = parseFloat(hqItemObj[0].price).toFixed(2)
              break
            case '000300':
              that.valueList[3].stockZd = hqItemObj[0].zd
              that.valueList[3].stockPrise = parseFloat(hqItemObj[0].price).toFixed(2)
              break
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
.news-top{
  padding-top: 10px;
  margin: 25px 0 45px;
  li{
    float: left;
    text-align: right;
    padding: 10px 30px 0 0;
  }
  .top-data{
    font-weight: bold;
    padding-top: 0;
    .day{
      font-size: 20px;
    }
  }
}
</style>


