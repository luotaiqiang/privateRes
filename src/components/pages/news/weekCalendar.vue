<!--
@Author:duyun
@Date:2018-01-30
@Description: 模板-周日历
-->
<template>
  <div class="week-tab">
    <div class="top-select">
      <span v-for="(item, index) in buttonList" :key="item.id" :class="{active: index === isSelect}" @click="buttonEvent(index)">{{item.value}}</span>
    </div>
    <ul class="month-ul clearfix">
      <li v-for="(item, index) in dayList" :key="item.value">{{item.value}}</li>
    </ul>
    <ul class="month-ul clearfix">
      <li v-for="item in weekList" :key="item.value">{{item.value}}</li>
    </ul>
    <ul class="event-ul clearfix">
      <li :class="{active: index === isSelect2}" @click="addClass2(index, item)" v-for="(item, index) in weekEventBoxList" :key="item.id">
        <ul class="event-main">
          <li v-for="event in item.macroData" :key="event.id" @click="toEventAnalysisi(event)">{{event}}</li>
          <li v-for="event in item.majorEvent" :key="event.id" @click="toEventAnalysisi(event)">{{event}}</li>
          <li v-for="notice in item.performanceReport" :key="notice.infoNum" @click="toPopUp(item, index, notice, $event)">
            <span class="btn">{{notice.abstractName}}</span>{{notice.infoNum}}家{{notice.infoType}}
          </li>
        </ul>
      </li>
    </ul>
    <event-pop :popData="popData" :title="title" :pop1="pop1" :pop2="pop2" :pop="pop" :closePop="closePop"></event-pop>
  </div>
</template>

<script>
import eventPop from '@/components/pages/news/eventPop.vue'
import {weekList as WEEKLIST} from '@/config/canlendar.js'
import {buttonList as BUTTONLIST} from '@/config/canlendarButton.js'
export default {
  components: {
    eventPop
  },
  data () {
    return {
      dayList: [],
      eventArr: [],
      newArr: [],
      weekList: WEEKLIST,
      weekEventBoxList: [],
      buttonList: BUTTONLIST,
      // 月份选中
      isSelect: 0,
      isSelect2: '',
      daysOfThisWeek: [],
      popData: [],
      title: '',
      pop: false,
      pop1: false,
      pop2: false,
      userCode: '12',
      userType: 1,
      userId: '001',
      timeArr: []
    }
  },
  created () {
    if (localStorage.getItem('mobile') !== null) {
      this.userId = localStorage.getItem('mobile')
    } else {
      this.userId = '12'
    }
  },
  mounted () {
    this.getData(this.$date.dateInfo().month,
      this.$http.getCalendar, {
        userId: this.userId,
        userType: '0',
        time: this.$date.dateInfo().fullYear + '-' + this.$date.numFormat(parseInt(this.$date.numFormat(this.$date.dateInfo().month)) + 1)
      }
    )
    // 事件选择初始化
    this.addClass2()
    // 获取当周日期
    this.getDay()
  },
  methods: {
    addClass2 (index, item) {
      this.isSelect2 = index
    },
    // 查询当前周的日期及对应星期
    getDay () {
      const dateOfToday = Date.now()
      const dayOfToday = (new Date().getDay() + 7 - 1) % 7
      this.daysOfThisWeek = Array.from(new Array(7))
      .map((_, i) => {
        const date = new Date(dateOfToday + (i - dayOfToday) * 1000 * 60 * 60 * 24)
        return date.getFullYear() +
          '-' +
          String(date.getMonth() + 1).padStart(2, '0') +
          '-' +
          String(date.getDate()).padStart(2, '0')
      })
      for (let i = 0; i < 7; i++) {
        this.dayList.push({
          value: this.daysOfThisWeek[i]
        })
      }
    },
    getData (month, httpApi, obj) {
      httpApi(obj).then(result => {
        var eventArr = result.data.itemList
        // 根据日期大小排列
        eventArr.sort(function (a, b) {
          return (a.date < b.date) ? -1 : 1
        })
        this.weekEventBoxList = JSON.parse(JSON.stringify(this.dayList))
        console.log(this.dayList)
        // 根据当前周筛选出对应数据
        for (var i = 0; i < this.weekEventBoxList.length; i++) {
          for (var j = 0; j < eventArr.length; j++) {
            if (String(this.weekEventBoxList[i].value) === String(eventArr[j].date)) {
              this.weekEventBoxList[i].macroData = eventArr[j].macroData
              this.weekEventBoxList[i].majorEvent = eventArr[j].majorEvent
              this.weekEventBoxList[i].performanceReport = eventArr[j].performanceReport
            }
          }
        }
      })
    },
    // 事件弹框
    toPopUp (item, index, notice, event) {
      switch (notice.infoType) {
        case '业绩预告':
          this.title = this.dayList[index].value + '等' + notice.infoNum + '发布业绩预告'
          this.pop = true
          this.pop1 = true
          this.pop2 = false
          this.$http.getPerformanceForecast({
            userType: '001',
            time: this.dayList[index].value
          }).then(result => {
            this.popData = result.data.itemList
            this.popData.forEach(ele => {
              ele.netProfit = parseFloat(ele.netProfit).toFixed(2)
              ele.eGrowthRate = parseFloat(ele.eGrowthRateFloor).toFixed(2) + '% ~ ' + parseFloat(ele.eGrowthRateCeil).toFixed(2) + '%'
            })
          })
          break
        case '业绩报表':
          this.title = this.dayList[index].value + '等' + notice.infoNum + '发布业绩报表'
          this.pop = true
          this.pop2 = true
          this.pop1 = false
          this.$http.getPerformanceReport({
            userType: '001',
            time: this.dayList[index].value
          }).then(result => {
            this.popData = result.data.itemList
            this.popData.forEach(ele => {
              if (String(ele.parentCompanyOwnersMOM) === 'null') {
                ele.parentCompanyOwnersMOM = '--'
              } else {
                ele.parentCompanyOwnersMOM = parseFloat(ele.parentCompanyOwnersMOM * 100).toFixed(2) + '%'
              }
              if (String(ele.operatingRevenueMOM) === 'null') {
                ele.operatingRevenueMOM = '--'
              } else {
                ele.operatingRevenueMOM = parseFloat(ele.operatingRevenueMOM * 100).toFixed(2) + '%'
              }
              ele.roe = parseFloat(ele.roe).toFixed(2) + '%'
              ele.operatingRevenue = parseFloat(ele.operatingRevenue / 100000000).toFixed(4) + '亿'
              ele.parentCompanyOwners = parseFloat(ele.parentCompanyOwners / 100000000).toFixed(4) + '亿'
            })
          })
          break
        case '业绩快报':
          this.title = this.dayList[index].value + '等' + notice.infoNum + '发布业绩快报'
          this.pop = true
          this.pop2 = true
          this.pop1 = false
          this.$http.getPerformanceLetter({
            userType: '001',
            time: this.dayList[index].value
          }).then(result => {
            this.popData = result.data.itemList
            this.popData.forEach(ele => {
              if (String(ele.parentCompanyOwnersMOM) === 'null') {
                ele.parentCompanyOwnersMOM = '--'
              } else {
                ele.parentCompanyOwnersMOM = parseFloat(ele.parentCompanyOwnersMOM * 100).toFixed(2) + '%'
              }
              if (String(ele.operatingRevenueMOM) === 'null') {
                ele.operatingRevenueMOM = '--'
              } else {
                ele.operatingRevenueMOM = parseFloat(ele.operatingRevenueMOM * 100).toFixed(2) + '%'
              }
              ele.roe = parseFloat(ele.roe).toFixed(2) + '%'
              ele.operatingRevenue = parseFloat(ele.operatingRevenue / 100000000).toFixed(4) + '亿'
              ele.parentCompanyOwners = parseFloat(ele.parentCompanyOwners / 100000000).toFixed(4) + '亿'
            })
          })
          break
        case '业绩披露':
          this.title = this.dayList[index].value + '等' + notice.infoNum + '发布业绩披露'
          this.pop = true
          this.pop2 = true
          this.pop1 = false
          this.$http.getPerformanceExpose({
            userType: '001',
            time: this.dayList[index].value
          }).then(result => {
            this.popData = result.data.itemList
            this.popData.forEach(ele => {
              if (String(ele.parentCompanyOwnersMOM) === 'null') {
                ele.parentCompanyOwnersMOM = '--'
              } else {
                ele.parentCompanyOwnersMOM = parseFloat(ele.parentCompanyOwnersMOM * 100).toFixed(2) + '%'
              }
              if (String(ele.operatingRevenueMOM) === 'null') {
                ele.operatingRevenueMOM = '--'
              } else {
                ele.operatingRevenueMOM = parseFloat(ele.operatingRevenueMOM * 100).toFixed(2) + '%'
              }
              ele.roe = parseFloat(ele.roe).toFixed(2) + '%'
              ele.operatingRevenue = parseFloat(ele.operatingRevenue / 100000000).toFixed(4) + '亿'
              ele.parentCompanyOwners = parseFloat(ele.parentCompanyOwners / 100000000).toFixed(4) + '亿'
            })
          })
          break
      }
    },
    // 页面跳转（事件分析）
    toEventAnalysisi (event) {
      window.location.href = `hotAnalysis.html?keyword=${event}&topicId=&userCode=${this.userCode}&userType=${this.userType}`
    },
    // 关闭事件弹窗
    closePop () {
      this.pop = false
    },
    // 不同事件按钮
    buttonEvent (index) {
      this.isSelect = index
      switch (index) {
        case 0:
          this.getData(this.$date.dateInfo().month,
            this.$http.getCalendar, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + this.$date.numFormat(Number(this.$date.numFormat(this.$date.dateInfo().month)) + 1)
            }
          )
          break
        case 1:
          this.getData(this.$date.dateInfo().month,
            this.$http.getMajorEvent, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + this.$date.numFormat(Number(this.$date.numFormat(this.$date.dateInfo().month)) + 1)
            }
          )
          break
        case 2:
          this.getData(this.$date.dateInfo().month,
            this.$http.getMacroData, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + this.$date.numFormat(Number(this.$date.numFormat(this.$date.dateInfo().month)) + 1)
            }
          )
          break
        case 3:
          this.getData(this.$date.dateInfo().month,
            this.$http.getPerformancePeport, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + this.$date.numFormat(Number(this.$date.numFormat(this.$date.dateInfo().month)) + 1)
            }
          )
          break
      }
    }
  }
}
</script>

<style lang="less">
.week-tab{
  .event-ul > li{
    height: 650px;
    overflow-y: auto;
  }
  .month-ul li{
    width: 14.28%;
  }
}
.event-main{
  li{
    text-align: left;
    line-height: 1.5em;
    margin-bottom: 8px;
    word-break: break-all;
  }
}
</style>



