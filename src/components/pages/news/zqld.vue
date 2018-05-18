/*
 * @Author:duyun
 * @Date: 2018-01-29
 * @Description: 资讯模板：周期轮动
*/
<template>
  <div class="zqld">
    <!-- 周期轮动摘要 -->
    <div class="card">
      <p class="input-tip">投顾机器人关注如下时间维度，统计历史数据，为您找到表现较好标的：</p>
      <div class="clearfix" v-for="item in zqldInfo" :key="item.id">
        <a :href="item.src">
          <div class="card-title">
            {{item.type}}:
          </div>
          <ul class="card-cont clearfix">
            <li v-for="stock in item.periodAnalyResults" :key="stock.id">{{stock.stockName}}</li>
          </ul>
        </a>
      </div>
    </div>
    <!-- 资讯 -->
    <zx-info :infoList="zqldInfoList"></zx-info>
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
      zqldInfoList: [],
      zqldInfo: [],
      type: '1',
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
    this.getData()
  },
  methods: {
    getData () {
      this.$http.getNewsRecommend({
        type: this.type,
        customerNo: this.customerNo
      }).then(result => {
        var newArr1 = JSON.parse(result.data.infoAbstract)
        for (let i = newArr1.length - 1; i >= 0; i--) {
          if (newArr1[i].type === '0' || newArr1[i].type === '3' || newArr1[i].type === '5' || newArr1[i].type === '7' || newArr1[i].type === '8') {
            newArr1.splice(i, 1)
          }
        }
        this.zqldInfo = newArr1
        this.zqldInfo.forEach(ele => {
          switch (parseInt(ele.type)) {
            case 2:
              ele.type = '每年当月'
              ele.src = `periodicAnalysis.html?level=${ele.level}&type=2&monthNo=${ele.monthNo}`
              break
            case 4:
              ele.type = '每月当周'
              ele.src = `periodicAnalysis.html?level=${ele.level}&type=4&weekNo=${ele.weekNo}`
              break
            case 6:
              ele.type = '每年当季'
              ele.src = `periodicAnalysis.html?level=${ele.level}&type=6&quarterNo=${ele.quarterNo}`
              break
            // case 0:
            //   ele.type = '每年当天'
            //   ele.src = '/periodicAnalysis.html?level=' + ele.level + '&type=0' + '&month=' + ele.month + '&day=' + ele.day + '&before=' + ele.before + '&after=' + ele.after
            //   break
            // case 3:
            //   ele.type = '某月当周'
            //   ele.src = '/periodicAnalysis.html?level=' + ele.level + '&type=3' + '&monthNo=' + ele.monthNo + '&weekNo=' + ele.weekNo
            //   break
            // case 5:
            //   ele.type = '每月周几'
            //   ele.src = '/periodicAnalysis.html?level=' + ele.level + '&type=5' + '&weekdayNo=' + ele.weekDayNo
            //   break
            // case 7:
            //   ele.type = '重要节日'
            //   ele.src = '/periodicAnalysis.html?level=' + ele.level + '&type=7' + '&holidayId=' + ele.holidayId + '&before=' + ele.before + '&after=' + ele.after
            //   break
            // case 8:
            //   ele.type = '其他节日'
            //   ele.src = '/periodicAnalysis.html?level=' + ele.level + '&type=8' + '&holidayId=' + ele.holidayId + '&before=' + ele.before + '&after=' + ele.after
            //   break
          }
          ele.periodAnalyResults = ele.periodAnalyResults
        })
        var newArr = result.data.itemList
        for (let i = newArr.length - 1; i >= 0; i--) {
          if (newArr[i].newestInfoAbstract === '') {
            newArr.splice(i, 1)
          }
        }
        this.zqldInfoList = newArr
        this.zqldInfoList.forEach(ele => {
          ele.themeStocks = ele.stockName + '(' + ele.stockCode + ')'
          ele.stkUrl = './stock.html#/stock/' + ele.stockMarket + ele.stockCode
        })
      })
    }
  }
}
</script>

<style lang="less">
.zqld{
  .card{
    margin-top: 10px;
  }
  .card-stock{
    li{
      float: left;
      margin-right: 10px;
    }
  }
  .card-title{
    width:6%;
    float: left;
    margin-bottom: 8px;
  }
  .card-cont {
    width:94%;
    float: left;
    margin-bottom: 8px;
    li{
      float: left;
      padding: 0 25px 0 0;
    }
  }
}
.input-tip{
  padding: 5px 0;
  font-size:1.3rem;
}
</style>

