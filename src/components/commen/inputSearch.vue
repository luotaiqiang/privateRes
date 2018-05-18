/*
 * @Author:duyun
 * @Date: 2017-09-21
 * @Description: 模板：搜索框
*/

<template>
  <div class="input-serch">
    <div class="search-box" :class="{focus:onFocus}">
      <input class="search" type="text" placeholder="股票代码/首字母/名称" v-model="searchStr" @focus="searchFocus" @blur="searchBlur" @input="getInputContent(searchStr)"/>
      <i class="iconfont icon-search"></i>
    </div>
    <ul class="search-tips" v-if="tipsShow">
      <li v-for="(item, index) in searchList" :key="item.id">
        <a :href="item.src" @click="lintToStock(item.market, item.stockCode)" target="_blank">{{item.stockName}}  {{item.stockCode}}</a>
        <span style="border: 1px solid grey;
          border-radius: 10px;
          padding: 2px 10px;
          font-size: 12px;
          cursor: pointer;" @click="addDeleteOptionStock(item, index)">
          <i :class="{loading: index === isSelect}" v-if="toLoading"></i>{{item.flag}}
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  name: 'inputsearch',
  data () {
    return {
      searchList: [],
      onFocus: false,
      searchStr: '',
      tipsShow: false,
      mobile: '',
      isSelect: '',
      toLoading: false
    }
  },
  created () {
    var that = this
    this.mobile = localStorage.getItem('mobile')
    $('body').not('.input-serch').on('click', function () {
      that.tipsShow = false
    })
  },
  mounted () {
    // 获取上海、深证市场所有股票
    this.getAllStockData()
    // 查询用户自选股
    this.getOptionStock()
    // 搜索
    this.getInputContent(this.searchStr)
    // 获取提示信息
    this.$http.getSearchListTip().then(result => {
      this.searchListTip = result.data.searchListTip
    })
  },
  computed: {
    searchList: function () {
      if (!this.searchStr) {
        return false
      }
      var s = this.searchStr.trim().toLowerCase()
      var result = this.searchListTip.filter(function (items) {
        if (items.text.toLowerCase().indexOf(s) !== -1) {
          return items
        }
      })
      return result
    }
  },
  methods: {
    searchFocus: function () {
      this.onFocus = true
    },
    searchBlur: function () {
      this.onFocus = false
    },
    // 点击跳转
    lintToStock (market, code) {
      window.location.href = 'stock.html#/stock/' + market + code
    },
    // 获取上海、深证市场所有股票
    getAllStockData () {
      // 获取上海市场所有股票
      if (localStorage.getItem('stock.SH') === null) {
        this.$http.getAllStockOfSH().then(result => {
          var arr = '[' + result.data + ']'
          var obj = JSON.parse(arr)
          var stockArray = []
          var str = ''
          obj.forEach(function (item, index, arr) {
            if (item.m === 'SH') {
              if (item.c.substring(0, 3) === '600' || item.c.substring(0, 3) === '601' || item.c.substring(0, 3) === '603') {
                str = '{' + item.c + ',' + item.n + ',' + item.p + ',' + item.m + '}'
                stockArray.push(str)
              }
            }
          })
          // 存入缓存
          localStorage.setItem('stock.SH', stockArray)
        })
      }
      // 获取深证市场所有股票
      if (localStorage.getItem('stock.SZ') === null) {
        this.$http.getAllStockOfSZ().then(result => {
          var arr = '[' + result.data + ']'
          var obj = JSON.parse(arr)
          var stockArray = []
          var str = ''
          obj.forEach(function (item, index, arr) {
            if (item.m === 'SZ') {
              if (item.c.substring(0, 3) === '000' || item.c.substring(0, 3) === '002' || item.c.substring(0, 3) === '300') {
                str = '{' + item.c + ',' + item.n + ',' + item.p + ',' + item.m + '}'
                stockArray.push(str)
              }
            }
          })
          // 存入缓存
          localStorage.setItem('stock.SZ', stockArray)
        })
      }
    },
    // 查询用户自选股
    getOptionStock () {
      this.mobile = localStorage.getItem('mobile')
      if (this.mobile !== null && this.mobile !== '') {
        this.zxgStock = []
        // 获取自选股股票信息数据
        this.$http.getZXGStock({
          mobile: this.mobile
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
          }
        })
      }
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
    // 搜索
    getInputContent (val) {
      this.searchList = ''
      // 按股票代码搜索
      if (!isNaN(parseInt(val))) {
        var arrays = this.selectByCode(val)
        this.showSearchStockInfo(arrays)
      }
      // 按股票名称简称搜索
      if (val.search(/[a-zA-Z]+/) !== -1) {
        var arrays1 = this.selectByPinYin(val)
        this.showSearchStockInfo(arrays1)
      }
      // 按股票中文名称搜索
      if (/.*[\u4e00-\u9fa5]+.*$/.test(val)) {
        var arrays2 = this.selectChinese(val)
        this.showSearchStockInfo(arrays2)
      }
    },
    // 通过股票代码筛选股票
    selectByCode (code) {
      var stockArrays = this.loadDataToArray()
      var stockJson = []
      for (var i = 0; i < stockArrays.length; i++) {
        for (var j = 0; j < stockArrays[i].length; j++) {
          if (stockArrays[i][j].indexOf(code) !== -1) {
            stockJson.push(stockArrays[i][j])
          }
        }
      }
      return stockJson
    },
    // 通过拼音进行查询
    selectByPinYin (pinyin) {
      var stockArrays = this.loadDataToArray()
      var parameters = new RegExp('^' + pinyin, 'i')
      var stockJson = []
      for (var i = 0; i < stockArrays.length; i++) {
        for (var j = 0; j < stockArrays[i].length; j++) {
          var arrays = stockArrays[i][j].split(',')
          if (parameters.test(arrays[2])) {
            stockJson.push(stockArrays[i][j])
          }
        }
      }
      return stockJson
    },
    // 通过中文进行查询
    selectChinese (chineseStr) {
      var stockArrays = this.loadDataToArray()
      var stockJson = []
      for (var i = 0; i < stockArrays.length; i++) {
        for (var j = 0; j < stockArrays[i].length; j++) {
          if (stockArrays[i][j].indexOf(chineseStr) !== -1) {
            stockJson.push(stockArrays[i][j])
          }
        }
      }
      return stockJson
    },
    // 把所有存储在本地的所有股票信息转换为数组形式
    loadDataToArray () {
      var sz = localStorage.getItem('stock.SZ')
      var sh = localStorage.getItem('stock.SH')
      var stockArrays = []
      if (sz !== null) {
        stockArrays.push(sz.split('},'))
      }
      if (sh !== null) {
        stockArrays.push(sh.split('},'))
      }
      return stockArrays
    },
    // 展示搜索到的信息
    showSearchStockInfo (arrays) {
      var tempArray = []
      var resultArray = []
      if (arrays.length === 0) {
        resultArray.push({
          stockName: '无搜索结果',
          stockCode: '',
          market: '',
          shortName: ''
        })
      } else {
        var stockStorage = localStorage.getItem('zxgStockStorage')
        tempArray = this.sortintArray(arrays)
        tempArray = this.arrayReorder(tempArray)
        for (var i = 0; i < tempArray.length; i++) {
          var stockInfo = tempArray[i].split(',')
          if (stockStorage !== '' && stockStorage !== null && stockStorage !== '{"zxg":[]}') {
            if (stockStorage.indexOf(stockInfo[0].substring(1, stockInfo[0].length)) > 0) {
              resultArray.push({
                stockName: stockInfo[1],
                stockCode: stockInfo[0].substring(1, stockInfo[0].length),
                market: stockInfo[3],
                shortName: stockInfo[2],
                flag: '-自选'
              })
            } else {
              resultArray.push({
                stockName: stockInfo[1],
                stockCode: stockInfo[0].substring(1, stockInfo[0].length),
                market: stockInfo[3],
                shortName: stockInfo[2],
                flag: '+自选'
              })
            }
          } else {
            resultArray.push({
              stockName: stockInfo[1],
              stockCode: stockInfo[0].substring(1, stockInfo[0].length),
              market: stockInfo[3],
              shortName: stockInfo[2],
              flag: '+自选'
            })
          }
        }
      }
      this.tipsShow = true
      this.searchList = resultArray
    },
    // 搜索结果以6，0，3开头进行排序
    sortintArray (arrays) {
      var tempArray = []
      var len = 0
      tempArray = this.addSix(arrays)
      len = tempArray.length
      if (len === 30) {
        return this.addSix(arrays)
      } else {
        tempArray = this.addZero(tempArray, arrays)
        len = tempArray.length
        if (len === 30) {
          return tempArray
        } else {
          tempArray = this.addThree(tempArray, arrays)
          len = tempArray.length
          if (len === 30) {
            return tempArray
          } else {
            return this.addOther(tempArray, arrays)
          }
        }
      }
    },
    // 在返回的搜索结果中找出所有以6开头的股票
    addSix (arrays) {
      var count = 0
      var tempArray = []
      for (var i = 0; i < arrays.length; i++) {
        if (count === 30) {
          return tempArray
        } else {
          if (arrays[i].indexOf('6') === 1) {
            tempArray[count] = arrays[i]
            count += 1
          }
        }
      }
      return tempArray
    },
    // 在返回的搜索结果中找出所有以0开头的股票
    addZero (oldArray, arrays) {
      var count = oldArray.length
      for (var i = 0; i < arrays.length; i++) {
        if (count === 30) {
          return oldArray
        } else {
          if (arrays[i].indexOf('0') === 1) {
            oldArray[count] = arrays[i]
            count += 1
          }
        }
      }
      return oldArray
    },
    // 在返回的搜索结果中找出所有以3开头的股票
    addThree (oldArray, arrays) {
      var count = oldArray.length
      for (var i = 0; i < arrays.length; i++) {
        if (count === 30) {
          return oldArray
        } else {
          if (arrays[i].indexOf('3') === 1) {
            oldArray[count] = arrays[i]
            count += 1
          }
        }
      }
      return oldArray
    },
    // 在返回的搜索结果中找出不是以6，0，3开头的股票
    addOther (oldArray, arrays) {
      var count = oldArray.length
      for (var i = 0; i < arrays.length; i++) {
        if (count === 30) {
          return oldArray
        } else {
          if (arrays[i].indexOf('3') !== 1 && arrays[i].indexOf('6') !== 1 && arrays[i].indexOf('0') !== 1) {
            oldArray[count] = arrays[i]
            count += 1
          }
        }
      }
      return oldArray
    },
    // 重新排序查询到的结果数组
    arrayReorder (array) {
      var tempStr = ''
      for (var i = 0; i < array.length; i++) {
        if (array[i].lastIndexOf('SH') === -1 && array[i].lastIndexOf('SZ') === -1) {
          tempStr = array[i]
          array.splice(i, 1)
          array.splice(0, 0, tempStr)
        }
      }
      return array
    },
    /**
     * @description 增删更新列表
     * @augments batchFlag 添加（00）删除（01）更新（02）
     * @augments order 顺序（可不传）
     */
    addDeleteOptionStock (item, index, event) {
      this.isSelect = index
      var that = this
      const mobile = localStorage.getItem('mobile')
      if (mobile === null) {
        this.$emit('istoLogin')
      } else {
        this.toLoading = true
        if (item.flag === '+自选') {
          // 添加自选股
          that.$http.getUpdateOptionalStock({
            mobile: mobile,
            batchFlag: '00',
            stockCode: item.stockCode,
            market: item.market,
            order: ''
          }).then(result => {
            this.toLoading = false
            if (result.data.success === 'true') {
              item.flag = '-自选'
              that.addZxgStorage(item.stockCode, item.market, item.stockName)
              that.$alert('亲爱的用户，您已成功添加' + item.stockName, '提示消息', {
                confirmButtonText: '确定'
              })
              that.$store.commit('ZXG_LIST_ADD_WATCH', new Date())
            } else {
              alert(result.data.message)
            }
          })
        } else if (item.flag === '-自选') {
          // 删除自选股
          that.$http.getUpdateOptionalStock({
            mobile: mobile,
            batchFlag: '01',
            stockCode: item.stockCode,
            market: item.market,
            order: ''
          }).then(result => {
            this.toLoading = false
            if (result.data.success === 'true') {
              item.flag = '+自选'
              that.deleteZxgStorage(item.stockCode, item.market, item.stockName)
              that.$alert('亲爱的用户，您已成功取关' + item.stockName, '提示消息', {
                confirmButtonText: '确定'
              })
            } else {
              alert(result.data.message)
            }
          })
        }
      }
    },
    // 添加自选股缓存
    addZxgStorage (code, market, stockName) {
      var strStorage = localStorage.getItem('zxgStockStorage')
      if (strStorage !== '' && strStorage !== null && strStorage !== '{"zxg":[]}') {
        var strStorageJson = JSON.parse(strStorage)
        var len = strStorageJson.zxg.length
        var str = '{"code":"' + code + '","name":"' + stockName + '","zd":"","zdf":"","nowPrice":"","close":"","market":"' + market + '","groupNo":"","open":"","order":"' + (len + 1) + '"},'
        strStorage = strStorage.substring(0, 8) + str + strStorage.substring(8, strStorage.length)
        localStorage.setItem('zxgStockStorage', strStorage)
      } else {
        var timpStr = '{"zxg":['
        timpStr += '{"code":"' + code + '","name":"' + stockName + '","zd":"","zdf":"","nowPrice":"","close":"","market":"' + market + '","groupNo":"","open":"","order":"1"}' + ']}'
        localStorage.setItem('zxgStockStorage', timpStr)
      }
    },
    // 删除自选股缓存
    deleteZxgStorage (code, market, stockName) {
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
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/commen/inputSearch.less";
</style>
