/*
 * @Author:litt
 * @Date: 2017-10-20
 * @Description: 自选股---实时股票指数
*/

<template>
  <ul class="share-index clearfix">
    <li class="share-index-li" :class="{'stock-up':shangzheng.indexRisePer > 0,'stock-down':shangzheng.indexRisePer < 0,'':shangzheng.indexRisePer == 0}" @click="linkTo(shangzheng.market, shangzheng.indexCode)">
      <p>上证指数</p>
      <div class="share-data clearfix">
        <div class="now-num">{{shangzheng.indexValue}}</div>
        <div class="change-num">
          <div>{{shangzheng.indexRisePer}}%</div>
          <div>{{shangzheng.indexRise}}</div>
        </div>
      </div>
    </li>
    <li class="share-index-li" :class="{'stock-up':shenzheng.indexRisePer > 0,'stock-down':shenzheng.indexRisePer < 0,'':shenzheng.indexRisePer == 0}" @click="linkTo(shenzheng.market, shenzheng.indexCode)">
      <p>深证成指</p>
      <div class="share-data clearfix">
        <div class="now-num">{{shenzheng.indexValue}}</div>
        <div class="change-num">
          <div>{{shenzheng.indexRisePer}}%</div>
          <div>{{shenzheng.indexRise}}</div>
        </div>
      </div>
    </li>
    <li class="share-index-li" :class="{'stock-up':chuangye.indexRisePer > 0,'stock-down':chuangye.indexRisePer < 0,'':chuangye.indexRisePer == 0}" @click="linkTo(chuangye.market, chuangye.indexCode)">
      <p>创业板指</p>
      <div class="share-data clearfix">
        <div class="now-num">{{chuangye.indexValue}}</div>
        <div class="change-num">
          <div>{{chuangye.indexRisePer}}%</div>
          <div>{{chuangye.indexRise}}</div>
        </div>
      </div>
    </li>
    <li class="share-index-li" :class="{'stock-up':hushen.indexRisePer > 0,'stock-down':hushen.indexRisePer < 0,'':hushen.indexRisePer == 0}" @click="linkTo(hushen.market, hushen.indexCode)">
      <p>沪深300</p>
      <div class="share-data clearfix">
        <div class="now-num">{{hushen.indexValue}}</div>
        <div class="change-num">
          <div>{{hushen.indexRisePer}}%</div>
          <div>{{hushen.indexRise}}</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { indexhangqing as INDEXHANGQING } from '@/config/indexhangqing.js'
export default {
  data () {
    return {
      shangzheng: { indexName: '上证指数', indexCode: '000001', market: 'SH', indexRisePer: '---', indexValue: '---', indexRise: '---' },
      shenzheng: { stkName: '深证指数', indexCode: '399001', market: 'SZ', indexRisePer: '---', indexValue: '---', indexRise: '---' },
      chuangye: { stkName: '创业板指', indexCode: '399006', market: 'SZ', indexRisePer: '---', indexValue: '---', indexRise: '---' },
      hushen: { stkName: '沪深300', indexCode: '000300', market: 'SH', indexRisePer: '---', indexValue: '---', indexRise: '---' }
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
    // 获取四大指数数据
    getIndex () {
      var that = this
      INDEXHANGQING.forEach(function (item, index, array) {
        that.$http.getIndexValue({
          stock_code: item.stock_code,
          market: item.market
        }).then(result => {
          var hqItemObj = JSON.parse(result.data.slice(6))
          switch (item.stock_code) {
            case '000001':
              Object.assign(that.shangzheng, {
                indexName: hqItemObj[0].stkName,
                indexRisePer: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                indexValue: parseFloat(hqItemObj[0].price).toFixed(2),
                indexRise: parseFloat(hqItemObj[0].zd).toFixed(2)
              })
              break
            case '399001':
              Object.assign(that.shenzheng, {
                indexName: hqItemObj[0].stkName,
                indexRisePer: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                indexValue: parseFloat(hqItemObj[0].price).toFixed(2),
                indexRise: parseFloat(hqItemObj[0].zd).toFixed(2)
              })
              break
            case '399006':
              Object.assign(that.chuangye, {
                indexName: hqItemObj[0].stkName,
                indexRisePer: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                indexValue: parseFloat(hqItemObj[0].price).toFixed(2),
                indexRise: parseFloat(hqItemObj[0].zd).toFixed(2)
              })
              break
            case '000300':
              Object.assign(that.hushen, {
                indexName: hqItemObj[0].stkName,
                indexRisePer: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                indexValue: parseFloat(hqItemObj[0].price).toFixed(2),
                indexRise: parseFloat(hqItemObj[0].zd).toFixed(2)
              })
              break
            default:
              break
          }
        })
      })
    },
    linkTo (sMarket, sCode) {
      window.location.href = `./stock.html#/stock/${sMarket}${sCode}`
    }
  }
}
</script>

