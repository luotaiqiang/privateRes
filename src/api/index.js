import http from '@/config/http'

let ajax = {
  // 股票排名数据
  getRank (payload) {
    return http.get('/hqapi/quotes/api/quotes/ranking.json', payload)
  },
  // 获取表单提示信息
  getSearchListTip (payload) {
    return http.get('./static/searchListTip.json', payload)
  },
  // 获取标题
  getContTitle (payload) {
    return http.get('./static/hqzx/contTitle.json', payload)
  },
  // 获取指数数据
  getStockQuote (payload) {
    return http.get('./static/hqzx/stockQuote.json', payload)
  },
  // 获取行情新股预告数据
  getStockPreview (payload) {
    return http.get('/hqapi/webpc2/newStock/rest/getNewStock.json', payload)
    // return http.get('./static/hqzx/stockPreview.json', payload)
  },
  // 获取排行榜数据
  getRankList (payload) {
    return http.get('./static/hqzx/rankList.json', payload)
  },
  // 行情左侧栏分行业股票信息
  getDiffBuisness (payload) {
    return http.get('/hqapi/Default.aspx?action=AInSide_', payload)
  },
  // 获取上海市场所有股票
  getAllStockOfSH (payload) {
    return http.get('/hqapi/Default.aspx?action=mStk&market=SH&token=LJH23LKJHssdUIs231LJLJ', payload)
  },
  // 获取深证市场所有股票
  getAllStockOfSZ (payload) {
    return http.get('/hqapi/Default.aspx?action=mStk&market=SZ&token=LJH23LKJHssdUIs231LJLJ', payload)
  },
  // 获取龙虎榜数据
  getBillboard (payload) {
    // return http.get('./static/hqzx/billboard.json', payload)
    return http.get('/hqapi/webpc2/myStock/rest/getStockCharts.json', payload)
  },
  // 获取自选股页面四大指数数据
  getIndexValue (payload) {
    return http.get('/hqapi/Default.aspx?action=inSide_JOSN&token=LJH23LKJHssdUIs231', payload)
  },
  // 获取自选股页面公告栏数据
  getZXGInfoValue (payload) {
    return http.get('./static/zxg/infoValue.json', payload)
  },
  // 自选股 公告栏 热点/实时/研报/公告/小君茶馆
  getZXGInfoData (payload) {
    return http.get('/hqapi/webpc2/news/rest/getRecentList.json', payload)
  },
  // 获取自选股涨幅榜、跌幅榜数据
  getRiseFall (payload) {
    return http.get('/hqapi/Default.aspx?action=bkpz&code=&bkfl=14&token=LJH23LKJHssdUIs231LJLJ', payload)
  },
  // 个股页面股票的不同股票的详细信息，今开，昨收，涨停板等。。。
  getStockIntro (payload) {
    return http.get('/hqapi/Default.aspx?action=inSide_JOSN&token=LJH23LKJHssdUIs231', payload)
  },
  // 个股页面股票的其他信息
  getStockIntroOther (payload) {
    return http.get('/hqapi/webpc2/diagnose/rest/getDiagnoseStkInfo.json', payload)
  },
  // 获取自选股列表股票信息 ?mobile=13761902640
  getZXGStock (payload) {
    return http.get('/hqapi/webpc2/myStock/rest/getOptionalStock.json', payload)
  },
  // 获取自选股增加、删除、更新
  getUpdateOptionalStock (payload) {
    return http.get('/hqapi/webpc2/myStock/rest/updateOptionalStock.json?', payload)
  },
  getKlineRZY (payload) {
    return http.get('/hqapi/quotes/api/quotes/candlestick.json?', payload)
  },
  // 获取k线图(分钟图，及其股票相关参数)
  getSpline (payload) {
    // return http.get('/hqapi/quotes/api/quotes/spline.json', payload)
    return http.get('/hqapi/webpc2/quotes/rest/minKLine.json', payload) // 缓存
  },
  // 获取K线图（日K）缓存
  getKlineR (payload) {
    return http.get('/hqapi/webpc2/quotes/rest/demo_day.json?', payload)
  },
  // 获取K线图（周k）缓存
  getKlineZ (payload) {
    return http.get('/hqapi/webpc2/quotes/rest/demo_week.json?', payload)
  },
  // 获取K线图（月k）缓存
  getKlineY (payload) {
    return http.get('/hqapi/webpc2/quotes/rest/demo_month.json?', payload)
  },
  // 获取个股周期分析重要节日
  getImportantFestival (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getImportantFestival.json?', payload)
  },
  // 获取个股周期分析其他节日
  getOtherFestival (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getOtherFestival.json?', payload)
  },
  // 获取沪深A股
  getstockInfo (payload) {
    return http.get('./static/stockInfo.json', payload)
  },
  // 获取资讯摘要和新闻列表 getNewsRecommend.json?type=2&mobile=1
  getNewsRecommend (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getNewsRecommend.json', payload)
  },
  // 获取资讯摘要 - 猜你喜欢（模拟数据）
  getNewsRecommend1 (payload) {
    return http.get('./static/news/getNewsRecommendTab1.json', payload)
  },
  // 获取资讯摘要 - 热点追踪（模拟数据）
  getNewsRecommend2 (payload) {
    return http.get('./static/news/getNewsRecommendTab2.json', payload)
  },
  // 获取资讯摘要 - 周期轮动（模拟数据）
  getNewsRecommend3 (payload) {
    return http.get('./static/news/getNewsRecommendTab3.json', payload)
  },
  // 获取个股周期分析结果
  getperiodAnalysis (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/period_analysis.json', payload)
    // return http.get('./static/news/period_analysis.json', payload)
  },
  // 获取个股联动分析结果
  getLinkageAanalysis (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/price_linkage_analysis.json', payload)
    // return http.get('./static/stock/linkageAanalysis.json', payload)
  },
  // 获取资讯公告栏数据
  getZXInfo (payload) {
    return http.get('./static/news/infoValue.json', payload)
  },
  // 获取资讯摘要数据
  getZXNewsInfo (payload) {
    return http.get('./static/news/newsInfo.json', payload)
  },
  // 获取资讯详情页
  getNewsDetail (payload) {
    return http.get('/hqapi/webpc2/news/rest/getNewsDetail.json', payload)
  },
  // 获取阿尔法资讯详情页
  getAfaNewsDetail (payload) {
    // return http.get('./static/news/getAfaNewsDetail.json', payload)
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getAfaNewsDetail.json', payload)
  },
  // 获取投资日历(全部)
  getCalendar (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/finance_calendar.json', payload)
    // return http.get('./static/news/canlendar.json', payload)
  },
  // 获取投资日历(财经事件)
  getMajorEvent (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getMajorEvent.json', payload)
    // return http.get('./static/news/getMajorEvent.json', payload)
  },
  // 获取投资日历(宏观数据)
  getMacroData (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getMacroData.json', payload)
    // return http.get('./static/news/getMacroData.json', payload)
  },
  // 获取投资日历(业绩报告)
  getPerformancePeport (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/getPerformancePeport.json', payload)
    // return http.get('./static/news/getPerformancePeport.json', payload)
  },
  // 投资日历业务预告
  getPerformanceForecast (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/performance_forecast_info.json', payload)
    // return http.get('./static/news/performance_forecast_info.json', payload)
  },
  // 投资日历业务快报
  getPerformanceLetter (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/performance_letter_info.json', payload)
    // return http.get('./static/news/performance_letter_info.json', payload)
  },
  // 投资日历业务报表
  getPerformanceReport (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/performance_report_info.json', payload)
    // return http.get('./static/news/performance_report_info.json', payload)
  },
  // 投资日历业绩披露
  getPerformanceExpose (payload) {
    return http.get('/hqapi/webpc2/afaAnalyse/rest/performance_expose_info.json', payload)
    // return http.get('./static/news/performance_expose_info.json', payload)
  },
  getSharesList (payload) {
    return http.get('./static/hqzx/sharesList.json', payload)
  },
  getSharesListData (payload) {
    return http.get('./static/hqzx/value.json', payload)
  },
  getStockPro (payload) {
    return http.get('./static/stock/stockPro.json', payload)
  },
  getCompanyPro (payload) {
    return http.get('./static/stock/companyPro.json', payload)
  },
  // 得到子话题
  getTopic (payload) {
    // return http.get('./static/news/topics.json', payload)
    return http.get('/hqapi/webpc2/afaAnalyse/rest/topics.json', payload)
  },
  // 获得事件分析结果
  getEventAnalysis (payload) {
    // return http.get('./static/news/event_analysis.json', payload)
    return http.get('/hqapi/webpc2/afaAnalyse/rest/event_analysis.json', payload)
  },
  // 发送验证码
  getSendSms (payload) {
    return http.get('/hqapi/evercos/tracker/async/sendSms.json', payload)
  },
  // 登录
  getGencode (payload) {
    return http.get('/hqapi/evercos/tracker/gencode.json', payload)
  }
}

export default {
  install: function (Vue, options) {
    Vue.prototype.$http = ajax
  }
}
