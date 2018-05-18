/*
 * @Author:duyun
 * @Date: 2018-01-29
 * @Description: 资讯模板：热点追踪
*/
<template>
  <div class="rdzz">
    <!-- 分析搜索框 -->
    <div class="rdzz-search">
      <p class="input-tip">想知道当前热点对股票的影响？点击一下，投顾机器人将帮你分析类似事件在过往产生的影响：</p>
      <div class="search-box">
        <input class="search" type="search" placeholder="搜索" v-model="searchStr" @keyup.enter="analysis(searchStr)">
        <i class="iconfont icon-search"></i>
      </div>
      <el-button type="primary" @click="analysis(searchStr)">我要分析</el-button>
    </div>
    <p class="input-tip">投顾机器人关注如下热点，统计历史数据，为您找到表现较好标的：</p>
    <!-- 热点跟踪摘要 -->
    <ul class="card">
      <li v-for="item in newsInfo" :key="item.id" @click="analysis(item.topicTitle, item.topicId)">
        {{item.topicTitle}}
        <span class="card-stock" v-for="event in item.eventAnalyResults" :key="event.id">{{event.stockName}}</span>
      </li>
    </ul>
    <!-- 资讯 -->
    <zx-info :infoList="rdzzInfoList"></zx-info>
  </div>
</template>

<script>
import zxInfo from '@/components/commen/zixunInfo.vue'
export default {
  components: {
    zxInfo
  },
  data () {
    return {
      searchStr: '',
      userCode: '12',      /* 用户号 默认为12 */
      userType: 1,         /* 0：三端一微用户，1：投顾管理端用户，2其他用户 */
      rdzzInfoList: [],
      newsInfo: [],
      customerNo: ''
    }
  },
  created () {
    if (localStorage.getItem('mobile') !== null) {
      this.customerNo = localStorage.getItem('mobile')
    } else {
      this.customerNo = '12'
    }
  },
  mounted () {
    // 摘要数据-模拟数据 type=3&customerNo=4609552
    this.$http.getNewsRecommend({
      type: '2',
      customerNo: this.customerNo
    }).then(result => {
      this.newsInfo = JSON.parse(result.data.infoAbstract)
      this.newsInfo.forEach(ele => {
        ele.topicTitle = ele.topicTitle
        ele.topicId = ele.topicId
        ele.eventAnalyResults = ele.eventAnalyResults
      })
      var newArr = result.data.itemList
      for (var i = newArr.length - 1; i >= 0; i--) {
        if (newArr[i].newestInfoAbstract === '') {
          newArr.splice(i, 1)
        }
      }
      this.rdzzInfoList = newArr
      this.rdzzInfoList.forEach(ele => {
        ele.themeStocks = ele.stockName + '(' + ele.stockCode + ')'
        ele.stkUrl = './stock.html#/stock/' + ele.stockMarket + ele.stockCode
      })
    })
  },
  methods: {
    analysis (str, id) {
      id = (id !== undefined) ? id : ''
      window.location.href = `hotAnalysis.html?keyword=${str}&topicId=${id}&userCode=${this.userCode}&userType=${this.userType}`
    }
  }
}
</script>

<style lang="less">
.rdzz-search{
  margin: 20px 0 25px;
  .search-box{
    width: 50%;
    margin: 0 50px 0 0;
    height: 35px;
    line-height: 35px;
    border-radius: 5px;
    float: left;
  }
}
.card li {
  cursor: pointer;
}
.card-stock{
  color: #004e98;
  padding-left: 15px;
}
.input-tip{
  padding: 5px 0;
  font-size:1.3rem;
}
</style>

