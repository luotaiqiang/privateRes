<!--
@Author:duyun
@Date:2018-01-30
@Description: 模板-月日历
-->
<template>
  <div class="month-tab">
    <div class="top-select">
      <span v-for="(item, index) in buttonList" :key="item.id" :class="{active: index === isSelect1}" @click="buttonEvent(index)">{{item.value}}</span>
    </div>
    <ul class="month-ul clearfix">
      <li :class="{active: index === isSelect}" @click="renderMonthData(index, item, $event)" v-for="(item, index) in monthList" :key="item.value">{{item.value}}</li>
    </ul>
    <ul class="week-ul clearfix">
      <li v-for="item in weekList" :key="item.value">{{item.value}}</li>
    </ul>
    <ul class="event-ul clearfix">
      <li :class="{active: index === isSelect2}" @click="addClass2(index, item, $event)" v-for="(item, index) in monthEventBoxList" :key="item.id">
        <div class="event-data">{{item.date}}</div>
        <ul class="event-main">
          <li v-for="event in item.macroData" :key="event.id" @click="toEventAnalysisi(event)">
            <span>{{event}}</span>
          </li>
          <li v-for="event in item.majorEvent" :key="event.id" @click="toEventAnalysisi(event)">
            <span>{{event}}</span>
          </li>
          <li v-for="events in item.performanceReport" :key="events.id" @click="toPopUp(item, index, events, $event)">
            <span class="btn">{{events.abstractName}}</span>
            <span>{{events.infoNum}}家{{events.infoType}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <event-pop :popData="popData" :title="title" :pop1="pop1" :pop2="pop2" :pop="pop" :closePop="closePop"></event-pop>
  </div>
</template>

<script>
import eventPop from '@/components/pages/news/eventPop.vue'
import {buttonList as BUTTONLIST} from '@/config/canlendarButton.js'
import {
  monthList as MONTHLIST,
  weekList as WEEKLIST
} from '@/config/canlendar.js'
function generateBlankObj () {
  return {
    date: '',
    macroData: [],
    majorEvent: [],
    performanceReport: []
  }
}
export default {
  components: {
    eventPop
  },
  data () {
    return {
      monthList: MONTHLIST,
      weekList: WEEKLIST,
      monthEventBoxList: [],
      // 月份选中
      isSelect: this.$date.dateInfo().month,
      isSelect1: 0,
      isSelect2: false,
      /* 当月第一天是周几 */
      firstDay: 1,
      popData: [],
      title: '',
      pop: false,
      pop1: false,
      pop2: false,
      userCode: '12',
      userType: 1,
      buttonList: BUTTONLIST,
      userId: '12'
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
    // 获取投资日厉数据
    this.renderMonth(this.$date.dateInfo().month,
      this.$http.getCalendar, {
        userId: this.userId,
        userType: '0',
        time: this.$date.dateInfo().fullYear + '-' + this.$date.numFormat(Number(this.$date.numFormat(this.$date.dateInfo().month)) + 1)
      }
    )
  },
  methods: {
    addClass2 (index, item, event) {
      if (event && event.type === 'click') {
        this.isSelect2 = index
      } else {
        this.isSelect2 = index - 1 + this.firstDay - 1
      }
    },
    // 渲染投资日历月视图，月使用真实月份 - 1
    renderMonth (month, httpApi, obj, item, event) {
      httpApi(obj)
        .then(result => {
          this.monthEventBoxList = []
          if (String(result.data.success) === 'true') {
            this.firstDay = this.$date.firstDay(month)
            var tmpFirstDay = this.$date.firstDay(month)
            var canlenData = result.data.itemList
            canlenData.sort(function (a, b) {
              return (a.date < b.date) ? -1 : 1
            })
            // 根据当月天数，补全数组
            var daysInMonth = this.$date.daysInMonth(month, this.$date.dateInfo().fullYear)
            for (let i = 1; i <= daysInMonth; i++) {
              var strIndex = this.$date.numFormat(i)
              if (canlenData[i - 1]) {
                if (canlenData[i - 1].date.indexOf('-' + strIndex) === -1) {
                  canlenData.splice(i - 1, 0, Object.assign(generateBlankObj(), {date: this.$date.dateInfo().fullYear.toString() + '-' + this.$date.numFormat(month + 1) + '-' + this.$date.numFormat(i)}))
                }
              } else {
                canlenData.splice(i - 1, 0, Object.assign(generateBlankObj(), {date: this.$date.dateInfo().fullYear.toString() + '-' + this.$date.numFormat(month + 1) + '-' + this.$date.numFormat(i)}))
              }
            }

            // 添加上月剩余空位
            for (let i = 0; i < tmpFirstDay - 1; i++) {
              canlenData.splice(i, 0, Object.assign(generateBlankObj(), {
                date: this.$date.dateInfo().fullYear.toString() + '-' + this.$date.numFormat(month) + '-' + new Date(this.$date.dateInfo().fullYear.toString(), month, (i - (tmpFirstDay - 2))).getDate()}
              ))
            }
            this.monthEventBoxList = canlenData
            // 月历中事件初始化
            if (!event) {
              this.addClass2(this.$date.dateInfo().date)
            } else {
              this.isSelect2 = ''
            }
          }
        })
    },
    // 事件弹框
    toPopUp (item, index, events, event) {
      switch (events.infoType) {
        case '业绩预告':
          this.title = item.date + '等' + events.infoNum + '发布业绩预告'
          this.pop = true
          this.pop1 = true
          this.pop2 = false
          this.$http.getPerformanceForecast({
            userType: '001',
            time: item.date
          }).then(result => {
            this.popData = result.data.itemList
            this.popData.forEach(ele => {
              ele.netProfit = parseFloat(ele.netProfit).toFixed(2)
              ele.eGrowthRate = parseFloat(ele.eGrowthRateFloor).toFixed(2) + '% ~ ' + parseFloat(ele.eGrowthRateCeil).toFixed(2) + '%'
            })
          })
          break
        case '业绩报表':
          this.title = item.date + '等' + events.infoNum + '发布业绩报表'
          this.pop = true
          this.pop2 = true
          this.pop1 = false
          this.$http.getPerformanceReport({
            userType: '001',
            time: item.date
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
          this.title = item.date + '等' + events.infoNum + '发布业绩快报'
          this.pop = true
          this.pop2 = true
          this.pop1 = false
          this.$http.getPerformanceLetter({
            userType: '001',
            time: item.date
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
          this.title = item.date + '等' + events.infoNum + '发布业绩披露'
          this.pop = true
          this.pop2 = true
          this.pop1 = false
          this.$http.getPerformanceExpose({
            userType: '001',
            time: item.date
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
    // 关闭事件弹窗
    closePop () {
      this.pop = false
    },
    // 页面跳转（事件分析）
    toEventAnalysisi (event) {
      window.location.href = `hotAnalysis.html?keyword=${event}&topicId=&userCode=${this.userCode}&userType=${this.userType}`
    },
    // 不同月份在不同事件类型查询接口
    renderMonthData (index) {
      this.isSelect = index
      var thatMonth2 = index + 1
      if (thatMonth2 < 10) {
        thatMonth2 = '0' + thatMonth2
      }
      switch (this.isSelect1) {
        case 0:
          this.renderMonth(index, this.$http.getCalendar, {
            userId: this.userId,
            userType: '0',
            time: this.$date.dateInfo().fullYear + '-' + thatMonth2
          })
          break
        case 1:
          this.renderMonth(index,
            this.$http.getMajorEvent, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth2
            }
          )
          break
        case 2:
          this.renderMonth(index,
            this.$http.getMacroData, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth2
            }
          )
          break
        case 3:
          this.renderMonth(index,
            this.$http.getPerformancePeport, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth2
            }
          )
          break
      }
    },
    // 按事件类型查询接口
    buttonEvent (index) {
      var thatMonth = this.isSelect + 1
      if (thatMonth < 10) {
        thatMonth = '0' + thatMonth
      }
      this.isSelect1 = index
      console.log(this.$date.dateInfo().month)
      switch (index) {
        case 0:
          this.renderMonth(this.isSelect,
            this.$http.getCalendar, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth
            }
          )
          break
        case 1:
          this.renderMonth(this.isSelect,
            this.$http.getMajorEvent, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth
            }
          )
          break
        case 2:
          this.renderMonth(this.isSelect,
            this.$http.getMacroData, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth
            }
          )
          break
        case 3:
          this.renderMonth(this.isSelect,
            this.$http.getPerformancePeport, {
              userId: this.userId,
              userType: '0',
              time: this.$date.dateInfo().fullYear + '-' + thatMonth
            }
          )
          break
      }
    }
  }
}
</script>

<style lang="less">
.top-select{
  background: #6089DF;
  color: #fff;
  height: 49px;
  line-height: 49px;
  padding: 0 20px;
  border-radius: 12px 12px 0 0;
  &>span{
    cursor: default;
    padding: 7px 9px;
    border:1px solid #6089DF;
    margin-right: 10px;
    &.active{
      line-height: 1;
      white-space: nowrap;
      background: #fff;
      border: 1px solid #c4c4c4;
      color: #1f2d3d;
      border-radius: 5px
    }
  }
}
.month-ul,.week-ul{
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  border-bottom:1px solid #dfe6ec;
  li{
    float: left;
    text-align: center;
  }
}
.month-ul{
  border-right: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  background: #eef1f6;
  &>li{
    transition: all .2s;
    width: 8.33%;
    &.active{
      background: #0055a2;
      color: #fff;
    }
  }
}
.week-ul{
  border-right: 1px solid #dfe6ec;
  border-left: 1px solid #dfe6ec;
  &>li{
    width: 14.28%;
    &.active {
      color: #0055a2;
    }
  }
}
.event-ul{
  border-left: 1px solid #dfe6ec;
  &>li{
    min-height: 130px;
    float: left;
    width: 14.2857142%;
    text-align: right;
    border-right: 1px solid #dfe6ec;
    border-bottom: 1px solid #dfe6ec;
    transition: all .2s;
    cursor: pointer;
    &.active{
      background: #fff;
      box-shadow: 0 0 8px #444;
      position: relative
    }
  }
  .event-data{
    height: 23px;
    padding: 5px;
    background: #eef1f6;
  }
  .event-main{
    padding: 10px 5px;
    line-height: 2em;
    color: #0055a2;
    li{
      cursor: pointer;
    }
    .btn{
      display: inline-block;
      width: 5em;
      text-align: center;
      background: #a1bcda;
      color: #fff;
      border-radius: 3px;
      margin-right: 5px;
      &.none{
        padding: 0;
      }
    }
  }
}
.month-tab{
  .event-main{
    height: 200px;
    overflow-y: auto;
  }
}
</style>


