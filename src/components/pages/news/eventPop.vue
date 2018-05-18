/*
 * @Author:duyun
 * @Date: 2018-03-19
 * @Description: 资讯模板：事件弹框
*/

<template>
  <div class="pop-bg" v-if="pop">
    <div class="gtja-layout pop-content pop1" v-if="pop1">
      <div class="pop-close" @click="closePop()"></div>
      <p class="event-title">{{title}}</p>
      <el-table
        :data="popData"
        stripe
        max-height="400"
        :row-class-name="riseDropDiff">
        <el-table-column prop="stockName" label="股票名称" width="90"></el-table-column>
        <el-table-column prop="stockCode" label="股票代码" width="90"></el-table-column>
        <el-table-column prop="endDate" label="截止日期" width="90"></el-table-column>
        <el-table-column prop="forecastContent" label="业绩变动说明"></el-table-column>
        <el-table-column prop="eGrowthRate" label="业绩变动幅度" width="150"></el-table-column>
        <el-table-column prop="forecastType" label="预告类型" width="80"></el-table-column>
        <el-table-column prop="netProfit" label="上年同期净利润(万元)" width="200"></el-table-column>
      </el-table>
    </div>
    <div class="gtja-layout pop-content pop2" v-if="pop2">
      <div class="pop-close" @click="closePop()"></div>
      <p class="event-title">{{title}}</p>
      <el-table
        :data="popData"
        stripe
        height="400"
        :row-class-name="riseDropDiff1">
        <el-table-column prop="stockName" label="股票名称"></el-table-column>
        <el-table-column prop="stockCode" label="股票代码"></el-table-column>
        <el-table-column prop="endDate" label="截止日期"></el-table-column>
        <el-table-column prop="basicEPS" label="每日收益"></el-table-column>
        <el-table-column prop="operatingRevenue" label="营收"></el-table-column>
        <el-table-column prop="operatingRevenueMOM" label="营收同比"></el-table-column>
        <el-table-column prop="parentCompanyOwners" label="净利润"></el-table-column>
        <el-table-column prop="parentCompanyOwnersMOM" label="净利润同比"></el-table-column>
        <el-table-column prop="netAssetPS" label="每股净资产"></el-table-column>
        <el-table-column prop="roe" label="净资产收益率"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'popData',
    'title',
    'pop',
    'pop1',
    'pop2',
    'closePop'
  ],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    riseDropDiff (row, index) {
      if (row.eGrowthRate >= 0) {
        return 'styleFlagRise'
      } else {
        return 'styleFlagDrop'
      }
    },
    riseDropDiff1 (row, index) {
      if (row.operatingRevenue >= 0) {
        return 'styleFlagRise'
      } else {
        return 'styleFlagDrop'
      }
    }
  }
}
</script>
<style lang="less">
@import "../../../assets/less/commen/popStyle.less";
.event-title{
  text-align: center;
  color: #999;
  font-size: 15px;
  padding-bottom: 20px;
}
.pop1{
  .el-table__row td:nth-child(4){
    text-align: left;
  }
}
</style>

