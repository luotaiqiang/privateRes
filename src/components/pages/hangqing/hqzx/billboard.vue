<template>
  <div class="right-content">
    <div class="title">龙虎榜</div>
    <div class="date-picker">
      <label>日期</label>
      <el-date-picker
        v-model="value"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        :placeholder="placeHolder"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyyMMdd"
        @change="datachange()">
      </el-date-picker>
    </div>
    <el-table   
      :data="billboardValue"
      style="width:100%"
      stripe>
      <el-table-column prop="stkName" label="股票名称"></el-table-column>
      <el-table-column prop="settlement" label="收盘价"></el-table-column>
      <el-table-column
        prop="priceRiseFall"
        label="涨跌幅">
      </el-table-column>
      <el-table-column
        prop="stockTradingVolume"
        label="成交量(万)">
      </el-table-column>
      <el-table-column
        prop="stockTurnover"
        label="成交额(亿)">
      </el-table-column>
      <el-table-column
        prop="listReasons"
        label="上榜原因"
        width="300">
      </el-table-column>
      <el-table-column
        prop="details"
        label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      billboardValue: [],
      pagesize: 10,
      // 默认高亮行数据id
      highlightId: -1,
      // 当前页码
      currentPage: 1,
      // 查询的页码
      start: 1,
      // 默认数据总数
      totalCount: 1000,
      // 日期选项
      value: [],
      // 今天日期
      todayDate: '',
      // 昨天日期
      yesTodayDate: '',
      placeHolder: ''
    }
  },
  mounted () {
    this.getNowDate()
    this.getBillboardData(this.yesTodayDate, this.todayDate)
    // this.getBillboardData('20180203', '20180301')
  },
  methods: {
    // 获取当前日期
    getNowDate: function () {
      var that = this
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      month = month < 10 ? '0' + month : month
      var date = d.getDate()
      date = date < 10 ? '0' + date : date
      var yesDate = new Date()
      yesDate.setTime(d.getTime() - 24 * 60 * 60 * 1000)
      var realyesDate = yesDate.getDate()
      realyesDate = realyesDate < 10 ? '0' + realyesDate : realyesDate
      that.todayDate = String(year) + String(month) + String(date)
      that.yesTodayDate = String(year) + String(month) + String(realyesDate)
      that.placeHolder = String(year) + '-' + String(month) + '-' + String(realyesDate) + '至' + String(year) + '-' + String(month) + '-' + String(date)
    },
    // 选择日期时间发生改变时
    datachange: function () {
      var that = this
      var formatDate = function (date) {
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        return String(y) + String(m) + String(d)
      }
      var start = formatDate(that.value[0])
      var end = formatDate(that.value[1])
      that.getBillboardData(start, end)
    },
    getBillboardData: function (startTime, endTime) {
      // this.zxgStock = []
      // json请求数据
      // var that = this
      // this.$http.getBillboard({
      //   beginDate: startTime,
      //   endDate: endTime,
      //   pageSize: '10',
      //   pageNo: '1'
      // }).then(result => {
      //   var stockObj = result.data.itemList
      //   stockObj.forEach(ele => {
      //     ele.stkName = ele.stockCode
      //     ele.settlement = '--'
      //     ele.priceRiseFall = '--'
      //     ele.stockTradingVolume = parseFloat(ele.netPruchases).toFixed(2)
      //     ele.stockTurnover = parseFloat(ele.dealAmount).toFixed(2)
      //     ele.listReasons = ele.reason
      //     ele.details = '关注'
      //   })
      //   that.billboardValue = stockObj
      // })
      this.$http.getBillboard({
        beginDate: startTime,
        endDate: endTime,
        pageSize: '10',
        pageNo: '1'
      }).then(result => {
        var that = this
        var stockObj = result.data.itemList
        var resultDataLeng = stockObj.length
        if (resultDataLeng > 0) {
          var newArr = []
          stockObj.forEach(function (item, index, arr) {
            var market = ''
            var codeHead = item.stockCode.slice(0, 3)
            if (codeHead === '600' || codeHead === '601' || codeHead === '603') {
              market = 'SH'
            } else if (codeHead === '000' || codeHead === '002' || codeHead === '300') {
              market = 'SZ'
            } else {
              return
            }
            newArr.push({
              stock_code: item.stockCode,
              market: market,
              listReasons: item.reason
            })
          })
          var stockArr = []
          let timer = 0
          newArr.forEach(function (item, index, arr) {
            that.$http.getStockIntro({
              stock_code: item.stock_code,
              market: item.market
            }).then(result => {
              var tmp = JSON.parse(result.data.slice(6))[0]
              // console.log(tmp)
              stockArr.push({
                stkName: tmp.stkName,
                settlement: tmp.preClose,
                priceRiseFall: (parseFloat(tmp.zdPe) * 100).toFixed(2) + '%',
                stockTradingVolume: parseFloat(tmp.vol / 10000).toFixed(2),
                stockTurnover: parseFloat(tmp.amount / 100000000).toFixed(2),
                listReasons: item.listReasons,
                code: tmp.stkCode,
                market: item.market,
                details: '关注'
              })
              timer++
              if (newArr.length === timer) {
                // console.log(stockArr)
                that.billboardValue = stockArr
              }
            })
          })
        } else if (resultDataLeng === 0) {
          that.billboardValue = []
        }
      })
    }
  }
}
</script>

<style lang="less">
.date-picker{
  margin:20px 0;
  .el-date-editor--daterange.el-input{
    width: 320px;
  }
  label{
    font-size: 1.4rem;
    margin-right: 10px;
  }
}
.el-table_1_column_6{
  .cell{
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
.el-table_1_column_7{
  color: #004e98;
  cursor: pointer;
}
.shyl-content {
  .styleFlagRise{
    td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6),td:nth-child(7),td:nth-child(9){
      color: #e63f52;
    }
  }
  .styleFlagDrop{
    td:nth-child(3),td:nth-child(4),td:nth-child(5),td:nth-child(6),td:nth-child(7),td:nth-child(9){
      color: #1abc9c;
    }
  }
}
</style>