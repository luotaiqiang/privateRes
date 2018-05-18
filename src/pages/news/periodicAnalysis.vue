<!--
@Author:duyun
@Date:2018-01-30
@Description: 页面-周期分析
-->
<template>
  <div id="index">
    <theader :popZxg="popZxg"></theader>
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix">
      <div class="condition-wrapper preiodic">
        <div class="condition-content clearfix">
          <div class="left-par">
            <span class="segment segment1">我想知道</span>
            <el-select class="progress-change" v-model="progressLevel" placeholder="请选择" size="small" @change="selectChange1">
              <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="select2 po-re">
              <input :plain="true" v-if="this.progressLevel === '0'" class="num-input num-input-big" type="text" v-model="stkcode" placeholder="股票代码（选填，多个股票用逗号隔开）">
              <input v-if="this.progressLevel === '1'" class="num-input num-input-big" type="number" v-model="bkcode" placeholder="请输入板块简称（选填）">
              <el-select v-if="this.progressLevel === '2'" class="progress-change big" v-model="indexValue" placeholder="请选择" size="small" @change="selectChange2">
                <el-option v-for="item in indexList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </span>
            <el-select class="progress-change mid" v-model="progressType" placeholder="请选择" size="small" @change="selectChange3">
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
                <el-select class="progress-change" v-model="case2Month" placeholder="请选择" size="small" @change="selectChange4">
                  <el-option v-for="item in case2MonthList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                的 上 涨 规 律
              </span>
              <!-- 某月的某周 -->
              <span class="must" v-if="this.progressType === '3'">
                <el-select class="progress-change" v-model="case3Month" placeholder="请选择" size="small"  @change="selectChange5">
                  <el-option v-for="item in case3MonthList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <el-select class="progress-change" v-model="case3Week" placeholder="请选择" size="small" @change="selectChange6">
                  <el-option v-for="item in case3WeekList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                的 上 涨 规 律
              </span>
              <!-- 每月的某周 -->
              <span class="must" v-if="this.progressType === '4'">
                <el-select class="progress-change" v-model="case4Month" placeholder="请选择" size="small" @change="selectChange7">
                  <el-option v-for="item in case4WeekList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                的 上 涨 规 律
              </span>
              <!-- 每周的周几 -->
              <span class="must" v-if="this.progressType === '5'">
                <el-select class="progress-change" v-model="case5WeekDay" placeholder="请选择" size="small" @change="selectChange8">
                  <el-option v-for="item in case5WeekDayList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                的 上 涨 规 律
              </span>
              <!-- 每年的某季度 -->
              <span class="must" v-if="this.progressType === '6'">
                <el-select class="progress-change" v-model="case6Quarter" placeholder="请选择" size="small" @change="selectChange9">
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
                <input class="num-input" type="number" min="1" v-model="before7"> 天 至 后
                <input class="num-input" type="number" min="1" v-model="after7"> 天 的 上 涨 规 律
              </span>
              <!-- 其他节日 -->
              <span class="must" v-if="this.progressType === '8'">
                <el-select class="progress-change" v-model="case8Other" placeholder="请选择" size="small" @change="selectChange7">
                  <el-option v-for="item in case8OtherList" :key="item.holidayId" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                前
                <input class="num-input" type="number" min="1" v-model="before8"> 天 至 后
                <input class="num-input" type="number" min="1" v-model="after8"> 天 的 上 涨 规 律
              </span>
            </span>
          </div>
          <div class="right-par">
            <el-button type="primary" @click="toResult()">我要分析<i class="loading" v-if="toLoading"></i></el-button>

          </div>
        </div>
      </div>
      <div class="result-wrapper zqfx-result-wrapper">
        <div class="condition-bar">
          <h1 class="title-bar">投顾机器人关注所选时间维度，统计历史数据，为您找到表现较好标的：</h1>
        </div>
        <el-table
          :data="biaodiData"
          border
          style="width: 100%"
          :row-class-name="riseDropDiff">
          <el-table-column prop="objName" label="标的名称"></el-table-column>
          <el-table-column prop="occurTimes" label="统计次数" sortable></el-table-column>
          <el-table-column prop="riseTimes" label="上涨次数" sortable></el-table-column>
          <el-table-column prop="avgRise" label="平均涨幅" sortable></el-table-column>
          <el-table-column prop="retRise" label="平均涨幅（相对指数）"></el-table-column>
          <el-table-column prop="action" label="加自选"></el-table-column>
        </el-table>
        <div class="note-des">
          标的名称：在所选时间维度内，价格表现较好标的。<br/>
          统计次数：在所选时间维度内，标的物有价格涨跌的次数。<br/>
          上涨次数：在所选时间维度内，所有统计次数中标的物最终上涨的次数。<br/>
          平均涨幅：所有统计次数中涨跌幅的平均值（所有涨跌幅求和然后除以统计次数）。<br/>
          相对指数涨幅：上述平均涨幅减去沪深300平均涨幅，得到剔除指数影响后的结果。
        </div>
      </div>
    </div>
    <gtjaFooter></gtjaFooter>
  </div>
</template>

<script>
import theader from '@/components/commen/theader.vue'
import topMenu from '@/components/commen/topMenu.vue'
import gtjaFooter from '@/components/commen/footer.vue'
import {level as LEVEL, type as TYPE, index as INDEX, month as MONTH, week as WEEK, quarter as QUARTER, weekDay as WEEKDAY} from '@/config/analysisSelect.js'
import $ from 'jquery'
export default {
  name: 'periodicAnalysis',
  data () {
    return {
      anaKeyWord: '',
      progressLevel: this.urlPars().level,
      progressType: this.urlPars().type,
      indexValue: '',
      stkcode: '',
      bkcode: '',
      month: '',
      day: '',
      before: '',
      after: '',
      before7: '',
      after7: '',
      before8: '',
      after8: '',
      case2Month: '',
      // case3Month: this.urlPars().monthNo,
      case3Month: '',
      case3Week: '',
      case4Month: '',
      case5WeekDay: '',
      case6Quarter: '',
      case7Important: '',
      case8Other: '',
      levelList: LEVEL,
      typeList: TYPE,
      indexList: INDEX,
      case2MonthList: MONTH,
      case3MonthList: MONTH,
      case3WeekList: WEEK,
      case4WeekList: WEEK,
      case5WeekDayList: WEEKDAY,
      case6QuarterList: QUARTER,
      case7ImportantList: [],
      case8OtherList: [],
      /* 相关标的涨幅数据 */
      biaodiData: [],
      popZxg: false,
      toLoading: false
    }
  },
  components: {
    theader,
    topMenu,
    gtjaFooter
  },
  mounted () {
    var that = this
    switch (parseInt(that.urlPars().type)) {
      case 2:
        that.case2Month = that.urlPars().monthNo
        that.getData({
          userId: '001',
          userType: '0',
          level: that.urlPars().level,
          type: that.urlPars().type,
          monthNo: that.urlPars().monthNo
        })
        break
      case 4:
        that.case4Month = that.urlPars().weekNo
        that.getData({
          userId: '001',
          userType: '0',
          level: that.urlPars().level,
          type: that.urlPars().type,
          weekNo: that.urlPars().weekNo
        })
        break
      case 6:
        that.case6Quarter = this.urlPars().quarterNo
        that.getData({
          userId: '001',
          userType: '0',
          level: that.urlPars().level,
          type: that.urlPars().type,
          quarterNo: that.urlPars().quarterNo
        })
        break
      // case 0:
      //   that.getData({
      //     userId: '001',
      //     userType: '0',
      //     level: that.urlPars().level,
      //     type: that.urlPars().type,
      //     month: that.urlPars().month,
      //     day: that.urlPars().day,
      //     before: that.urlPars().before,
      //     after: that.urlPars().after
      //   })
      //   break
      // case 4:
      //   that.getData({
      //     userId: '001',
      //     userType: '0',
      //     level: that.urlPars().level,
      //     type: that.urlPars().type,
      //     weekNo: that.urlPars().weekNo
      //   })
      //   break
      // case 5:
      //   that.getData({
      //     userId: '001',
      //     userType: '0',
      //     level: that.urlPars().level,
      //     type: that.urlPars().type,
      //     weekDayNo: that.urlPars().weekDayNo
      //   })
      //   break
      // case 6:
      //   that.getData({
      //     userId: '001',
      //     userType: '0',
      //     level: that.urlPars().level,
      //     type: that.urlPars().type,
      //     quarterNo: that.urlPars().quarterNo
      //   })
      //   break
      // case 7:
      //   that.getData({
      //     userId: '001',
      //     userType: '0',
      //     level: that.urlPars().level,
      //     type: that.urlPars().type,
      //     holidayId: that.urlPars().holidayId,
      //     before: that.urlPars().before,
      //     after: that.urlPars().after
      //   })
      //   break
      // case 8:
      //   that.getData({
      //     userId: '001',
      //     userType: '0',
      //     level: that.urlPars().level,
      //     type: that.urlPars().type,
      //     holidayId: that.urlPars().holidayId,
      //     before: that.urlPars().before,
      //     after: that.urlPars().after
      //   })
      //   break
    }
    this.getFestival()
  },
  // watch: {
  //   stkcode: function () {
  //     this.$message('多个股票代码请用逗号隔开')
  //   }
  // },
  methods: {
    istoLogin () {
      this.popZxg = true
    },
    judge (i) {
      if ($('.must').length === i) {
        console.log('i')
      }
    },
    // 我要分析点击结果
    toResult () {
      var that = this
      console.log(that.stkcode)
      var filterIds = ''
      that.toLoading = true
      switch (that.progressLevel) {
        case '0':
          filterIds = that.stkcode
          break
        case '1':
          filterIds = that.bkcode
          break
        case '2':
          filterIds = that.indexValue
          break
      }
      if (that.progressType === '0') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '0',
            month: that.month,
            day: that.day,
            before: that.before,
            after: that.after
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '0',
            month: that.month,
            day: that.day,
            before: that.before,
            after: that.after
          })
        }
      } else if (that.progressType === '2') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '2',
            monthNo: that.case2Month
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '2',
            monthNo: that.case2Month
          })
        }
      } else if (that.progressType === '3') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '3',
            monthNo: that.case3Month,
            weekNo: that.case3Week
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '3',
            monthNo: that.case3Month,
            weekNo: that.case3Week
          })
        }
      } else if (that.progressType === '4') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '4',
            weekNo: that.case4Month
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '4',
            weekNo: that.case4Month
          })
        }
      } else if (that.progressType === '5') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '5',
            weekdayNo: that.case5WeekDay
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '5',
            weekdayNo: that.case5WeekDay
          })
        }
      } else if (that.progressType === '6') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '6',
            quarterNo: that.case6Quarter
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '6',
            quarterNo: that.case6Quarter
          })
        }
      } else if (that.progressType === '7') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '7',
            holidayId: that.case7Important,
            before: that.before7,
            after: that.after7
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '7',
            holidayId: that.case7Important,
            before: that.before7,
            after: that.after7
          })
        }
      } else if (that.progressType === '8') {
        if (filterIds === '') {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            type: '8',
            holidayId: that.case8Other,
            before: that.before8,
            after: that.after8
          })
        } else {
          that.getData({
            userId: '001',
            userType: '0',
            level: that.progressLevel,
            filterIds: filterIds,
            type: '8',
            holidayId: that.case8Other,
            before: that.before8,
            after: that.after8
          })
        }
      }
    },
    // 获取节日
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
    // 获取接口数据
    getData (rcObj) {
      var that = this
      this.$http.getperiodAnalysis(rcObj).then(result => {
        that.toLoading = false
        that.biaodiData = result.data.itemList
        console.log(that.biaodiData)
        that.biaodiData.forEach(ele => {
          if (ele.objId === '') {
            ele.avgRise = parseFloat(ele.avgRise).toFixed(2) + '%'
            ele.retRise = parseFloat(ele.retRise).toFixed(2) + '%'
            ele.action = '+'
          } else {
            ele.objName = ele.objName + '(' + ele.objId + ')'
            ele.avgRise = parseFloat(ele.avgRise).toFixed(2) + '%'
            ele.retRise = parseFloat(ele.retRise).toFixed(2) + '%'
            ele.action = '+'
          }
        })
      })
    },
    // 下拉框值变动
    selectChange1: function (value) {
      this.progressType = '0'
      this.progressLevel = value
    },
    selectChange2: function (value) {
      this.indexValue = value
    },
    selectChange3: function (value) {
      this.case2Month = ''
      this.case4Month = ''
      this.case6Quarter = ''
      this.progressType = value
    },
    selectChange4: function (value) {
      this.case2Month = value
    },
    selectChange5: function (value) {
      this.case3Month = value
    },
    selectChange6: function (value) {
      this.case3Week = value
    },
    selectChange7: function (value) {
      this.case4Month = value
    },
    selectChange8: function (value) {
      this.case6Quarter = value
    },
    selectChange9: function (value) {
      this.case6Quarter = value
    },
    // 控制颜色
    riseDropDiff (row, index) {
      if (parseFloat(row.avgRise) >= 0) {
        return 'styleFlagRise'
      } else {
        return 'styleFlagDrop'
      }
    },
    // 解析location search
    urlPars () {
      var qs = location.search.length > 0 ? location.search.substr(1) : ''
      var args = {}
      var items = qs.length > 0 ? qs.split('&') : []
      var item = null
      var name = null
      var value = null
      var len = items.length
      for (var i = 0; i < len; i++) {
        item = items[i].split('=')
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if (name.length) {
          args[name] = value
        }
      }
      return args
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/normalize.less";
@import "../../assets/less/base.less";
@import "../../assets/less/commen/analysis.less";
.zqfx-result-wrapper{
  .styleFlagRise{
    td:nth-child(6){
      color: #333;
    }
  }
}
.el-button.el-button--primary{
  position: relative;
  .loading{
    left: 50px;
    top: 20%;
  }
}
.note-des{
  line-height: 1.8em;
  padding: 8px 0;
  color: #5e7382;
}
</style>
