/*
 * @Author: sunjiahui
 * @Date: 2018-05-11
 */

<template>
  <div class="right-part">
    <a href="" target="_blank">
      <img class="pic-entry" src="../../../../assets/images/u90.png"/>
    </a>
    <ul class="plate-entry">
      <li><i class="iconfont icon-zliconregister01"></i><a href="https://kh.gtja.com/kh/busimanage/index.jsp?source=www" target="_blank">我要开户</a></li>
      <li><i class="iconfont icon-zaixianjiaoyi"></i><a href="https://trade.gtja.com/webtrade/trade/webTradeAction.do?method=preLogin#" target="_blank">在线交易</a></li>
      <li><i class="iconfont icon-wangshangyingyeting"></i><a href="https://yw.gtja.com/kh/ywbl/index.jsp?_a=b" target="_blank">网上营业厅</a></li>
      <li><i class="iconfont icon-jinlingyingcaiwangtubiao09"></i><a href="https://mall.gtja.com/index.html?cid=www" target="_blank">金融商城</a></li>
    </ul>
    <!--涨幅榜-->
    <div class="change-hd rose-list">
      <p>涨幅榜</p>
      <div class="clearfix">
        <a v-for='item in riseList' :key="item.id" :href="item.src">{{item.name}}<br>{{item.priceRiseFall}}%</a>
      </div>
    </div>
    <!--涨幅榜-->
    <div class="change-hd drop-list">
      <p>跌幅榜</p>
      <div class="clearfix">
        <a v-for='item in dropList' :key="item.id" :href="item.src">{{item.name}}<br>{{item.priceRiseFall}}%</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 涨幅榜数据初始化
      riseList: [],
      // 跌幅榜数据初始化
      dropList: []
    }
  },
  created () {
  },
  mounted () {
    let that = this
    // 获取涨幅榜、跌幅榜数据
    setInterval(function () {
      that.$http.getRiseFall().then(result => {
        var contentData = result.data.TableInfo
        for (var i in contentData) {
          contentData[i].zd = parseFloat(contentData[i].match) - parseFloat(contentData[i].preClose)
          contentData[i].zdfp = (Number(contentData[i].zd) / Number(contentData[i].preClose) * 100).toFixed(2)
        }
        // 通过使用concat()创建新数组，数组是地址传递
        var riseArr = contentData.concat([]).sort(function (a, b) {
          if (parseFloat(a.zdfp) < parseFloat(b.zdfp)) return 1
          if (parseFloat(a.zdfp) === parseFloat(b.zdfp)) return 0
          if (parseFloat(a.zdfp) > parseFloat(b.zdfp)) return -1
        })
        var dropArr = riseArr.concat([]).reverse()
        riseArr = riseArr.slice(0, 9)
        dropArr = dropArr.slice(0, 9)
        that.riseList = []
        riseArr.forEach(function (item, index, array) {
          that.riseList.push({
            name: item.name.substr(0, 4),
            priceRiseFall: '+' + item.zdfp
          })
        })
        that.dropList = []
        dropArr.forEach(function (item, index, array) {
          that.dropList.push({
            name: item.name.substr(0, 4),
            priceRiseFall: item.zdfp
          })
        })
      })
    }, 2000)
  },
  methods: {
  }
}
</script>
<style lang="less">
</style>
