/*
 * @Author: duyun
 * @Date: 2017-11-20
 * @Description: vuex state
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    id: '',
    stkName: '', // mock 股票名称（3-4位数字）
    stkCode: '', // mock 股票代码（6位数字）
    price: '', // mock 当前价 （浮动数字）
    zd: '', // mock 涨跌额 （浮点数字-带负号）
    zhangf: '', // mock 涨跌幅 （浮点数字-带负号）
    sharePriceAmplitude: '', // mock 当日股价幅度（浮点数字-带负号）
    weekRange: '', // mock52周股价幅度（浮点数字-带负号）
    stockMarketValue: '', // mock 市值 （浮点数字）
    stockSYL: '', // mock 市盈率（浮点数字）
    stockTradingVolume: '', // mock 成交量（浮点数字）
    stockTurnover: '', // mock 成交额（浮点数字）
    subscriptionCode: '', // mock 申购代码(新股) （SH+6位数字）
    circulation: '', // mock 发行量(新股)（浮点数字）
    onlineCirculation: '', // mock 网上发行量(新股)（浮点数字）
    subscriptionCeiling: '', // mock 申购上限(新股)（浮点数字）
    issuePrice: '', // mock 发行价(新股)（浮点数字）
    announcementDate: '', // mock 中签号公布日(新股)（yyyy-mm-dd）
    successfulRate: '', // mock 中签率(新股)（浮点数字）
    signingContract: '-' // mock 每中一签约(新股)
  },
  mutations: {
    stockName (state, n) {
      this.state.stockName = n
    }
  }
})

export default store
