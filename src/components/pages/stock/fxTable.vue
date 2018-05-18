/*
 * @Author:duyun
 * @Date: 2018-02-01
 * @Description: 个股页面模板:周期分析、联动分析表格
*/
<template>
    <el-table
      :data="elTableData"
      style="width:100%"
      stripe
      :row-class-name="riseDropDiff">
      <el-table-column prop="itemName" label="关联标的"> </el-table-column>
      <el-table-column prop="occurranceCount" label="关联次数" sortable></el-table-column>
      <el-table-column prop="victory" label="上涨次数" sortable> </el-table-column>
      <el-table-column prop="avgAddChg" label="平均涨幅" sortable> </el-table-column>
      <el-table-column prop="relativeChg" :label="retRiseName" sortable></el-table-column>
    </el-table>
</template>

<script>
export default {
  props: ['elTableData'],
  data () {
    return {
      retRiseName: '相对指数涨幅'
    }
  },
  mounted () {
    this.getRetRiseName()
  },
  methods: {
    riseDropDiff (row, index) {
      var target = parseFloat(row.avgAddChg)
      if (target < 0) {
        return 'styleFlagDrop'
      } else {
        return 'styleFlagRise'
      }
    },
    // 相对指数涨幅 名称判断
    getRetRiseName () {
      // 获取当季当月当周数据
      var curParams = this.$route.params.stockcode
      var market = curParams.substr(0, 2)
      if (market === 'SH') {
        this.retRiseName = '相对上证指数涨幅'
      } else {
        this.retRiseName = '相对深证成指涨幅'
      }
    }
  }
}
</script>

