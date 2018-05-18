<template>
  <div class="right-content shyl-content">
    <div class="title">沪深A股</div>
    <el-table :elTableData="hsAList" :riseDropDiff="riseDropDiff"></el-table>
    <div align="right" style="margin-top:20px;">
      <el-pagination
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <div class="title">沪深B股</div>
    <el-table :elTableData="hsBList" :riseDropDiff="riseDropDiff"></el-table>
    <div align="right" style="margin-top:20px;">
      <el-pagination
        :page-sizes="pageSizesHB"
        :page-size="pageSizeHB"
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
        :current-page.sync="currentPageHB"
        @current-change="handleCurrentChangeHB"
        @size-change="handleSizeChangeHB">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import elTable from '@/components/commen/elTable2.vue'
export default {
  components: {
    elTable
  },
  data () {
    return {
      // 沪深A数据初始化
      hsAList: [],
      // 沪深B数据初始化
      hsBList: [],
      // 搜索条件
      criteria: '',
      // 页数设置
      pageSize: 10,
      pageSizeHB: 10,
      pageSizes: [10, 20, 30],
      pageSizesHB: [10, 20, 30],
      total: '10',
      totalHB: '10',
      // 默认高亮行数据id
      highlightId: -1,
      // 当前页码
      currentPage: 1,
      currentPageHB: 1,
      // 查询的页码
      start: 1
    }
  },
  mounted () {
    // 获取数据
    this.loadData()
    this.loadDataHB()
  },
  methods: {
    loadData: function (start, end) {
      this.$http.getRank({
        type: '60',
        pageSize: this.total,
        page: '1',
        sort: 'zhangf_desc'
      }).then(result => {
        let hsItemObj = result.data.TableInfo
        hsItemObj.forEach(ele => {
          ele.stkName = ele.stkName
          ele.stkCode = ele.stkCode
          ele.stockCurrentPrice = ele.price
          ele.riseFall = ele.zd
          ele.priceRiseFall = (parseFloat(ele.zhangf) * 100).toFixed(2) + '%'
          // ele.sharePriceAmplitude = '--'
          // ele.weekRange = '--'
          // ele.stockMarketValue = '--'
          // ele.stockSYL = '--'
          ele.preClose = parseFloat(ele.preClose).toFixed(2)
          ele.hs = parseFloat(ele.hs).toFixed(2)
          ele.PE = parseFloat(ele.PE).toFixed(2)
          ele.lb = parseFloat(ele.lb).toFixed(2)
          ele.stockTradingVolume = (parseFloat(ele.vol) / 10000).toFixed(2) + '万'
          ele.stockTurnover = (parseFloat(ele.amount) / 10000).toFixed(2) + '万'
          ele.done = '关注'
          ele.market = ele.market
        })
        this.hsAList = hsItemObj.slice(start, end)
        // console.log(this.hsAList)
      })
    },
    loadDataHB: function (start, end) {
      this.$http.getRank({
        type: '68',
        pageSize: this.totalHB,
        page: '1',
        sort: 'zhangf_desc'
      }).then(result => {
        let hsItemObj = result.data.TableInfo
        // console.log(hsItemObj)
        hsItemObj.forEach(ele => {
          ele.stkName = ele.stkName
          ele.stkCode = ele.stkCode
          ele.stockCurrentPrice = ele.price
          ele.riseFall = ele.zd
          ele.priceRiseFall = (parseFloat(ele.zhangf) * 100).toFixed(2) + '%'
          ele.sharePriceAmplitude = '--'
          ele.weekRange = '--'
          ele.stockMarketValue = '--'
          ele.stockSYL = '--'
          ele.stockTradingVolume = (parseFloat(ele.vol) / 10000).toFixed(2) + '万'
          ele.stockTurnover = (parseFloat(ele.amount) / 10000).toFixed(2) + '万'
          ele.done = '关注'
        })
        this.hsBList = hsItemObj.slice(start, end)
      })
    },
    // 点击行响应
    handleclick: function (row, event, column) {
      this.highlightId = row.id
    },
    // 每页显示数据量变更
    handleSizeChange: function (val) {
      this.pagesize = val
      this.total = val
      this.loadData()
    },
    handleSizeChangeHB: function (val) {
      this.pagesizeHB = val
      this.totalHB = val
      this.loadDataHB()
    },
    // 页码变更
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.total = val * 10
      this.loadData((val - 1) * 10, this.total)
    },
    handleCurrentChangeHB: function (val) {
      this.currentPageHB = val
      this.totalHB = val * 10
      this.loadDataHB((val - 1) * 10, this.totalHB)
    },
    // 点击股票跳转
    toStock (row, event, column) {
      window.location.href = `./stock.html#/stock/${row.market}${row.stkCode}`
    },
    // 颜色变化
    riseDropDiff: function (row, index) {
      console.log(row)
      if (row.zhangf >= 0) {
        return 'styleFlagRise'
      } else {
        return 'styleFlagDrop'
      }
    }
  }
}
</script>

<style lang="less">
.shyl-content {
  .styleFlagRise{
    td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6),td:nth-child(7),td:nth-child(9){
      color: #e63f52;
    }
  }
  .styleFlagDrop{
    td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6),td:nth-child(7),td:nth-child(9){
      color: #1abc9c;
    }
  }
}
</style>

