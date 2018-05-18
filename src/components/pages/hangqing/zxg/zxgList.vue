/*
 * @Author: duyun
 * @Date: 2018-04-02 13:36:31
 * @Last Modified by: duyun
 * @Last Modified time: 2018-04-25 14:26:11
 */

<template>
  <!-- 自选股列表 -->
  <div class="my-stocks">
    <ul class="stock-title clearfix">
      <li>全部<!-- <i class="iconfont icon-arrow-down"></i> --></li>
      <li class="iconfont">当前价</li>
      <li class="iconfont">涨跌幅</li>
      <!--<li class="iconfont" @click="order">成交量</li>
      <li class="iconfont" @click="order">净资产</li>-->
      <li class="iconfont">涨跌额</li>
      <li class="iconfont">昨收价</li>
      <li class="iconfont">开盘价</li>
      <li><i class="iconfont icon-shuaxin hand" :class="{'loading' : zxgStock.length === 0}" title="刷新数据" @click="refresh"></i></li>
    </ul>
    <ul class="stock-list" :class="{less: showMore}">
      <!-- <stockDetail v-for="dataMedium in zxgStock" :key="dataMedium.id" :templateData="dataMedium" @getZXGInfoList="getZXGInfoList"></stockDetail> -->
      <li class="clearfix" v-for="(templateData, index) in zxgStock" :key="templateData.id" :class="{upFlag: templateData.zd >= 0, downFlag: templateData.zd < 0}">
        <a class="stock_item" @click="lintToStock(templateData.market, templateData.code)" target="_blank">{{templateData.name}}<span>{{templateData.code}}</span></a>
        <div class="stock_item">{{templateData.nowPrice | numFix2}}</div>
        <div class="stock_item">{{templateData.zdf | numFix2}}%</div>
        <div class="stock_item">{{templateData.zd | numFix2}}</div>
        <div class="stock_item">{{templateData.close | numFix2}}</div>
        <div class="stock_item">{{templateData.open | numFix2}}</div>
        <div class="stock_item more_handle">
          <i class="iconfont icon-shanchu hand" @click="deleteList(templateData, index)"><span class="delete-style">移除</span></i>
          <!-- <ul class="stock_operate" :class="{show: index === isIndex}">
            <li><i class="iconfont icon-liebiao"></i> 分组</li>
            <li @click="deleteList(templateData, index)"><i class="iconfont icon-shanchu"></i> 移除</li>
          </ul> -->
        </div>
      </li>
    </ul>
    <div class="add-more">
      <span class="hand" v-show="showMore === true" @click="addMore">+ 展开更多</span>
      <span class="hand" v-show="showMore !== true" @click="addLess">- 点击收起</span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      // 自选股列表数据初始化
      zxgStock: [],
      telnum: '',
      showMore: true,
      delete: true,
      isIndex: -1,
      zxgStockStorage: []
      // newArr: []
    }
  },
  created () {
    this.telnum = localStorage.getItem('mobile')
  },
  mounted () {
    var that = this
    that.getZXGInfoList(that.telnum)
    setInterval(function () {
      that.realTimeUpdateStockQuotes()   // 实时更新股票行情
    }, 3000)
  },
  computed: {
    ...mapGetters({
      zxgListAddWatch: 'zxgListAddWatch'
    })
  },
  watch: {
    zxgListAddWatch () {
      this.realTimeUpdateStockQuotes()
    }
  },
  methods: {
    // 展开
    addMore () {
      this.showMore = false
    },
    // 收起
    addLess () {
      this.showMore = true
    },
    // 刷新
    refresh () {
      this.getZXGInfoList(this.telnum)
    },
    // 设置缓存
    setStorerage (stockArr) {
      var timpStr = '{"zxg":['
      for (var i = 0; i < stockArr.length; i++) {
        timpStr = timpStr + '{"code":"' + stockArr[i].code + '","name":"' + stockArr[i].name + '","zd":"' + stockArr[i].zd + '","zdf":"' + stockArr[i].zdf + '","nowPrice":"' + stockArr[i].nowPrice + '","close":"' + stockArr[i].close + '","market":"' + stockArr[i].market + '","groupNo":"' + stockArr[i].groupNo + '","open":"' + stockArr[i].open + '","order":"' + stockArr[i].order + '"},'
      }
      if (stockArr.length !== 0) {
        timpStr = timpStr.substring(0, timpStr.length - 1) + ']}'
      } else {
        timpStr = timpStr + ']}'
      }
      localStorage.setItem('zxgStockStorage', timpStr)
    },
    // 获取缓存
    getStoreRage (zxgStockStorage) {
      var getItenInfo = localStorage.getItem(zxgStockStorage)
      console.log(getItenInfo)
    },
    /**
     * @description 获取自选股股票列表
     * @augments telnum 手机号
     */
    getZXGInfoList (telnum) {
      this.zxgStock = []
      // 获取自选股股票信息数据
      this.$http.getZXGStock({
        mobile: telnum
      }).then(result => {
        var that = this
        var arr = result.data.itemList
        var newArr = []
        var resultDataLeng = arr.length
        if (resultDataLeng > 0) {
          arr.forEach(function (item, index, arr) {
            newArr.push({
              code: item.stockCode,
              market: item.marketCode,
              order: item.showOrder,
              groupNo: item.groupNo,
              name: '',
              nowPrice: '',
              close: '',
              zd: '',
              zdf: '',
              open: ''
            })
          })
          // 更新缓存
          if (newArr.length > 0) {
            that.setStorerage(newArr)
          }
          // 获取股票行情
          that.getStockQuotes(newArr)
        } else if (resultDataLeng === 0) {
          // 查询自选股为空，则显示缓存
          var strStorage = localStorage.getItem('zxgStockStorage')
          if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
            var realData = JSON.parse(strStorage).zxg
            that.zxgStock = realData
          } else {
            that.zxgStock.push({
              code: '暂无自选股'
            })
            console.log('查询和缓存都无数据！')
          }
        }
      })
    },
    // 获取股票行情
    getStockQuotes (newArr) {
      var stockArr = []
      var that = this
      var tt = 0
      let orderArr = []
      for (let i = 0; i < newArr.length; i++) {
        orderArr.push(newArr[i].code)
      }
      newArr.forEach(function (item, index, arr) {
        that.$http.getStockIntro({
          stock_code: item.code,
          market: item.market
        }).then(result => {
          // console.log('res=' + result.data)
          console.log()
          var tmp = JSON.parse(result.data.slice(6))[0]
          // var tmp1 = JSON.parse('{' + result.data + '}')
          // var tmp = tmp1.inS[0]
          stockArr.push({
            name: tmp.stkName,
            code: tmp.stkCode,
            market: item.market,
            nowPrice: tmp.price,
            close: tmp.preClose,
            zd: tmp.zd,
            zdf: tmp.zdPe * 100,    // 涨跌幅要乘以100
            order: item.order,
            groupNo: item.groupNo,
            open: tmp.open,
            id: tmp.stkCode
          })
          tt++
          if (tt === newArr.length) {
            console.log('real time update success')
            let zxgArr = []
            for (let i = 0; i < orderArr.length; i++) {
              zxgArr = zxgArr.concat(stockArr.filter(m => m.code === orderArr[i]))
            }
            that.zxgStock = zxgArr
          }
        })
      })
    },
    // 实时更新股票行情
    realTimeUpdateStockQuotes () {
      // 更新缓存
      var that = this
      var strStorage = localStorage.getItem('zxgStockStorage')
      if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
        var storageJson = JSON.parse(strStorage).zxg
        that.getStockQuotes(storageJson)
      }
    },
    /**
     * @description 增删更新列表
     * @augments batchFlag 添加（00）删除（01）更新（02）
     * @augments order 顺序（可不传）
     */
    addDeleteStock (batchFlag, stockCode, market, order) {
      this.$http.getUpdateOptionalStock({
        mobile: this.telnum,
        batchFlag: batchFlag,
        stockCode: stockCode,
        market: market,
        order: order
      }).then(result => {
        if (result.data.success === 'true') {
          // this.getZXGInfoList(this.telnum)
          var cont = ''
          switch (batchFlag) {
            case '00':
              this.addZxgStock(stockCode, market)  // 添加自选股
              cont = '添加成功'
              break
            case '01':
              this.deleteZxgStock(stockCode, market)  // 删除自选股
              this.deleteZxgStorage(stockCode, market)  // 删除自选股缓存
              cont = '删除成功'
              break
            case '02':
              cont = '更新成功'
              break
          }
          this.$alert(cont, '成功消息', {
            confirmButtonText: '确定'
          })
        } else {
          this.$alert(result.data.message, '失败消息', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    // 删除自选股事件绑定
    deleteList (templateData, index, order) {
      this.addDeleteStock('01', templateData.code, templateData.market, order)
      // this.getZXGInfoList(this.telnum)
    },
    // 添加自选股事件绑定
    addList (code, market, order) {
      this.addDeleteStock('00', code, market, order)
    },
    // 点击跳转
    lintToStock (market, code) {
      window.location.href = './stock.html#/stock/' + market + code
    },
    // 删除自选股
    deleteZxgStock (stockCode, market) {
      var that = this
      for (var i = 0; i < that.zxgStock.length; i++) {
        if (stockCode === that.zxgStock[i].code && market === that.zxgStock[i].market) {
          // splice删除
          that.zxgStock.splice(i, 1)
          break
        }
      }
      // for (var j = 0; j < that.newArr.length; j++) {
      //   if (stockCode === that.newArr[j].code && market === that.newArr[j].market) {
      //     that.newArr.splice(j, 1)
      //     break
      //   }
      // }
    },
    // 删除自选股缓存
    deleteZxgStorage (code, market) {
      var strStorage = localStorage.getItem('zxgStockStorage')
      var timpStr = '{"zxg":['
      var index = 0
      var len = 0
      if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
        var strStorageJson = JSON.parse(strStorage).zxg
        len = strStorageJson.length
        for (var i = 0; i < len; i++) {
          if (strStorageJson[i].code === code && strStorageJson[i].market === market) {
            index++
            continue
          } else {
            if (index === 1) {
              timpStr += '{"code":"' + strStorageJson[i].code + '","name":"' + strStorageJson[i].name + '","zd":"","zdf":"","nowPrice":"","close":"","market":"' + strStorageJson[i].market + '","groupNo":"","open":"","order":"' + strStorageJson[i].order + '"},'
            } else {
              timpStr += '{"code":"' + strStorageJson[i].code + '","name":"' + strStorageJson[i].name + '","zd":"","zdf":"","nowPrice":"","close":"","market":"' + strStorageJson[i].market + '","groupNo":"","open":"","order":"' + (strStorageJson[i].order - 1) + '"},'
            }
          }
        }
        if (len === 1) {
          localStorage.setItem('zxgStockStorage', '')
        } else if (len > 1) {
          timpStr = timpStr.substring(0, timpStr.length - 1) + ']}'
          localStorage.setItem('zxgStockStorage', timpStr)
        }
      }
    },
    // 添加自选股
    addZxgStock (stockCode, market) {
      var that = this
      that.zxgStock.push({
        name: '',
        code: stockCode,
        market: market,
        nowPrice: '',
        close: '',
        zd: '',
        zdf: '',    // 涨跌幅要乘以100
        order: '',
        groupNo: '',
        open: '',
        id: stockCode
      })
      that.newArr.push({
        name: '',
        code: stockCode,
        market: market,
        nowPrice: '',
        close: '',
        zd: '',
        zdf: '',    // 涨跌幅要乘以100
        order: '',
        groupNo: '',
        open: '',
        id: stockCode
      })
    }
  }
}
</script>
<style lang="less">
  .stock_item{
    display: inline-block;
    width: 16%;
    text-align: right;
    padding: 0 5px 5px;
    font-size: 14px;
    float: left;
  }
  .stock_item:nth-child(1), .stock_item:last-child{
    width: 10%;
  }
  div.stock_item{
    line-height: 30px;
  }
  a.stock_item{
    text-align: left;
    cursor: pointer;
  }
  a.stock_item span{
    display: block;
    color: #888;
    font-size: 12px;
  }
  .stock_operate {
    display: none;
    color: #666;
    &.show{
      display: block;
    }
  }
  .more_handle{
    position: relative;
    ul{
      position: absolute;
      top: 25px;
      right: 0;
      z-index: 1000;
      background: #fff;
      border: 1px solid #ccc;
      li{
        padding: 0 10px 0 8px;
        text-align: right;
        font-size: 14px;
        cursor: pointer;
        .iconfont{
          font-size: 16px;
          vertical-align: middle;
        }
      }
      li:hover{
        background: #eee;
      }
    }
    &:hover{
      .stock_operate{
        display:block;
      }
    }
  }
  .stock-list{
    &.less{
      >li:nth-child(1),
      >li:nth-child(2),
      >li:nth-child(3),
      >li:nth-child(4),
      >li:nth-child(5),
      >li:nth-child(6),
      >li:nth-child(7),
      >li:nth-child(8),
      >li:nth-child(9),
      >li:nth-child(10){
        display: block;
      }
      >li{
        display: none;
      }
    }
    .upFlag{
      .stock_item:nth-child(3){
        color: #d53;
      }
    }
    .downFlag{
      .stock_item:nth-child(3){
        color: #390;
      }
    }
  }
  .delete-style{
    font-size: 14px;
    color: #666;
    padding-left: 2px;
  }
</style>
