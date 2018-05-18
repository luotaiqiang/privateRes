/*
 * @Author:duyun
 * @Date: 2018-01-29
 * @Description: 资讯模板：猜你喜欢
*/
<template>
  <div class="cnxh">
    <!-- 摘要列表 -->
    <ul class="card">
      <!-- 用户无登录，提示： -->
      <!--<li>您好！请登录资金账号，投顾机器人将更好认识您，为你提供更精准化的资讯推送。</li>-->
      <!-- 用户登录，但是无推荐结果，展示： -->
      <!--<li>尊敬的用户，您好！投顾机器人将在增强学习后，为您提供更精准化的资讯推送。</li>-->
      <!-- 用户登录，并且有推荐结果，展示： -->
      <!--<li>根据您最近一年的持仓特点（含持仓天数、持仓比例）与购买习惯（含购买次数、最近购买日期），投顾机器人经过大数据运算，猜你喜欢如下个股：</li>-->
      <li>{{cnxhTips}}</li>
      <li v-for="item in cnxhList" :key="item.id">
        <span class="rate-l">{{item.info}}</span>
        <el-rate
          v-model="item.value"
          disabled
          allow-half
          show-score
          show-text
          void-icon-class="scroe"
          text-color="#ff9900">
        </el-rate>
      </li>
    </ul>
    <!-- 资讯 -->
    <zx-info :infoList="cnxhinfoList"></zx-info>
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
      cnxhList: [],
      cnxhinfoList: [],
      customerNo: '12',
      cnxhTips: ''
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
    // 摘要数据-模拟数据 customerNo
    this.$http.getNewsRecommend({
      type: '3',
      customerNo: this.customerNo
    }).then(result => {
      console.log(result, result.data.success)
      if (result.data.success === true) {
        if (this.customerNo === '12') {
          this.cnxhTips = '请登录，便于投顾机器人为您提供个性化的服务。'
        } else {
          if (result.data.infoAbstract !== '') {
            this.cnxhTips = '根据您最近一年的持仓特点（含持仓天数、持仓比例）与购买习惯（含购买次数、最近购买日期），投顾机器人经过大数据运算，猜你喜欢如下个股：'
            var cnxhListArr = JSON.parse(result.data.infoAbstract)
            for (var j = cnxhListArr.length - 1; j >= 0; j--) {
              if (cnxhListArr[j].stockName === '' || cnxhListArr[j].stars === 0) {
                cnxhListArr.splice(j, 1)
              }
            }
            this.cnxhList = cnxhListArr
            this.cnxhList.forEach(ele => {
              ele.info = ele.stockName
              ele.value = ele.stars
            })
          } else {
            this.cnxhTips = '您最近一年的持仓/交易数据较少，投顾机器人暂时无法根据大数据为您提供个性化服务。'
          }
        }
        var newArr = result.data.itemList
        for (var i = newArr.length - 1; i >= 0; i--) {
          if (newArr[i].newestInfoAbstract === '') {
            newArr.splice(i, 1)
          }
        }
        this.cnxhinfoList = newArr
        this.cnxhinfoList.forEach(ele => {
          ele.themeStocks = ele.stockName + '(' + ele.stockCode + ')'
          ele.stkUrl = './stock.html#/stock/' + ele.stockMarket + ele.stockCode
          ele.picPath = (ele.picPath !== '') ? ele.picPath : '@/assets/imgages/icon-tfh.png'
        })
      }
    })
  }
}
</script>

<style lang="less">
.cnxh{
  .card{
    margin-top: 10px;
  }
}
.card{
  font-size: 1.3rem;
  line-height: 1.7em;
  background: #f7f7f7;
  padding: 5px 10px;
  margin-bottom: 25px;
  cursor: default;
  li{
    padding: 5px 0;
    cursor: default;
  }
}
.rate-l{
  width: 60px;
  display: inline-block;
}
.el-rate{
  display: inline-block;
  margin-left: 15px;
  position: relative;
  top: -2px;
  .el-rate__icon{
    // color:#ccc!important;
  }
  .el-rate__text{
    margin-left:15px;
  }
}
</style>

