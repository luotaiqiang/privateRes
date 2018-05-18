<template>
  <div class="right-content">
    <div class="title">基础分类</div>
    <el-table
      :elTableData="stockInfoList"
      :riseDropDiff="riseDropDiff">
    </el-table>
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
      stockInfoList: [],
      // 表格当前页数据
      tableData: [],
      // 多选数组
      multipleSelection: [],
      // 搜索条件
      criteria: '',
      select: '',
      pageSizes: [10, 20, 30],
      pagesize: 10,
      // 默认高亮行数据id
      highlightId: -1,
      // 当前页码
      currentPage: 1,
      // 查询的页码
      start: 1,
      // 默认数据总数
      totalCount: 1000
    }
  },
  watch: {
    '$route': function (to, from) {
      this.loadData()
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    // 点击行响应
    handleclick: function (row, event, column) {
      this.highlightId = row.id
    },
    // 每页显示数据量变更
    handleSizeChange: function (val) {
      this.pagesize = val
      this.loadData()
    },
    // 页码变更
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.loadData()
    },
    // 获取新的数据
    loadData: function () {
      var params = this.$route.params
      this.$http.getRank({
        type: params.type,
        pageSize: this.pagesize,
        page: this.currentPage,
        sort: params.sortRule
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
        })
        this.stockInfoList = hsItemObj
      })
    },
    // 控制颜色
    riseDropDiff (row, index) {
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
  .styleFlagRise {
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6),
    td:nth-child(7),
    td:nth-child(9){
      color: #e63f52;
    }
  }
  .styleFlagDrop{
    td:nth-child(3),
    td:nth-child(4),
    td:nth-child(5),
    td:nth-child(6),
    td:nth-child(7),
    td:nth-child(9){
      color: #1abc9c;
    }
  }
</style>

