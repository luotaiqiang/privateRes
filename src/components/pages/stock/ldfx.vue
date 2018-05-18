/*
 * @Author:duyun
 * @Date: 2017-11-24
 * @Description: 个股页面模板:联动分析
*/

<template>
  <div>
    <div class="condition-wrapper clearfix">
      <div class="left-par">
        <span class="segment segment1">统计最近</span>
        <el-select class="progress-change" v-model="progress1" placeholder="请选择" size="small">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="selectChange1">
          </el-option>
        </el-select>
        <el-select class="progress-change" v-model="progress2" placeholder="请选择" size="small">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="selectChange2">
          </el-option>
        </el-select>
        <span class="segment segment1">累计涨跌幅</span>
        <el-select class="progress-change" v-model="progress4" placeholder="请选择" size="small">
          <el-option
            v-for="item in options4"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="selectChange4">
          </el-option>
        </el-select>
        <input class="num-input" type="number" min="1" v-model="per">%
        <span v-if="this.progress4 === '2'">
          --
          <input class="num-input" type="number" min="1" v-model="per2">%
        </span>
        <span>后</span>
        <input class="num-input" type="number"  v-model="after">个交易日
        <!-- 买入时间和卖出时间固定数据（页面隐藏） -->
        <!-- <div class="ldfx-hide-num">
          <div class="select-l">
            <span>买入时间：事件发生</span>
            <input class="num-input" readonly  v-model="progress6">
            <input class="num-input" type="number" min="1" v-model="before">个交易日
          </div>
          <div class="select-r">
            <span>卖出时间：事件发生</span>
            <input class="num-input" readonly  v-model="progress7">
          </div>
        </div> -->
      </div>
      <div class="right-par ldfx-right-par">
        <el-button type="primary" @click="toResult()">我要分析</el-button>
        <i class="loading" v-if="toLoading"></i>
      </div>
    </div>
    <zq-table :elTableData="zqTable"></zq-table>
  </div>
</template>

<script>
import {options1 as OPTION1, options2 as OPTION2, options4 as OPTION4} from '@/config/linkageAnalysisSelect.js'
import zqTable from '@/components/pages/stock/fxTable.vue'
export default {
  components: {
    zqTable
  },
  data () {
    return {
      per: '5',
      per2: '5',
      // before: 0,
      after: 1,
      progress1: '0',
      progress2: '3',
      progress3: '0',
      progress4: '0',
      zqTable: [],
      options1: OPTION1,
      options2: OPTION2,
      options4: OPTION4,
      userType: '1',
      userId: '4606308',
      toLoading: false
    }
  },
  methods: {
    // 分析结果
    toResult: function () {
      this.getData()
      this.toLoading = true
    },
    // 获取数据
    getData: function () {
      // 获取周期分析结果
      var that = this
      var curParams = that.$route.params.stockcode
      var stockCode = curParams.substr(2)
      var startDate
      var endDate
      var startTime
      var endTime
      var chgNumber
      var myDate = new Date()
      var year = myDate.getFullYear()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      console.log(startTime, endTime)
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (day >= 0 && day <= 9) {
        day = '0' + day
      }
      var nowDate = year + '-' + month + '-' + day
      // 开始时间&&结束时间推算
      if (this.progress1 === '0') {
        startDate = '2000-01-01'
      } else if (this.progress1 === '1') {
        startDate = this.GetNextMonthDay(nowDate, 6)
      } else if (this.progress1 === '2') {
        startDate = (year - 1) + '-' + month + '-' + day
      } else if (this.progress1 === '3') {
        startDate = (year - 5) + '-' + month + '-' + day
      }
      endDate = nowDate
      // 比较符号推算
      if (this.progress4 === '2') {
        chgNumber = parseFloat(this.per) + ',' + parseFloat(this.per2)
      } else {
        chgNumber = parseFloat(this.per)
      }
      // 获取数据
      this.$http.getLinkageAanalysis({
        userId: this.userId,    // 用户ID
        userType: this.userType,  // 用户类别
        itemType: '0',  // 股票类型
        itemId: stockCode, // 股票代码
        startDate: startDate,  // 分析周期开始时间
        endDate: endDate,   // 分析周期结束时间
        period: this.progress2,   // 周期，为统计该主标的连续涨跌幅的时间区间
        comparisonSymbol: this.progress4,  // 比较符号
        chgNumber: chgNumber,  // 财务条件中指标的数值float的字符串表示,当有2个时传入[float],[float],如5.0,5.0
        startTime: '0',  // 事件发生几天前
        endTime: '1'   // 事件发生几天
      }).then(result => {
        that.toLoading = false
        this.zqTable = result.data.itemList
        console.log(this.zqTable)
        this.zqTable.forEach(ele => {
          ele.itemName = ele.itemName + '(' + ele.itemId + ')'
          ele.avgAddChg = parseFloat(ele.avgAddChg).toFixed(2) + '%'
          ele.victory = parseInt((parseFloat(ele.victory) / 100) * ele.occurranceCount)
          ele.relativeChg = parseFloat(ele.relativeChg).toFixed(2) + '%'
        })
      })
    },
    // 往后推迟月份
    GetNextMonthDay: function (date, monthNum) {
      var dateArr = date.split('-')
      var year = dateArr[0] // 获取当前日期的年份
      var month = dateArr[1] // 获取当前日期的月份
      var day = dateArr[2] // 获取当前日期的日
      var days = new Date(year, month, 0)
      days = days.getDate() // 获取当前日期中的月的天数
      console.log(days)
      var year2 = year
      var month2 = parseInt(month) - parseInt(monthNum)
      if (month2 < 0) {
        // year2 = parseInt(year2) - parseInt((parseInt(-month2) / 12 === 0 ? 1 : (parseInt(-month2) / 12)) + 1)
        year2 = parseInt(year2) - 1
        month2 = (12 - parseInt(-month2) % 12) + 1
      }
      var day2 = day
      var days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      var t2 = year2 + '-' + month2 + '-' + day2
      return t2
    },
    // 下拉框值变换
    selectChange1: function (value) {
      this.progress1 = value
    },
    selectChange2: function (value) {
      this.progress2 = value
    },
    selectChange3: function (value) {
      this.progress3 = value
    },
    selectChange4: function (value) {
      this.progress4 = value
    }
  }
}
</script>

<style lang="less">
@import "../../../assets/less/commen/analysis.less";
.condition-wrapper{
  margin: 15px 0 50px;
}
.select-l{
  margin-top: 15px;
}
.select-r{
  margin-top: 15px;
}
.ldfx-hide-num{
  position: absolute;
  left: -99999px;
}
.ldfx-right-par{
  position: relative;
  .loading{
    left: 20%;
    top: 20%;
  }
}
</style>


