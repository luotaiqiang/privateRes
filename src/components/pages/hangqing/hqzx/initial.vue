<!--
 * @Author:duyun
 * @Date: 2017-09-20
 * @Description: 行情/行情中心
-->
<template>
  <div class="hangqing-initial right-content">
    <div class="cont-item">
      <!--市场一览-->
      <div class="title">市场一览</div>
      <stock-quote></stock-quote>
    </div>
    <div class="cont-item xgyg">
      <!--新股预告-->
      <div class="title">
        新股预告
        <router-link to="/Shares" class="title-more">更多<span class="iconfont icon-arrowsrightdouble31"></span></router-link>
      </div>
      <hq-table :elTableList="stockPreview" :lintToStock="lintToStockDemo"></hq-table>
    </div>
    <div class="cont-item">
      <!--行情排行榜-->
      <div class="title">
        行情排行榜
        <ul class="title-nav">
          <li
            v-for="(titleNav, index) in titleNavList"
            :key="titleNav.id"
            :class="{ select: index === isSelect }"
            @click="addClass(index, titleNav)">{{titleNav.name}}
          </li>
        </ul>
      </div>
      <ul class="rank-box">
        <!-- 涨跌幅榜 -->
        <li class="rank">
          <h2 class="rank-title">
            <span>涨跌幅榜</span>
            <span class="order">
              <a
                :class="{up: zhangfUp}"
                @click="zhangFUp()">涨</a>
              <a
                :class="{down: !zhangfUp}"
                @click="zhangFDown()">跌</a>
            </span>
            <router-link class="title-more" :to="src">更多</router-link>
          </h2>
          <el-table
            :data="zhangfList"
            stripe
            :row-class-name="riseDropDiff"
            @row-click="lintToStock">
            <el-table-column  prop="stkName" label="股票"></el-table-column>
            <el-table-column  prop="price" width="60" label="当前价"></el-table-column>
            <el-table-column  prop="zd" width="60" label="涨跌额" :formatter="numFix2"></el-table-column>
            <el-table-column  prop="zhangf" label="涨跌幅" :formatter="numFix2_100"></el-table-column>
          </el-table>
        </li>
        <!-- 成交量排行榜 -->
        <li class="rank">
          <h2 class="rank-title">
            <span>成交量排行榜</span>
            <span class="order">
              <a
                :class="{up: volUp}"
                @click="clickVolUp()">高</a>
              <a
                :class="{down: !volUp}"
                @click="clickVolDown()">低</a>
            </span>
            <router-link class="title-more" :to="src">更多</router-link>
          </h2>
          <el-table
            :data="volList"
            stripe
            :row-class-name="riseDropDiff"
            @row-click="lintToStock">
            <el-table-column  prop="stkName" label="股票"></el-table-column>
            <el-table-column  prop="price" width="60" label="当前价"></el-table-column>
            <el-table-column  prop="zhangf" width="60" label="涨跌幅" :formatter="numFix2_100"></el-table-column>
            <el-table-column  prop="vol" label="成交量"></el-table-column>
          </el-table>
        </li>
        <!-- 成交额排行榜 -->
        <li class="rank">
          <h2 class="rank-title">
            <span>成交额排行榜</span>
            <span class="order">
              <a
                :class="{up: amountUp}"
                @click="clickAmountUp()">高</a>
              <a
                :class="{down: !amountUp}"
                @click="clickAmountDown()">低</a>
            </span>
            <router-link class="title-more" :to="src">更多</router-link>
          </h2>
          <el-table
            :data="amountList"
            stripe
            :row-class-name="riseDropDiff"
            @row-click="lintToStock">
            <el-table-column  prop="stkName" label="股票"></el-table-column>
            <el-table-column  prop="price" width="60" label="当前价"></el-table-column>
            <el-table-column  prop="zhangf" width="60" label="涨跌幅" :formatter="numFix2_100"></el-table-column>
            <el-table-column  prop="amount" label="成交额" :formatter="amountForma"></el-table-column>
          </el-table>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import stockQuote from '@/components/pages/hangqing/commen/stockQuote.vue'
import hqTable from '@/components/commen/elTable.vue'
import { titleNavList as TITLENAVLIST } from '@/config/titleNavList.js'
import { stockList as NEWSTOCK } from '@/config/newStock.js'
const rankTimer = 5000
export default {
  components: {
    stockQuote,
    hqTable
  },
  data () {
    return {
      // 指数数据初始化
      indexValue: [],
      // 新股预告数据初始化
      stockPreview: [],
      // 涨跌幅榜数据初始化
      zhangfList: [],
      // 成交量排行榜数据初始化
      volList: [],
      // 成交额排行榜数据初始化
      amountList: [],
      // 排行榜分类选中初始化
      isSelect: 0,   /* 使用全等于 ===  */
      // 排行榜分类数据初始化
      titleNavList: TITLENAVLIST,
      // 排行榜数据颜色初始化
      zhangfUp: true,
      volUp: true,
      amountUp: true,
      // 存储当前market type
      curRankType: '',
      // 存储三种排序的排序方式 涨跌幅、成交量、成交额
      zhangfType: 'zhangf_desc',
      volType: 'vol_desc',
      amountType: 'amount_desc',
      // 三种排序方式的定时器
      zhangfTimer: '',
      volTimer: '',
      amountTimer: '',
      klineData: [],
      src: '/Basic',
      // kline数据初始化
      serverData: []
    }
  },
  mounted () {
    // 获取新股预告数据
    this.getStockPreviewData()
    var that = this
    this.curRankType = this.titleNavList[0].type
    // 获取默认沪A涨跌幅
    that.getHqRankFunc(that.curRankType, that.zhangfType, that.zhangfCallback)
    window.clearInterval(this.zhangfTimer)
    this.zhangfTimer = window.setInterval(function () {
      that.getHqRankFunc(that.curRankType, that.zhangfType, that.zhangfCallback)
    }, rankTimer)

    // 获取默认沪A成交量
    that.getHqRankFunc(that.curRankType, that.volType, that.volCallback)
    window.clearInterval(this.volTimer)
    this.volTimer = window.setInterval(function () {
      that.getHqRankFunc(that.curRankType, that.volType, that.volCallback)
    }, rankTimer)

    // 获取默认沪A成交额
    that.getHqRankFunc(that.curRankType, that.amountType, that.amountCallback)
    window.clearInterval(this.amountTimer)
    this.amountTimer = window.setInterval(function () {
      that.getHqRankFunc(that.curRankType, that.amountType, that.amountCallback)
    }, rankTimer)
  },
  methods: {
    // 获取新股预告数据
    getStockPreviewData: function () {
      var newStockArr = []
      this.$http.getStockPreview().then(result => {
        var stockObj = result.data.itemList
        // console.log(stockObj)
        // console.log(result.data)
        stockObj.forEach(ele => {
          ele.stockName = ele.stockName
          ele.stockCode = ele.stockCode
          ele.purchaseDate = ele.purchaseDate.substr(0, 4) + '-' + ele.purchaseDate.substr(4, 2) + '-' + ele.purchaseDate.substr(6, 2)
          ele.issueVol = (parseFloat(ele.actIssShr)).toFixed(0)
          ele.onlineIssueVol = (parseFloat(ele.actIssShrOn)).toFixed(0)
          ele.accuSubShrMax = (parseFloat(ele.accuSubShrMax) / 10000).toFixed(2)
          ele.iccPrc = parseFloat(ele.iccPrc).toFixed(2)
          ele.announcementDate = ele.alotRsltNtcDt.substr(0, 4) + '-' + ele.alotRsltNtcDt.substr(4, 2) + '-' + ele.alotRsltNtcDt.substr(6, 2)
          ele.pe = parseFloat(ele.peDil).toFixed(2)
        })
        newStockArr.push({
          elTableData: stockObj,
          stockList: NEWSTOCK
        })
        this.stockPreview = newStockArr
      })
    },
    // 获取行情排行榜
    getHqRankFunc: function (curType, sortRule, callback) {
      switch (sortRule) {
        case 'zhangf_desc':
          this.zhangfUp = true
          break
        case 'vol_desc':
          this.volUp = true
          break
        case 'amount_desc':
          this.amountUp = true
          break
      }
      this.$http.getRank({
        type: curType,
        pageSize: 20,
        page: 1,
        sort: sortRule
      }).then(callback)
      .catch(error => {
        console.error(error)
      })
    },
    // 涨跌幅榜回调函数
    zhangfCallback: function (result) {
      this.zhangfList = result.data.TableInfo
    },
    // 成交量排行榜回调函数
    volCallback: function (result) {
      this.volList = result.data.TableInfo
    },
    // 涨跌额排行榜回调函数
    amountCallback: function (result) {
      this.amountList = result.data.TableInfo
    },
    // 涨跌幅榜 点击涨
    zhangFUp () {
      let that = this
      that.zhangfType = 'zhangf_desc'
      that.getHqRankFunc(that.curRankType, that.zhangfType, that.zhangfCallback)
    },
    // 涨跌幅榜 点击跌
    zhangFDown () {
      let that = this
      that.zhangfType = 'zhangf_asc'
      // 控制排行榜文字颜色
      that.zhangfUp = false
      that.getHqRankFunc(that.curRankType, that.zhangfType, that.zhangfCallback)
    },
    // 成交量排行榜 点击涨 跌
    clickVolUp () {
      let that = this
      that.volType = 'vol_desc'
      that.getHqRankFunc(that.curRankType, that.volType, that.volCallback)
    },
    clickVolDown () {
      let that = this
      that.volType = 'vol_asc'
      // 控制点击成交量的颜色
      that.volUp = false
      that.getHqRankFunc(that.curRankType, that.volType, that.volCallback)
    },
    // 成交额排行榜 点击涨 跌
    clickAmountUp () {
      let that = this
      that.amountType = 'amount_desc'
      that.getHqRankFunc(that.curRankType, that.amountType, that.amountCallback)
    },
    clickAmountDown () {
      let that = this
      that.amountType = 'amount_asc'
      // 控制成交额的颜色
      that.amountUp = false
      that.getHqRankFunc(that.curRankType, that.amountType, that.amountCallback)
    },

    // 控制排行榜文字颜色 end ------------------

    // 行情排行榜tabs页选中事件
    addClass: function (index, titleNav) {
      let that = this
      that.isSelect = index
      that.curRankType = titleNav.type
      that.zhangfType = 'zhangf_desc'
      that.volType = 'vol_desc'
      that.amountType = 'amount_desc'
      that.getHqRankFunc(that.curRankType, that.zhangfType, that.zhangfCallback)
      that.getHqRankFunc(that.curRankType, that.volType, that.volCallback)
      that.getHqRankFunc(that.curRankType, that.amountType, that.amountCallback)
    },
    riseDropDiff (row, index) {
      if (row.zhangf >= 0) {
        return 'styleFlagRise'
      } else {
        return 'styleFlagDrop'
      }
    },
    // element 表格filter
    numFix2 (row, column) {
      return parseInt(row.zd).toFixed(2)
    },
    numFix2_100 (row, column) {
      return parseInt(row.zhangf * 100).toFixed(2) + '%'
    },
    amountForma (row, column) {
      return (parseInt(row.amount) / Math.pow(10, 8)).toFixed(2) + '亿'
    },
    lintToStock (row, event, column) {
      window.location.href = `./stock.html#/stock/${row.market}${row.stkCode}`
    },
    lintToStockDemo () {}
  }
}
</script>

<style lang="less">
@import '../../../../assets/less/pages/page.hangqing.less';
@import '../../../../assets/less/commen/titleNav.less';
@import '../../../../assets/less/commen/rank.less';
.el-table__row {
  cursor: pointer;
}
</style>




