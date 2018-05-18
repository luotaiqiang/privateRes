<template>
  <div class="right-content">
    <!--新股申购-->
    <div class="title">
      新股申购
      <span class="title-more">更多<span class="iconfont icon-arrowsrightdouble31"></span></span>
    </div>
    <share-table :elTableList="stockPreview" :lintToStock="lintToStock"></share-table>
    <!--新股行情-->
    <!-- <div class="title padding-t-m">
      新股行情
      <span class="title-more">更多<span class="iconfont icon-arrowsrightdouble31"></span></span>
    </div>
    <el-table :data="quoteData" stripe>
      <el-table-column prop="stkName" label="股票名称" class-name="align-left"></el-table-column>
      <el-table-column prop="listingDate" label="上市日期"></el-table-column>
      <el-table-column prop="issuePrice" label="发行价"></el-table-column>
      <el-table-column prop="firstOpenPrise" label="首日开盘价"></el-table-column>
      <el-table-column prop="firstPriceRiseFall" label="首日涨跌幅(%)"></el-table-column>
      <el-table-column prop="stockCurrentPrice" label="当前价"></el-table-column>
      <el-table-column prop="todayPriceRiseFall" label="今日涨跌幅(%)"></el-table-column>
      <el-table-column prop="newProfit" label="打新收益(%)"></el-table-column>
      <el-table-column prop="stockSYL" label="市盈率"></el-table-column>
      <el-table-column prop="done" label="操作" class-name="align-right"></el-table-column>
    </el-table> -->
    <!--打新收益-->
    <!-- <div class="title padding-t-m">
      打新收益
      <span class="title-more">更多<span class="iconfont icon-arrowsrightdouble31"></span></span>
    </div>
    <el-table :data="newProfitData" stripe>
      <el-table-column prop="stkName" label="股票名称" class-name="align-left"></el-table-column>
      <el-table-column prop="listingDate" label="上市日期"></el-table-column>
      <el-table-column prop="issuePrice" label="发行价"></el-table-column>
      <el-table-column prop="firstPriceRiseFall" label="首日涨跌幅(%)" width="100"></el-table-column>
      <el-table-column prop="stockCurrentPrice" label="当前价"></el-table-column>
      <el-table-column prop="newProfit" label="打新收益(%)"></el-table-column>
      <el-table-column prop="successfulRate" label="中签率（%）"></el-table-column>
      <el-table-column prop="onlineOverMultiples" label="网上超额认购倍数" width="140"></el-table-column>
      <el-table-column prop="underlineOverMultiples" label="网下机构超额认购倍数" width="140"></el-table-column>
      <el-table-column prop="done" label="操作" class-name="align-right"></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
import shareTable from '@/components/commen/elTable.vue'
import { stockList as NEWSTOCK } from '@/config/newStock.js'
export default {
  components: {
    shareTable
  },
  data () {
    return {
      quoteData: [],
      newProfitData: [],
      // 新股申购数据初始化
      stockPreview: []
    }
  },
  mounted () {
    this.$http.getSharesList().then(result => {
      this.quoteData = result.data.quoteData
      this.newProfitData = result.data.newProfitData
      console.log(result.data)
    })
    // 获取新股申购数据
    var newStockArr = []
    this.$http.getStockPreview({
      // beginDate: '20171201',
      // endDate: '20171231'
    }).then(result => {
      var stockObj = result.data.itemList
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
  methods: {
    lintToStock () {
      console.log('暂无链接')
    }
  }
}
</script>
<style>
  tr.el-table__row{
    cursor: auto;
  }
</style>


