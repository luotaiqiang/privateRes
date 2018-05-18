/*
 * @Author: woden0415.wangdong
 * @Date: 2017-12-20 16:46:36
 * @Description: 详细信息，今开，昨收，涨停板等。。。
*/

<template>
  <div>
    <div class="stock-introduce">
      <div class="stock-item clearfix">
        <div class="stock-name">{{stock.stkName}}({{stock.market}}:{{stock.stkCode}})<!--<span class="score">{{stock.nature}}</span>--></div>
        <div class="stock-done"><!-- <span>快买</span><span>快卖</span><span>持仓</span><span>异动提醒</span> -->
          <a class="btn-s blue" v-show="attention" @click="addZXG(stock)">+加关注</a>
          <a class="btn-s blue" v-show="!attention" @click="deleteZXG(stock)">-已关注</a>
        </div>
      </div>
      <div class="stock-item clearfix">
        <div class="left" :class="{up: stock.zd >= 0, down: stock.zd < 0}">
          <i class="iconfont icon-newbimoney"></i>
          <i class="f-s-xxxl bold">{{stock.price | numFix2}}</i>
          <span class="f-s-s">{{stock.zd | numFix2}} ({{stock.zdPe * 100 | numFix2}}%)</span>
        </div>
        <div class="right stock-date">
          <i>{{stock.date | dateFormat}} &nbsp; {{stock.time | timeFormat}}（更新时间）</i>
        </div>
      </div>
      <div class="stock-item padding-t-xs clearfix">
        <ul class="stock-item-ul">
          <li :class="{up: stock.zd >= 0, down: stock.zd < 0}">今开：<span class="lint">{{stock.open | numFix2}}</span></li>
          <li>昨收：<span class="lint">{{stock.preClose | numFix2}}</span></li>
          <li>内盘：<span class="lint">{{stock.inside | rebuildData | numFix2}}</span>{{insideUnit}}</li>
          <li>总股本：<span class="lint">{{stock.zgb | numFix2 | rebuildData}}</span>{{zgbUnit}}</li>
          <li>流通A股：<span class="lint">{{stock.ltag | numFix2 | rebuildData}}</span>{{ltagUnit}}</li>
        </ul>
        <ul class="stock-item-ul">
          <li :class="{up: stock.zd >= 0, down: stock.zd < 0}">最高：<span class="lint">{{stock.high | numFix2}}</span></li>
          <li :class="{up: stock.zd >= 0, down: stock.zd < 0}">最低：<span class="lint">{{stock.low | numFix2}}</span></li>
          <li>外盘：<span class="lint">{{stock.outside | numFix2 | rebuildData}}</span>{{outsideUnit}}</li>
          <li>每股净资产：<span class="lint">{{stock.netAssets | numFix2}}</span></li>
          <li>净资产收益率：<span class="lint">{{stock.netAssetsRate | numFix2}}</span></li>
        </ul>
        <ul class="stock-item-ul">
          <li>52周最高：<span class="lint">{{stock.weekMostHigh | numFix2}}</span></li>
          <li>52周最低：<span class="lint">{{stock.weekMostLow | numFix2}}</span></li>
          <li>市盈率：<span class="lint">{{stock.pbRatio | numFix2}}</span></li>
          <li>市净率(动)：<span class="lint">{{stock.pbRatio | numFix2}}</span></li>
          <li>市销率(动)：<span class="lint">{{stock.psRatio | numFix2}}</span></li>
        </ul>
        <ul class="stock-item-ul no-margin-r">
          <li>昨日成交量：<span class="lint">{{stock.vol1 | numFix2 | rebuildData}}</span>{{zrDealNumUnit}}股</li>
          <li>昨日成交额：<span class="lint">{{stock.turnover | rebuildData}}</span>{{zrDealMoneyUnit}}</li>
        </ul>
      </div>
    </div>
    <stockInfo :market="stock.market" :stkCode="stock.stkCode"></stockInfo>
  </div>
</template>

<script>
  import stockInfo from '@/components/pages/stock/stockInfo.vue'
  export default {
    name: 'stockIntro',
    components: {
      stockInfo
    },
    data () {
      return {
        stock: {
          market: '---',
          stkName: '---',
          stkCode: '---',
          nature: '---',
          price: '---',
          zd: '---',
          zdPe: '---',
          date: '---',
          time: '---',
          open: '---',
          preClose: '---',
          inside: '---',
          outside: '---',
          high: '---',
          low: '---',
          zgb: '---',
          ltag: '---',
          weekMostHigh: '---',
          weekMostLow: '---',
          netAssets: '---',
          netAssetsRate: '---',
          vol1: '---',
          turnover: '---',
          pbRatio: '---',
          psRatio: '---'
        },
        telnum: 17621485825,
        attention: true,
        zgbUnit: '',
        ltagUnit: '',
        zrDealNumUnit: '',
        zrDealMoneyUnit: '',
        insideUnit: '',
        outsideUnit: '',
        len: 0    // 自选个个数
      }
    },
    created () {
      var that = this
      var curParams = that.$route.params.stockcode
      that.stock.market = curParams.substr(0, 2)
      that.stock.stkCode = curParams.substr(2)
      that.getStockIntroOther(that.stock.market, that.stock.stkCode, that)
      that.getStockIntro(that.stock.market, that.stock.stkCode, that)
      that.isAttention(that.stock.market, that.stock.stkCode, that)    // 判断是否关注
    },
    mounted () {
      var that = this
      setInterval(function () {
        that.getStockIntro(that.stock.market, that.stock.stkCode, that)
      }, 5000)
    },
    beforeRouteUpdate (to, from, next) {
      var that = this
      var curParams = to.params.stockcode
      that.stock.market = curParams.substr(0, 2)
      that.stock.stkCode = curParams.substr(2)
      that.getStockIntroOther(that.stock.market, that.stock.stkCode, that)
      that.getStockIntro(that.stock.market, that.stock.stkCode, that)
      that.isAttention(that.stock.market, that.stock.stkCode, that)
      next()
    },
    methods: {
      // 单位处理：数据小于万，无单位；数据>=1万且<1亿，单位显示“万”；数据>=1亿，单位显示为“亿”
      rebuildUnit: function (objData) {
        var target = parseFloat(objData)
        if (target < 10000) {
          if (objData === this.stock.zgb) { // 1:总股本
            this.zgbUnit = ''
          } else if (objData === this.stock.ltag) {  // 2：流通A股
            this.ltagUnit = ''
          } else if (objData === this.stock.vol1) {  // 3:昨日成交量
            this.zrDealNumUnit = ''
          } else if (objData === this.stock.turnover) {  // 4:昨日成交额
            this.zrDealMoneyUnit = ''
          } else if (objData === this.stock.inside) {  // 5:内盘
            this.insideUnit = ''
          } else if (objData === this.stock.outside) {  // 6:外盘
            this.outsideUnit = ''
          }
        } else if (target >= 10000 && target < 100000000) {
          if (objData === this.stock.zgb) {
            this.zgbUnit = '万'
            if (this.stock.zgb === this.stock.ltag) {
              this.ltagUnit = '万'
            }
          } else if (objData === this.stock.ltag) {
            this.ltagUnit = '万'
          } else if (objData === this.stock.vol1) {
            this.zrDealNumUnit = '万'
          } else if (objData === this.stock.turnover) {
            this.zrDealMoneyUnit = '万'
          } else if (objData === this.stock.inside) {
            this.insideUnit = '万'
          } else if (objData === this.stock.outside) {
            this.outsideUnit = '万'
          }
        } else if (target >= 100000000) {
          if (objData === this.stock.zgb) {
            this.zgbUnit = '亿'
          } else if (objData === this.stock.ltag) {
            this.ltagUnit = '亿'
          } else if (objData === this.stock.vol1) {
            this.zrDealNumUnit = '亿'
          } else if (objData === this.stock.turnover) {
            this.zrDealMoneyUnit = '亿'
          } else if (objData === this.stock.inside) {
            this.insideUnit = '亿'
          } else if (objData === this.stock.outside) {
            this.outsideUnit = '亿'
          }
        }
      },
      getStockIntro (sMarket, sCode, obj) {
        obj.$http.getStockIntro({
          market: sMarket,
          stock_code: sCode
        }).then(result => {
          var backData = JSON.parse(result.data.slice(6))[0]
          Object.assign(obj.stock, JSON.parse(result.data.slice(6))[0])
          // console.log(backData)
          this.rebuildUnit(backData.zgb)
          this.rebuildUnit(backData.ltag)
          this.rebuildUnit(this.stock.inside)
          this.rebuildUnit(this.stock.outside)
        })
      },
      getStockIntroOther (sMarket, sCode, obj) {
        obj.$http.getStockIntroOther({
          market: sMarket,
          stockCode: sCode
        }).then(result => {
          if (result.data.success === '') {
            Object.assign(obj.stock, result.data)
            obj.stock.vol1 = result.data.vol
            this.rebuildUnit(this.stock.vol1)
            this.rebuildUnit(this.stock.turnover)
          }
        }).catch(error => {
          console.error(error)
        })
      },
      // 判断是否关注
      isAttention (market, code, that) {
        var strStorage = localStorage.getItem('zxgStockStorage')
        if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
          var storageJson = JSON.parse(strStorage).zxg
          that.len = storageJson.length
          for (var i = 0; i < storageJson.length; i++) {
            if (storageJson[i].code === code && storageJson[i].market === market) {
              that.attention = false    // 已关注
              break
            } else {
              that.attention = true   // 未关注
            }
          }
        } else {
          that.attention = true   // 未关注
        }
      },
      // 加自选(判断是否登录，若无登录，则自动出登录弹框)
      addZXG (stock) {
        const mobile = localStorage.getItem('mobile')
        if (mobile === null) {
          this.$emit('toClosePop')
        } else {
          console.log('len=' + this.len)
          this.getListData('00', this.stock.stkCode, this.stock.market, this.len + 1)
        }
      },
      // 删自选
      deleteZXG (stock) {
        console.log('删股票')
        this.getListData('01', this.stock.stkCode, this.stock.market)
      },
      /**
       * @description 增删更新列表
       * @augments batchFlag 添加（00）删除（01）更新（02）
       * @augments order 顺序（可不传）
       */
      getListData (batchFlag, stockCode, market, order) {
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
            var flag = ''
            switch (batchFlag) {
              case '00':
                cont = '您已成功关注' + this.stock.stkName
                this.addToStorage(stockCode, market, this.stock.stkName, order)
                flag = false
                break
              case '01':
                cont = '您已成功删除' + this.stock.stkName
                this.deleteFromStorage(stockCode, market, this.stock.stkName, order)
                flag = true
                break
              case '02':
                cont = '您已成功更新' + this.stock.stkName
                break
            }
            this.$alert(cont, '提示消息', {
              confirmButtonText: '确定',
              callback: action => {
                this.attention = flag
              }
            })
          } else {
            this.$alert(result.data.message, '失败消息', {
              confirmButtonText: '确定'
            })
          }
        })
      },
      // 增加到缓存
      addToStorage (code, market, name, order) {
        console.log('add stock')
        var strStorage = localStorage.getItem('zxgStockStorage')
        if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
          // var strStorageJson = JSON.parse(strStorage)
          // var len = strStorageJson.zxg.length
          var str = '{"code":"' + code + '","name":"' + name + '","zd":"","zdf":"","nowPrice":"","close":"","market":"' + market + '","groupNo":"","open":"","order":"' + order + '"},'
          strStorage = strStorage.substring(0, 8) + str + strStorage.substring(8, strStorage.length)
          localStorage.setItem('zxgStockStorage', strStorage)
        } else {
          var timpStr = '{"zxg":['
          timpStr += '{"code":"' + code + '","name":"' + name + '","zd":"","zdf":"","nowPrice":"","close":"","market":"' + market + '","groupNo":"","open":"","order":"1"}' + ']}'
          localStorage.setItem('zxgStockStorage', timpStr)
        }
      },
      // 删除缓存
      deleteFromStorage (code, market, name, order) {
        console.log('deleteFromStorage')
        var that = this
        var strStorage = localStorage.getItem('zxgStockStorage')
        var timpStr = '{"zxg":['
        var index = 0
        if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
          var strStorageJson = JSON.parse(strStorage).zxg
          that.len = strStorageJson.length
          for (var i = 0; i < that.len; i++) {
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
          if (that.len === 1) {
            localStorage.setItem('zxgStockStorage', '')
          } else if (that.len > 1) {
            timpStr = timpStr.substring(0, timpStr.length - 1) + ']}'
            localStorage.setItem('zxgStockStorage', timpStr)
          }
        }
      }
    },
    filters: {
      rebuildData: function (data) {
        var target = parseFloat(data)
        if (target < 10000) {
          return target.toFixed(2)
        } else if (target >= 10000 && target < 100000000) {
          return (target / 10000).toFixed(2)
        } else if (target >= 100000000) {
          return (target / 100000000).toFixed(2)
        }
      }
    }
  }
</script>
