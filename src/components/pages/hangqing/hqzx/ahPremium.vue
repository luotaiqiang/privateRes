<template>
  <div class="right-content">
    <div class="title">AH股溢价</div>
    <div style="margin-top:15px">
        <el-table
            style="width:100%"
            :data="stockInfoList"
            stripe>
          <el-table-column
            prop="stkName"
            label="股票代码">
          </el-table-column>
          <el-table-column
            prop="stkCode"
            label="股票名称">
          </el-table-column>
          <el-table-column
            prop="stockCurrentPrice"
            label="当前价">
          </el-table-column>
          <el-table-column
            prop="riseFall"
            label="涨跌额">
          </el-table-column>
          <el-table-column
            prop="priceRiseFall"
            label="涨跌幅"
            sortable
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="sharePriceAmplitude"
            label="当日股价幅度">
          </el-table-column>
          <el-table-column
            prop="52weekRange"
            label="52周股价幅度">
          </el-table-column>
          
          <el-table-column
            prop="stockMarketValue"
            label="市值">
          </el-table-column>
          <el-table-column
            prop="stockSYL"
            label="市盈率">
          </el-table-column>
          <el-table-column
            prop="stockTradingVolume"
            label="成交量">
          </el-table-column>
          <el-table-column
            prop="stockTurnover"
            label="成交额">
          </el-table-column>
          <el-table-column
            prop="done"
            label="操作">
          </el-table-column>
        </el-table>
        <div align="right" style="margin-top:20px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[30, 60, 90]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div> 
  </div>
</template>

<script>
export default {
  components: {
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
  mounted () {
    this.$http.getstockInfo().then(result => {
      this.stockInfoList = result.data.stockInfoList
      this.totalCount = result.data.number
    })
  },
  methods: {
    // 每页显示数据量变更
    handleSizeChange: function (val) {
      this.pagesize = val
      this.loadData(this.criteria, this.currentPage, this.pagesize)
    },
    // 页码变更
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.loadData(this.criteria, this.currentPage, this.pagesize)
    }
  }
}
</script>

<style lang="less">
</style>

