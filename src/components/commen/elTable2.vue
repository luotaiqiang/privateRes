/* * @Author:duyun * @Date:2017-11-23 * @Description: 公共模板--el-table模板 */

<template>
  <div>
    <el-table
      :data="elTableData"
      style="width:100%"
      stripe
      :row-class-name="riseDropDiff"
      @row-click="clickEvent">
      <el-table-column prop="stkName" label="股票名称"></el-table-column>
      <el-table-column prop="stkCode" label="股票代码"></el-table-column>
      <el-table-column prop="market" label="市场代码" v-if="false"></el-table-column>
      <el-table-column prop="stockCurrentPrice" label="当前价"></el-table-column>
      <el-table-column prop="riseFall" label="涨跌额"> </el-table-column>
      <el-table-column prop="priceRiseFall" label="涨跌幅" sortable show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="sharePriceAmplitude" label="当日股价幅度"></el-table-column>
      <el-table-column prop="weekRange" label="52周股价幅度"></el-table-column>
      <el-table-column prop="stockMarketValue" label="市值"></el-table-column>
      <el-table-column prop="stockSYL" label="市盈率"></el-table-column> -->
      <el-table-column prop="preClose" label="昨收"></el-table-column>
      <el-table-column prop="hs" label="换手率"></el-table-column>
      <el-table-column prop="PE" label="市盈（动）"></el-table-column>
      <el-table-column prop="lb" label="量比"></el-table-column>
      <el-table-column prop="stockTradingVolume" label="成交量"></el-table-column>
      <el-table-column prop="stockTurnover" label="成交额"></el-table-column>
      <el-table-column prop="done" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: [
    'elTableData',
    'riseDropDiff'
  ],
  mounted () {
    this.clickEvent()
  },
  methods: {
    clickEvent (row, event, column) {
      window.location.href = './stock.html#/stock/' + row.market + row.stkCode
    }
  }
}
</script>
