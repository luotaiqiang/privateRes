<!--
@Author:duyun
@Date:2018-01-30
@Description: 页面-热点分析
-->
<template>
  <div>
    <theader :popZxg="popZxg"></theader>
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix main">
      <div class="hot-search-box">
        <div class="input-box clearfix">
          <span class="search-label">我想要分析事件：</span>
          <input class="input-search" type="search" placeholder="搜索" v-model="anaKeyWord" @input="getChildTopic(anaKeyWord)">
        </div>
        <div class="child-topic-wrapper" v-if="showTopicPanel">
          <ul class="child-topic-ul">
            <li
              class="child-topic-li"
              v-for="item in childTopics"
              :key="item.id"
              :value="item.topicId"
              @click="showChildTopic(item.eventTitle, item.topicId)">{{item.eventTitle}}</li>
          </ul>
        </div>
      </div>
      <div class="condition-wrapper">
        <div class="condition-bar">
          <h1 class="title-bar">设置分析的时间窗</h1>
        </div>
        <div class="condition-content clearfix">
          <div class="left-par">
            <span class="segment segment1">开始时间：事件发生</span>
            <el-select class="progress-change" v-model="progress1" placeholder="请选择" size="small">
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="selectChange1">
              </el-option>
            </el-select>
            <input class="num-input" type="number" min="1" v-model="day1">
            <span class="segment segment2">个交易日&nbsp;&nbsp;结束时间：事件发生</span>
            <el-select class="progress-change" v-model="progress2" placeholder="请选择" size="small">
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                @change="selectChange2">
              </el-option>
            </el-select>
            <input class="num-input" type="number" min="1" v-model="day2">
            <span class="segment">个交易日</span>
          </div>
          <div class="right-par">
            <el-button type="primary" :disabled="selectedChildTopic === ''" @click="analysis">我要分析</el-button>
            <i class="loading" v-if="toLoading"></i>
          </div>
        </div>
      </div>
      <div class="result-wrapper">
        <div class="condition-bar">
          <h1 class="title-bar">投顾机器人统计历史数据，为您找到表现较好标的</h1>
        </div>
        <!-- <el-form ref="form">
          <el-form-item label="">
            <el-checkbox-group v-model="yanbao">
              <el-checkbox label="加入研报" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form> -->
        <el-table
          :data="biaodiData"
          border
          style="width: 100%"
          :row-class-name="riseDropDiff">
          <el-table-column prop="biaodiName" label="标的名称"></el-table-column>
          <!--<el-table-column prop="biaodiCode" label="标的代码"></el-table-column>-->
          <el-table-column prop="happenCount" label="统计次数" sortable></el-table-column>
          <el-table-column prop="riseRate" label="上涨次数" sortable></el-table-column>
          <el-table-column prop="avgZf" label="平均涨幅" sortable :formatter="numFix2"></el-table-column>
          <el-table-column prop="avgZfRelative" label="平均涨幅（相对指数）" :formatter="numFix2"></el-table-column>
          <el-table-column prop="action" label="加自选"></el-table-column>
        </el-table>
        <div class="note-des">
          标的名称：在选定的时间窗口内，价格表现较好标的。<br/>
          统计次数：在选定的时间窗口内，标的物有价格涨跌的次数。<br/>
          上涨次数：在选定的时间窗口内，所有统计次数中标的物最终上涨的次数。<br/>
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
export default {
  name: 'hotAnalysis',
  data () {
    return {
      anaKeyWord: '',
      childTopics: [],
      selectedChildTopic: '',
      btnDisabled: false,
      progress1: '之前',
      progress2: '之后',
      day1: 1,
      day2: 1,
      yanbao: true,
      showTopicPanel: false,
      timeOptions: [
        {
          value: 'before',
          label: '之前'
        },
        {
          value: 'after',
          label: '之后'
        }
      ],
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
    this.anaKeyWord = this.urlPars().keyword
    if (this.urlPars().topicId !== '') {
      this.selectedChildTopic = this.urlPars().topicId
      this.analysis()
    } else {
      this.getChildTopic(this.anaKeyWord)
    }
  },
  methods: {
    istoLogin () {
      this.popZxg = true
    },
    selectChange1: function (value) {
      this.progress1 = value
    },
    selectChange2: function (value) {
      this.progress2 = value
    },
    // 控制颜色
    riseDropDiff (row, index) {
      if (parseFloat(row.avgZf) >= 0) {
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
    },
    // 我要分析
    analysis () {
      this.toLoading = true
      this.$http.getEventAnalysis({
        userCode: this.urlPars().userCode,
        userType: this.urlPars().userType,
        topicId: this.selectedChildTopic,
        startTime: (this.progress1 === '之前' || this.progress1 === 'before') ? '-' + this.day1 : this.day1,
        endTime: (this.progress2 === '之前' || this.progress2 === 'before') ? '-' + this.day2 : this.day2
      }).then(result => {
        this.toLoading = false
        if (result.data.success === 'true') {
          var arr = result.data.itemList
          // var avgNum = 0
          // var i = 0
          // arr.forEach(function (item, index) {
          //   if (item.type === '2') {
          //     i++
          //     avgNum += parseFloat(item.meanChg)
          //   }
          // })
          // avgNum = avgNum / i
          // console.log(avgNum)
          arr.forEach(function (item, index) {
            item.biaodiName = item.objName
            item.biaodiCode = item.id
            item.happenCount = item.occurranceCount
            item.riseRate = Math.round(item.occurranceCount * item.victory / 100)
            item.avgZf = item.meanChg
            item.avgZfRelative = item.relativeRise
            // if (item.type !== '2') {
            //   item.avgZfRelative = parseFloat(item.meanChg) - avgNum
            // } else {
            //   item.avgZfRelative = 0
            // }
            item.action = '+'
          })
          this.biaodiData = arr
        }
      })
    },
    getChildTopic (val) {
      var that = this
      that.selectedChildTopic = ''
      this.$http.getTopic({
        userCode: this.urlPars().userCode,
        userType: this.urlPars().userType,
        keywords: val
      }).then(result => {
        if (result.data.success === 'true') {
          var arr = result.data.itemList
          arr.forEach(function (item, index) {
            if (item.topicId === '-1') {
              arr.splice(index, 1)
            }
          })
          this.childTopics = result.data.itemList
          that.showTopicPanel = true
        }
      })
    },
    // 小数换位百分数
    numFix2 (row, column) {
      return parseFloat(row[column.property]).toFixed(2) + '%'
    },
    // 将子话题传到输入框中
    showChildTopic (topicName, topicId) {
      this.anaKeyWord = topicName
      this.selectedChildTopic = topicId
      this.showTopicPanel = false
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/normalize.less";
@import "../../assets/less/base.less";
@import "../../assets/less/commen/analysis.less";
.opSelect {
  background-color: #004e89;
  border-color: #004e89;
  color: #fff;
}
.right-par{
  position: relative;
  .loading{
    left: 20%;
    top: 20%;
  }
}
.note-des{
  line-height: 1.8em;
  padding: 8px 0;
  color: #5e7382;
}
</style>
