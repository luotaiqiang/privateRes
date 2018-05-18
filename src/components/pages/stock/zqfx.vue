/*
 * @Author:duyun
 * @Date: 2017-11-24
 * @Description: 个股页面模板:周期分析
*/

<template>
  <div>
    <div class="condition-wrapper clearfix">
      <div class="left-par">
        <el-select class="progress-change mid" v-model="progressType" placeholder="请选择" size="small" @change="selectChange1">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <span class="select3">
          <!-- 每年的某天 -->
          <span class="must" v-if="this.progressType === '0'">
            <input class="num-input" type="number" min="1" v-model="month"> 月
            <input class="num-input" type="number" min="1" v-model="day"> 日 前
            <input class="num-input" type="number" min="1" v-model="before"> 天 至 后
            <input class="num-input" type="number" min="1" v-model="after"> 天 的 上 涨 规 律
          </span>
          <!-- 每年的某月 -->
          <span class="must" v-if="this.progressType === '2'">
            <el-select class="progress-change" v-model="case2Month" placeholder="请选择" size="small" @change="selectChange2">
              <el-option v-for="item in case2MonthList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            的 上 涨 规 律
          </span>
          <!-- 某月的某周 -->
          <span class="must" v-if="this.progressType === '3'">
            <el-select class="progress-change" v-model="case3Month" placeholder="请选择" size="small"  @change="selectChange3">
              <el-option v-for="item in case3MonthList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            <el-select class="progress-change" v-model="case3Week" placeholder="请选择" size="small" @change="selectChange4">
              <el-option v-for="item in case3WeekList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            的 上 涨 规 律
          </span>
          <!-- 每月的某周 -->
          <span class="must" v-if="this.progressType === '4'">
            <el-select class="progress-change" v-model="case4Week" placeholder="请选择" size="small" @change="selectChange5">
              <el-option v-for="item in case4WeekList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            的 上 涨 规 律
          </span>
          <!-- 每周的周几 -->
          <span class="must" v-if="this.progressType === '5'">
            <el-select class="progress-change" v-model="case5WeekDay" placeholder="请选择" size="small" @change="selectChange6">
              <el-option v-for="item in case5WeekDayList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            的 上 涨 规 律
          </span>
          <!-- 每年的某季度 -->
          <span class="must" v-if="this.progressType === '6'">
            <el-select class="progress-change" v-model="case6Quarter" placeholder="请选择" size="small" @change="selectChange7">
              <el-option v-for="item in case6QuarterList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            的 上 涨 规 律
          </span>
          <!-- 重要节日 -->
          <span class="must" v-if="this.progressType === '7'">
            <el-select class="progress-change" v-model="case7Important" placeholder="请选择" size="small" @change="selectChange7">
              <el-option v-for="item in case7ImportantList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            前
            <input class="num-input" type="number" min="1" v-model="before2"> 天 至 后
            <input class="num-input" type="number" min="1" v-model="after2"> 天 的 上 涨 规 律
          </span>
          <!-- 其他节日 -->
          <span class="must" v-if="this.progressType === '8'">
            <el-select class="progress-change" v-model="case8Other" placeholder="请选择" size="small" @change="selectChange7">
              <el-option v-for="item in case8OtherList" :key="item.holidayId" :label="item.label" :value="item.value"> </el-option>
            </el-select>
            前
            <input class="num-input" type="number" min="1" v-model="before3"> 天 至 后
            <input class="num-input" type="number" min="1" v-model="after3"> 天 的 上 涨 规 律
          </span>
        </span>
      </div>
      <div class="right-par">
        <el-button type="primary" @click="toResult()">我要分析</el-button>
        <i class="loading" v-if="toLoading"></i>
      </div>
    </div>
    <!-- <zq-table :elTableData="zqTable"></zq-table> -->
    <el-table
      :data="zqfxData"
      stripe
      :row-class-name="riseDropDiff">
      <el-table-column prop="time" label="统计维度"></el-table-column>
      <el-table-column prop="occurTimes" label="统计次数" sortable></el-table-column>
      <el-table-column prop="riseProb" label="上涨次数" sortable></el-table-column>
      <el-table-column prop="avgRise" label="平均涨幅" sortable> </el-table-column>
      <el-table-column prop="retRise" :label="retRiseName" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script>
// import zqTable from '@/components/pages/stock/fxTable.vue'
import {type as TYPE, month as MONTH, week as WEEK, quarter as QUARTER, weekDay as WEEKDAY} from '@/config/analysisSelect.js'
// import ZQFXGLOBAL from '@/components/pages/stock/zqfxData.vue'
export default {
  components: {},
  data () {
    return {
      progressType: '0',
      month: '',
      day: '',
      before: '',
      after: '',
      before2: '',
      after2: '',
      before3: '',
      after3: '',
      case2Month: '',
      case3Month: '',
      case3Week: '',
      case4Week: '',
      case5WeekDay: '',
      case6Quarter: '',
      case7Important: '',
      case8Other: '',
      typeList: TYPE,
      case2MonthList: MONTH,
      case3MonthList: MONTH,
      case3WeekList: WEEK,
      case4WeekList: WEEK,
      case5WeekDayList: WEEKDAY,
      case6QuarterList: QUARTER,
      case7ImportantList: [],
      case8OtherList: [],
      zqfxData: [],
      objArr: [],
      retRiseName: '相对指数涨幅',
      toLoading: false
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    initial () {
      var that = this
      // 获取当季当月当周数据
      var curParams = that.$route.params.stockcode
      var market = curParams.substr(0, 2)
      var stockCode = curParams.substr(2)
      var myDate = new Date()
      var month = myDate.getMonth() + 1
      var week = myDate.getDay()
      var quarter
      if (month === 1 || month === 2 || month === 3) {
        quarter = '1'
      } else if (month === 4 || month === 5 || month === 6) {
        quarter = '2'
      } else if (month === 7 || month === 8 || month === 9) {
        quarter = '3'
      } else if (month === 10 || month === 11 || month === 12) {
        quarter = '4'
      }
      // 初始获取每月当周、每年当月、每年当季数据
      this.objArr = [
        { userId: '001', userType: '0', level: '0', filterIds: stockCode, type: '4', weekNo: week },
        { userId: '001', userType: '0', level: '0', filterIds: stockCode, type: '2', monthNo: month },
        { userId: '001', userType: '0', level: '0', filterIds: stockCode, type: '6', quarterNo: quarter }
      ]
      that.objArr.forEach(function (item, index, arr) {
        if (index === 0) {
          that.getData(item, '每月当周', true)
        } else if (index === 1) {
          that.getData(item, '每年当月', true)
        } else if (index === 2) {
          that.getData(item, '每年当季', true)
        }
      })
      // 获取重要节日
      this.getFestival()
      // 相对指数涨幅 名称判断
      if (market === 'SH') {
        this.retRiseName = '相对上证指数涨幅'
      } else {
        this.retRiseName = '相对深证成指涨幅'
      }
    },
    // 点击"我要分析"结果
    toResult () {
      var that = this
      var curParams = that.$route.params.stockcode
      var stockCode = curParams.substr(2)
      that.toLoading = true
      if (that.progressType === '0') {
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '0',
          month: that.month,
          day: that.day,
          before: that.before,
          after: that.after
        }, '当前查询周期')
      } else if (that.progressType === '2') {
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '2',
          monthNo: that.case2Month
        }, '当前查询周期')
      } else if (that.progressType === '3') {  // 某月某周
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '3',
          monthNo: that.case3Month,
          weekNo: that.case3Week
        }, '当前查询周期')
      } else if (that.progressType === '4') {  // 每月某周
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '4',
          weekNo: that.case4Week
        }, '当前查询周期')
      } else if (that.progressType === '5') {
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '5',
          weekdayNo: that.case5WeekDay
        }, '当前查询周期')
      } else if (that.progressType === '6') {
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '6',
          quarterNo: that.case6Quarter
        }, '当前查询周期')
      } else if (that.progressType === '7') {
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '7',
          before: that.before2,
          after: that.after2,
          holidayId: that.case7Important
        }, '当前查询周期')
      } else if (that.progressType === '8') {
        that.getData2({
          userId: '001',
          userType: '0',
          level: '0',
          filterIds: stockCode,
          type: '7',
          before: that.before3,
          after: that.after3,
          holidayId: that.case8Other
        }, '当前查询周期')
      }
    },
    getFestival () {
      this.$http.getImportantFestival().then(result => {
        this.case7ImportantList = result.data.data
        this.case7ImportantList.forEach(ele => {
          ele.label = ele.holidayName
          ele.value = ele.holidayId
        })
      })
      this.$http.getOtherFestival().then(result => {
        this.case8OtherList = result.data.data
        this.case8OtherList.forEach(ele => {
          ele.label = ele.holidayName
          ele.value = ele.holidayId
        })
      })
    },
    getData (rcObj, levelName, initianl) {
      // 获取周期分析结果
      var that = this
      this.$http.getperiodAnalysis(rcObj).then(result => {
        if (initianl) {
          var newArr = result.data.itemList.slice(0, 1)
        } else {
          newArr = result.data.itemList
        }
        if (that.progressLevel === '0') {
          newArr.forEach(ele => {
            ele.time = levelName
            ele.objName = ele.objName + '(' + ele.objId + ')'
            ele.riseProb = parseInt(ele.riseProb * ele.occurTimes)
            ele.avgRise = parseFloat(ele.avgRise).toFixed(2) + '%'
            ele.retRise = parseFloat(ele.retRise).toFixed(2) + '%'
            ele.action = '+'
          })
        } else {
          newArr.forEach(ele => {
            ele.time = levelName
            ele.riseProb = parseInt(ele.riseProb * ele.occurTimes)
            ele.avgRise = parseFloat(ele.avgRise).toFixed(2) + '%'
            ele.retRise = parseFloat(ele.retRise).toFixed(2) + '%'
            ele.action = '+'
          })
        }
        for (var i = 0; i < newArr.length; i++) {
          that.zqfxData.push(newArr[i])
        }
      })
    },
    getData2 (rcObj, levelName) {
      // 获取周期分析结果
      var that = this
      this.$http.getperiodAnalysis(rcObj).then(result => {
        that.toLoading = false
        that.zqfxData = result.data.itemList
        console.log(that.zqfxData)
        if (that.progressLevel === '0') {
          that.zqfxData.forEach(ele => {
            ele.time = levelName
            ele.objName = ele.objName + '(' + ele.objId + ')'
            ele.riseProb = parseInt(ele.riseProb * ele.occurTimes)
            ele.avgRise = parseFloat(ele.avgRise).toFixed(2) + '%'
            ele.retRise = parseFloat(ele.retRise).toFixed(2) + '%'
            ele.action = '+'
          })
        } else {
          that.zqfxData.forEach(ele => {
            ele.time = levelName
            ele.riseProb = parseInt(ele.riseProb * ele.occurTimes)
            ele.avgRise = parseFloat(ele.avgRise).toFixed(2) + '%'
            ele.retRise = parseFloat(ele.retRise).toFixed(2) + '%'
            ele.action = '+'
          })
        }
      })
    },
    // 下拉框切换数据变换
    selectChange1: function (value) {
      this.progressType = value
    },
    selectChange2: function (value) {
      this.case2Month = value
    },
    selectChange3: function (value) {
      this.case3Month = value
    },
    selectChange4: function (value) {
      this.case3Week = value
    },
    selectChange5: function (value) {
      this.case4Week = value
    },
    selectChange6: function (value) {
      this.case5WeekDay = value
    },
    selectChange7: function (value) {
      this.case6Quarter = value
    },
    // 颜色控制
    riseDropDiff (row, column, index) {
      if (parseFloat(row.avgRise) >= 0) {
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
  td:nth-child(5){
    color: #e63f52;
  }
}
.styleFlagDrop{
  td:nth-child(3),
  td:nth-child(4),
  td:nth-child(5){
    color: #1abc9c;
  }
}
.right-par{
  position: relative;
  .loading{
    left: 20%;
    top: 20%;
  }
}
</style>



