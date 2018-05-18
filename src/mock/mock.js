// const Mock = require('mockjs')
// // 获取 mock.Random 对象
// const Random = Mock.Random
// // var stockNameObj = ['股票A', '股票B', '股票C', '股票D', '股票E']
// // mock一组数据
// const produceData = function (opt) {
//   console.log('opt', opt)
//   let articles = []
//   for (let i = 0; i < 30; i++) {
//     let newArticleObject = {
//       'id|+1': 0,
//       stockName: Random.cname(3, 4), // mock 股票名称（3-4位数字）
//       stockCode: Random.integer() * 6, // mock 股票代码（6位数字）
//       stockCurrentPrice: Random.float(0), // mock 当前价 （浮动数字）
//       riseFall: Random.float(), // mock 涨跌额 （浮点数字-带负号）
//       priceRiseFall: Random.float(), // mock 涨跌幅 （浮点数字-带负号）
//       sharePriceAmplitude: Random.float(), // mock 当日股价幅度（浮点数字-带负号）
//       weekRange: Random.float(), // mock 52周股价幅度（浮点数字-带负号）
//       stockMarketValue: Random.float(), // mock 市值 （浮点数字）
//       stockSYL: Random.float(0), // mock 市盈率（浮点数字）
//       stockTradingVolume: Random.float(0), // mock 成交量（浮点数字）
//       stockTurnover: Random.float(0), // mock 成交额（浮点数字）
//       subscriptionCode: 'SH' + Random.integer() * 4, // mock 申购代码(新股) （SH+6位数字）
//       circulation: Random.float(), // mock 发行量(新股)（浮点数字）
//       onlineCirculation: Random.float(0), // mock 网上发行量(新股)（浮点数字）
//       subscriptionCeiling: Random.float(0), // mock 申购上限(新股)（浮点数字）
//       issuePrice: Random.float(), // mock 发行价(新股)（浮点数字）
//       announcementDate: '@date("yyyy-MM-dd")', // mock 中签号公布日(新股)（yyyy-mm-dd）
//       successfulRate: Random.float(0), // mock 中签率(新股)（浮点数字）
//       signingContract: '-' // mock 每中一签约(新股)
//     }
//     articles.push(newArticleObject)
//   }
//   return {
//     data: articles
//   }
// }
// Mock.mock('/api', /post|get/i, produceData)
