/*
 * @Author:duyun
 * @Date: 2017-09-20
 * @Description: 行情模板：上证指数/深证成指/沪深300/创业板指
*/

<template>
  <ul class="section-main clearfix">
    <li class="quote-box">
      <div class="quote-name"><a class="empty" :href="shangzheng.src">上证指数</a></div>
      <div class="quote-current" :class="{up: shangzheng.zd > 0, down: shangzheng.zd < 0}">
        <span class="empty">{{shangzheng.price}}&nbsp;&nbsp;&nbsp;{{shangzheng.zd}}&nbsp;({{shangzheng.zdPe}}%)</span>
      </div>
      <div class="quote-echart">
        <a :href="shangzheng.src">
          <div id="000001"></div>
        </a>
      </div>
      <div class="quote-value">
        <p class="empty">成交量:&nbsp;{{shangzheng.vol}}亿</p>
        <p>
          <span class="empty">高:&nbsp;{{shangzheng.high}}</span>&nbsp;&nbsp;
          <span class="empty">低:&nbsp;{{shangzheng.low}}</span>
        </p>
      </div>
    </li>
    <li class="quote-box">
      <div class="quote-name"><a class="empty" :href="shenzheng.src">深证成指</a></div>
      <div class="quote-current" :class="{up: shenzheng.zd > 0, down: shenzheng.zd < 0}">
        <span class="empty">{{shenzheng.price}}&nbsp;&nbsp;&nbsp;{{shenzheng.zd}}&nbsp;({{shenzheng.zdPe}}%)</span>
      </div>
      <div class="quote-echart">
        <a :href="shenzheng.src">
          <div id="399001"></div>
        </a>
      </div>
      <div class="quote-value">
        <p class="empty">成交量:&nbsp;{{shenzheng.vol}}亿</p>
        <p>
          <span class="empty">高:&nbsp;{{shenzheng.high}}</span>&nbsp;&nbsp;
          <span class="empty">低:&nbsp;{{shenzheng.low}}</span>
        </p>
      </div>
    </li>
    <li class="quote-box">
      <div class="quote-name"><a class="empty" :href="chuangye.src">创业板指</a></div>
      <div class="quote-current" :class="{up: chuangye.zd > 0, down: chuangye.zd < 0}">
        <span class="empty">{{chuangye.price}}&nbsp;&nbsp;&nbsp;{{chuangye.zd}}&nbsp;({{chuangye.zdPe}}%)</span>
      </div>
      <div class="quote-echart">
        <a :href="chuangye.src">
          <div id="399006"></div>
        </a>
      </div>
      <div class="quote-value">
        <p class="empty">成交量:&nbsp;{{chuangye.vol}}亿</p>
        <p>
          <span class="empty">高:&nbsp;{{chuangye.high}}</span>&nbsp;&nbsp;
          <span class="empty">低:&nbsp;{{chuangye.low}}</span>
        </p>
      </div>
    </li>
    <li class="quote-box">
      <div class="quote-name"><a class="empty" :href="hushen.src">沪深300</a></div>
      <div class="quote-current" :class="{up: hushen.zd > 0, down: hushen.zd < 0}">
        <span class="empty">{{hushen.price}}&nbsp;&nbsp;&nbsp;{{hushen.zd}}&nbsp;({{hushen.zdPe}}%)</span>
      </div>
      <div class="quote-echart">
        <a :href="hushen.src">
          <div id="000300"></div>
        </a>
      </div>
      <div class="quote-value">
        <p class="empty">成交量:&nbsp;{{hushen.vol}}亿</p>
        <p>
          <span class="empty">高:&nbsp;{{hushen.high}}</span>&nbsp;&nbsp;
          <span class="empty">低:&nbsp;{{hushen.low}}</span>
        </p>
      </div>
    </li>

  </ul>
</template>

<script>
import G2 from '@antv/g2'
import $ from 'jquery'
import { indexhangqing as INDEXHANGQING } from '@/config/indexhangqing.js'
export default {
  data () {
    return {
      shangzheng: { stkName: '上证指数', zd: 0, price: 0, zdPe: 0, sklineId: '000001', vol: '--', high: '--', low: '--' },
      shenzheng: { stkName: '深证成指', zd: '', price: '', zdPe: '', sklineId: '399001', vol: '--', high: '--', low: '--' },
      chuangye: { stkName: '创业板指', zd: '', price: '', zdPe: '', sklineId: '399006', vol: '--', high: '--', low: '--' },
      hushen: { stkName: '沪深300', zd: '', price: '', zdPe: '', sklineId: '000300', vol: '--', high: '--', low: '--' }
    }
  },
  mounted () {
    this.getIndexValue()
    var that = this
    setInterval(function () {
      that.getIndexValue()
    }, 5000)
  },
  methods: {
    getIndexValue: function () {
      var that = this
      INDEXHANGQING.forEach(function (item, index, array) {
        that.getChartData(item.market, item.stock_code)
      })
      INDEXHANGQING.forEach(function (item, index, array) {
        that.$http.getIndexValue({
          market: item.market,
          stock_code: item.stock_code
        }).then(result => {
          let hqItemObj = JSON.parse(result.data.slice(6))
          switch (item.stock_code) {
            case '000001':
              that.shangzheng = {
                stkName: hqItemObj[0].stkName,
                price: parseFloat(hqItemObj[0].price).toFixed(2),
                zdPe: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                zd: parseFloat(hqItemObj[0].zd).toFixed(2),
                vol: (parseFloat(hqItemObj[0].vol) / 100000000).toFixed(2),
                high: parseFloat(hqItemObj[0].high).toFixed(2),
                low: parseFloat(hqItemObj[0].low).toFixed(2),
                src: './indexStock.html#/stock/' + item.market + item.stock_code
              }
              break
            case '399001':
              that.shenzheng = {
                stkName: hqItemObj[0].stkName,
                price: parseFloat(hqItemObj[0].price).toFixed(2),
                zdPe: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                zd: parseFloat(hqItemObj[0].zd).toFixed(2),
                vol: (parseFloat(hqItemObj[0].vol) / 100000000).toFixed(2),
                high: parseFloat(hqItemObj[0].high).toFixed(2),
                low: parseFloat(hqItemObj[0].low).toFixed(2),
                src: './indexStock.html#/stock/' + item.market + item.stock_code
              }
              break
            case '399006':
              that.chuangye = {
                stkName: hqItemObj[0].stkName,
                price: parseFloat(hqItemObj[0].price).toFixed(2),
                zdPe: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                zd: parseFloat(hqItemObj[0].zd).toFixed(2),
                vol: (parseFloat(hqItemObj[0].vol) / 100000000).toFixed(2),
                high: parseFloat(hqItemObj[0].high).toFixed(2),
                low: parseFloat(hqItemObj[0].low).toFixed(2),
                src: './indexStock.html#/stock/' + item.market + item.stock_code
              }
              break
            case '000300':
              that.hushen = {
                stkName: hqItemObj[0].stkName,
                price: parseFloat(hqItemObj[0].price).toFixed(2),
                zdPe: (parseFloat(hqItemObj[0].zdPe) * 100).toFixed(2),
                zd: parseFloat(hqItemObj[0].zd).toFixed(2),
                vol: (parseFloat(hqItemObj[0].vol) / 100000000).toFixed(2),
                high: parseFloat(hqItemObj[0].high).toFixed(2),
                low: parseFloat(hqItemObj[0].low).toFixed(2),
                src: './indexStock.html#/stock/' + item.market + item.stock_code
              }
              break
            default:
              break
          }
        })
      })
    },
    getChartData: function (smarket, scode) {
      var charData = []
      var that = this
      that.$http.getSpline({
        market: smarket,
        stockCode: scode
      }).then(result => {
        $('#' + scode).empty()
        charData = result.data.mins
        charData.forEach(function (item, index, array) {
          item.id = index
        })
        let TIMEARR = []
        for (var i = 1; i < 241; i++) {
          TIMEARR.push({
            time: i
          })
        }
        TIMEARR.forEach(function (item, index, array) {
          for (var i = 0; i < TIMEARR.length; i++) {
            for (var j = 0; j < charData.length; j++) {
              if (TIMEARR[i].time === charData[j].id) {
                TIMEARR[i].price = charData[j].price
                TIMEARR[i].volume = charData[j].volume
                TIMEARR[i].amount = charData[j].amount
              }
            }
          }
        })
        that.drawChartFS(TIMEARR, scode)
      })
    },
    drawChartFS: function (data, sklineId) {
      function addData (shift) {}
      const chart = new G2.Chart({
        container: sklineId,
        forceFit: true,
        height: 200,
        padding: [20, 70, 10, 0],
        animate: false
      })
      /* K线 */
      const kView = chart.view({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 }
      })
      kView.source(data, {
        price: {
          tickCount: 5
        }
      }).axis('price', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return text
          }
        }
      }).axis('time', {
        line: {
          stroke: '#d0d0d0',
          lineWidth: 1
        },
        tickLine: null,
        label: null
      }).line().size(1).position('time*price').tooltip(false).color('#0055a2')

      /* 柱形图 */
      const barView = chart.view({
        start: { x: 0, y: 0.6 },
        end: { x: 1, y: 1 }
      })
      barView.source(data, {
        volume: {
          tickCount: 3
        }
      }).axis('volume', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return (parseFloat(text) / 1000000).toFixed(0) + 'M'
          }
        }
      }).axis('time', {
        label: null,
        tickLine: null
      }).interval()
      .position('time*volume').tooltip(false).color('#999')
      chart.render()
      let init = true
      setInterval(function () {
        if (init) { // 第一次载入数据
          for (let i = 1; i < 100; i++) {
            addData()
          }
          init = false
        }
        addData()
        chart.changeData(data) // 动态更新数据
      }, 1000)
    }
  }
}
</script>

<style lang="less">
@import '../../../../assets/less/commen/stockQuote.less';
</style>
