/*
 * @Author:duyun
 * @Date: 2017-11-24
 * @Description: 个股页面:右侧内容
*/

<template>
  <div>
    <!-- K线图 -->
    <div class="kline">
      <ul id="chartContainer" class="chart-tab clearfix">
        <li data-id="tab1" class="tab active">分时</li>
        <li data-id="tab2" class="tab">日K</li>
        <li data-id="tab3" class="tab">周K</li>
        <li data-id="tab4" class="tab">月K</li>
      </ul>
      <div class="chart-contianer">
        <div class="chart-panel" id="chart1">
          <div class="chart-left">
            <div id="FS" class="chart1"></div>
          </div>
          <sell-buy :item="sellBuyList"></sell-buy>
        </div>
        <div class="chart-panel" id="chart2">
          <div id="RK" class="chart2"></div>
          <div id="sliderRK" class="slider-chart2"></div>
        </div>
        <div class="chart-panel" id="chart3">
          <div id="ZK" class="chart3"></div>
          <div id="sliderZK" class="slider-chart3"></div>
        </div>
        <div class="chart-panel" id="chart4">
          <div id="YK" class="chart4"></div>
          <div id="sliderYK" class="slider-chart4"></div>
        </div>
      </div>
    </div>
    <!-- 公告 -->
    <div class="infomation">
      <el-tabs v-model="activeName" type="card" @tab-click="stockTabEvent">
       <!-- <el-tab-pane label="新闻" name="xw" >
          <info :infoList="newsList"></info>
        </el-tab-pane> -->
        <el-tab-pane label="研报" name="yb" id="yb">
          <info :infoList="researchList"></info>
        </el-tab-pane>
        <el-tab-pane label="宏观" name="gg" >
          <info :infoList="noticeList"></info>
        </el-tab-pane>
        <el-tab-pane label="周期分析" name="zqfx">
          <div class="note-des">投顾机器人根据当前个股历史涨跌数据，在选择的维度上统计过往股价表现，为您提供投资参考。</div>
          <zqfx-tab></zqfx-tab>
          <div class="note-des more-line">统计维度：指定每次统计股价涨跌的一个时间维度。<br> 统计次数：当前个股上市以来（近十年数据），在当前统计维度有股价涨跌的次数。<br>上涨次数：按当前统计维度，在所有统计次数中当前个股最终上涨的次数。<br>平均涨幅：所有统计次数中涨跌幅的平均值（所有涨跌幅求和然后除以统计次数）。<br>相对指数涨幅：上述平均涨幅减去所在市场指数（上证或者深证）平均涨幅，得到剔除大盘影响后的结果。</div>
        </el-tab-pane>
        <el-tab-pane label="联动分析" name="ldfx">
          <div class="note-des">投顾机器人根据当前个股历史涨跌数据，在设定的股价涨跌条件下，发现后续指定天数市场上表现较好的个股标的。</div>
          <ldfx-tab></ldfx-tab>
          <div class="note-des">关联标的：当前个股符合选定条件后，指定日期内表现较好的个股以及指数。<br>关联次数：当前个股符合选定条件后，指定日期内标的物有股价涨跌的次数。<br>上涨次数：在关联次数内，标的物价格最终上涨的次数。<br>平均涨幅：所有统计次数中涨跌幅的平均值（所有涨跌幅求和然后除以统计次数）。<br>相对指数涨幅：上述平均涨幅减去所在市场指数（上证或者深证）平均涨幅，得到剔除大盘影响后的结果。</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import kline from '@/config/kline.js'
Vue.use(kline)
import G2 from '@antv/g2'
import info from '@/components/commen/info.vue'
import $ from 'jquery'
import {timeArr as TIMEARR} from '@/config/klineTimer.js'
import zqfxTab from '@/components/pages/stock/zqfx.vue'
import ldfxTab from '@/components/pages/stock/ldfx.vue'
import sellBuy from '@/components/pages/stock/sellBuy.vue'
// var sellBuyListArr = []
export default {
  props: ['market', 'stkCode'],
  components: {
    info,
    zqfxTab,
    ldfxTab,
    sellBuy
  },
  data () {
    return {
      stockMain: [],
      // 公告初始展示板块
      activeName: 'yb',
      // 宏观数据初始化
      noticeList: [],
      // 新闻板块数据初始化
      // newsList: [],
      // 资讯研报数据初始化
      researchList: [],
      // 卖1-5 买1-5数据初始化
      sellBuyList: [],
      // k线图定时器
      kLineTimer: ''
    }
  },
  mounted () {
    let that = this
    that.initial()
    // 初始加载公告栏 研报数据
    that.getZXGInfoData()
    // 买卖数据
    that.getSellBuyData()
    // 买卖数据实时更新
    setInterval(function () {
      that.getSellBuyData()
    }, 10000)
  },
  watch: {
    stkCode () {
      let that = this
      $('.chart-tab .tab').removeClass('active')
      $('.chart-tab li[data-id="tab1"]').addClass('active')
      $('.chart-panel').hide()
      $('.chart1').empty()
      $('.slider-chart1').empty()
      $('#chart1').css('display', 'block')
      clearInterval(that.kLineTimer)
      console.log('a')
      that.getChartData('tab1')
      that.kLineTimer = setInterval(function () {
        that.getChartData('tab1')
      }, 30000)
      that.getSellBuyData()
    }
  },
  methods: {
    // 分时画图
    drawChartFS: function (data) {
      const chart = new G2.Chart({
        container: 'FS',
        forceFit: true,
        height: '400',
        padding: [20, 50, 20, 50],
        animate: false
      })
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li data-index={index}>' + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' + '{name}{value}</li>'
      })
      /* K线 */
      const kView = chart.view({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 }
      })
      kView.source(data, {
        price: {
          tickCount: 5
        },
        time: {
          tickCount: 3
        }
      }).axis('price', {
        position: 'left',
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
        tickLine: null
      }).axis('zf', {
        position: 'right',
        line: {
          stroke: '#d0d0d0',
          lineWidth: 1
        },
        tickLine: null
      }).line().size(1).position('time*price').color('#2F84CC')
      .tooltip('time*price', (time, price) => {
        return {
          name: time,
          value: '<br/><span style="padding-left: 16px">价格：' + price + '</span><br/>'
        }
      })
      kView.area().size(1).position('time*price').tooltip(false)

      /* 柱形图 */
      const barView = chart.view({
        start: { x: 0, y: 0.6 },
        end: { x: 1, y: 1 }
      })
      barView.source(data, {
        volume: {
          tickCount: 3
        }
      })
      .axis('volume', {
        position: 'left',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return (parseFloat(text) / 10000).toFixed(0) + '万'
          }
        }
      })
      .axis('time', {
        label: null,
        tickLine: null
      })
      .interval()
      .position('time*volume')
      .color('#2F84CC')
      .tooltip('time*volume', (time, volume) => {
        return {
          name: time,
          value: '<br/><span style="padding-left: 16px">成交量：' + volume + '</span><br/>'
        }
      })
      chart.render()
    },
    // 画图初始化
    initial: function () {
      $('.chart-pane').hide()
      $('.chart-pane#chart1').show()
      var that = this
      clearInterval(that.kLineTimer)
      that.getChartData('tab1')
      that.kLineTimer = setInterval(function () {
        that.getChartData('tab1')
      }, 30000)
      // @TODO 使用事件委托
      $('#chartContainer').on('click', '.tab', function () {
        $('.chart-tab .tab').removeClass('active')
        var curIndex = $(this).index() + 1
        $('.chart-tab li[data-id="tab' + curIndex + '"]').addClass('active')
        $('.chart-panel').hide()
        $('.chart' + curIndex).empty()
        $('.slider-chart' + curIndex).empty()
        $('#chart' + curIndex).css('display', 'block')
        that.getChartData('tab' + curIndex)
        // if (curIndex === 1) {
        //   setInterval(function () {
        //     that.getChartData('tab1')
        //   }, 30000)
        // }
      })

      /* for (var i = 1; i < 5; i++) {
        (function (i) {
          $('#chartContainer li[data-id="tab' + i + '"]').on('click', function () {
            $('.chart-tab .tab').removeClass('active')
            $('.chart-tab li[data-id="tab' + i + '"]').addClass('active')
            $('.chart-panel').hide()
            $('.chart' + i).empty()
            $('.slider-chart' + i).empty()
            $('#chart' + i).css('display', 'block')
            that.getChartData('tab' + i)
            if (i === 1) {
              setInterval(function () {
                that.getChartData('tab1')
              }, 30000)
            }
          })
        })(i)
      } */
    },
    // 画图请求数据（日、周、月）
    getChartData: function (dataType) {
      var that = this
      var temp = []
      if (dataType === 'tab1') {
        var charDataFS = []
        that.$http.getSpline({
          market: that.market,
          stockCode: that.stkCode
        }).then(result => {
          $('#FS').empty()
          charDataFS = result.data.mins
          charDataFS.forEach(function (item, index, array) {
            item.id = index
          })
          for (var i = 0; i < TIMEARR.length; i++) {
            for (var j = 0; j < charDataFS.length; j++) {
              if (TIMEARR[i].id === charDataFS[j].id) {
                TIMEARR[i].price = charDataFS[j].price
                TIMEARR[i].volume = charDataFS[j].volume
                TIMEARR[i].amount = charDataFS[j].amount
              }
            }
          }
          that.drawChartFS(TIMEARR)
        })
      } else if (dataType === 'tab2') {
        that.$http.getKlineR({
          market: that.market,
          stockCode: that.stkCode
        }).then(result => {
          temp = result.data.candlestickList
          temp.forEach(ele => {
            ele.data = (ele.data).slice(0, 4) + '-' + (ele.data).slice(4, 6) + '-' + (ele.data).slice(6, 8)
            ele.high = parseFloat(ele.high)
            ele.open = parseFloat(ele.open)
            ele.low = parseFloat(ele.low)
            ele.close = parseFloat(ele.close)
            ele.vol = parseFloat(ele.vol)
            ele.vol5 = parseFloat(ele.vol5)
            ele.vol10 = parseFloat(ele.vol10)
            ele.avg5 = parseFloat(ele.avg5)
            ele.avg10 = parseFloat(ele.avg10)
            ele.avg20 = parseFloat(ele.avg20)
            ele.avg60 = parseFloat(ele.avg60)
          })
          that.drawKline(temp, temp[0].data, temp[temp.length - 1].data, 'RK', 'sliderRK')
        })
      } else if (dataType === 'tab3') {
        that.$http.getKlineZ({
          market: that.market,
          stockCode: that.stkCode
        }).then(result => {
          temp = result.data.candlestickList
          temp.forEach(ele => {
            ele.data = (ele.data).slice(0, 4) + '-' + (ele.data).slice(4, 6) + '-' + (ele.data).slice(6, 8)
            ele.high = parseFloat(ele.high)
            ele.open = parseFloat(ele.open)
            ele.low = parseFloat(ele.low)
            ele.close = parseFloat(ele.close)
            ele.vol = parseFloat(ele.vol)
            ele.vol5 = parseFloat(ele.vol5)
            ele.vol10 = parseFloat(ele.vol10)
            ele.avg5 = parseFloat(ele.avg5)
            ele.avg10 = parseFloat(ele.avg10)
            ele.avg20 = parseFloat(ele.avg20)
            ele.avg60 = parseFloat(ele.avg60)
          })
          that.drawKline(temp, temp[0].data, temp[temp.length - 1].data, 'ZK', 'sliderZK')
        })
      } else if (dataType === 'tab4') {
        that.$http.getKlineY({
          market: that.market,
          stockCode: that.stkCode
        }).then(result => {
          temp = result.data.candlestickList
          temp.forEach(ele => {
            ele.data = (ele.data).slice(0, 4) + '-' + (ele.data).slice(4, 6) + '-' + (ele.data).slice(6, 8)
            ele.high = parseFloat(ele.high)
            ele.open = parseFloat(ele.open)
            ele.low = parseFloat(ele.low)
            ele.close = parseFloat(ele.close)
            ele.vol = parseFloat(ele.vol)
            ele.vol5 = parseFloat(ele.vol5)
            ele.vol10 = parseFloat(ele.vol10)
            ele.avg5 = parseFloat(ele.avg5)
            ele.avg10 = parseFloat(ele.avg10)
            ele.avg20 = parseFloat(ele.avg20)
            ele.avg60 = parseFloat(ele.avg60)
          })
          that.drawKline(temp, temp[0].data, temp[temp.length - 1].data, 'YK', 'sliderYK')
        })
      }
    },
    // 获取买卖数据
    getSellBuyData: function () {
      var that = this
      var stMarket = that.market
      var stCode = that.stkCode
      that.$http.getStockIntro({
        market: stMarket,
        stock_code: stCode
      }).then(result => {
        this.sellBuyList = JSON.parse(result.data.slice(6))[0]
      })
    },
    // 获取公告栏 研报数据
    getZXGInfoData () {
      let that = this
      that.$http.getZXGInfoData({
        themeCode: '',
        typeCode: '9213|9214',
        startIndex: 0,
        endIndex: 10,
        desiredInfoContLen: -1
      }).then(result => {
        that.researchList = result.data.itemList
        that.researchList.forEach(ele => {
          ele.pubTime = ele.pubTime.substr(0, 19)
        })
      })
    },
    // 不同tab点击事件
    stockTabEvent (tab, event) {
      var that = this
      switch (tab.index) {
        // 公告栏 研报
        case '0':
          that.$http.getZXGInfoData({
            themeCode: '',
            typeCode: '9213|9214',
            startIndex: 0,
            endIndex: 10,
            desiredInfoContLen: -1
          }).then(result => {
            that.researchList = result.data.itemList
            that.researchList.forEach(ele => {
              ele.pubTime = ele.pubTime.substr(0, 19)
            })
          })
          break
        // 自选股公告栏 宏观
        case '1':
          that.$http.getZXGInfoData({
            themeCode: '',
            typeCode: '9003|9004',
            startIndex: 0,
            endIndex: 10,
            desiredInfoContLen: -1
          }).then(result => {
            that.noticeList = result.data.itemList
            that.noticeList.forEach(ele => {
              ele.pubTime = ele.pubTime.substr(0, 19)
            })
          })
          break
      }
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/less/pages/page.stockInfo.less";
</style>



