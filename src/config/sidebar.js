/*
 * @Author: duyun
 * @Date: 2018-01-23
 * @Description: 行情左侧导航栏
*/

module.exports = (function () {
  return {
    sidebarList: [
      {
        message: '基础分类',
        class: 'basic',
        tipMenuList: [
          {
            tipMenuContList: [
              { classify: 'C', industry: '创业板', src: 'Basic', type: 612, sort: 'zhangf_desc' },
              { classify: 'H', industry: '沪市A股', src: 'Basic', type: 61, sort: 'zhangf_desc' },
              { industry: '深市A股', class: 'bg-w', src: 'Basic', type: 63, sort: 'zhangf_desc' },
              { industry: '沪市B股', class: 'bg-w', src: 'Basic', type: 62, sort: 'zhangf_desc' },
              { industry: '深市B股', class: 'bg-w', src: 'Basic', type: 64, sort: 'zhangf_desc' },
              { classify: 'J', industry: '警示板', src: 'Basic', type: 'JSB', sort: 'zhangf_desc' },
              { classify: 'Z', industry: '中小板', src: 'Basic', type: 69, sort: 'zhangf_desc' }
            ]
          }
        ]
      },
      {
        message: '分行业',
        class: 'hy',
        tipMenuList: [
          {
            tipMenuContList: [
              { classify: 'B', industry: '玻璃制造', src: 'Diff', type: 400128886, sort: 'zhangf_desc' },
              { industry: '白色家电', 'class': 'bg-w', src: 'Diff', type: 400128910, sort: 'zhangf_desc' },
              { industry: '包装印刷', 'class': 'bg-w', src: 'Diff', type: 400128913, sort: 'zhangf_desc' },
              { industry: '半导体', 'class': 'bg-w', src: 'Diff', type: 400128942, sort: 'zhangf_desc' },
              { industry: '保险', 'class': 'bg-w', src: 'Diff', type: 400128970, sort: 'zhangf_desc' },
              { classify: 'C', industry: '采掘服务', src: 'Diff', type: 400128873, sort: 'zhangf_desc' },
              { industry: '畜禽养殖', 'class': 'bg-w', src: 'Diff', type: 400128922, sort: 'zhangf_desc' },
              { industry: '船舶制造', 'class': 'bg-w', src: 'Diff', type: 400128905, sort: 'zhangf_desc' },
              { industry: '餐饮', 'class': 'bg-w', src: 'Diff', type: 400128940, sort: 'zhangf_desc' },
              { classify: 'D', industry: '电机', src: 'Diff', type: 400128893, sort: 'zhangf_desc' },
              { industry: '电气自动化设备', 'class': 'bg-w', src: 'Diff', type: 400128894, sort: 'zhangf_desc' },
              { industry: '电源设备', 'class': 'bg-w', src: 'Diff', type: 400128895, sort: 'zhangf_desc' },
              { industry: '地面兵装', 'class': 'bg-w', src: 'Diff', type: 400128904, sort: 'zhangf_desc' },
              { industry: '电子制造', 'class': 'bg-w', src: 'Diff', type: 400128945, sort: 'zhangf_desc' },
              { industry: '电力', 'class': 'bg-w', src: 'Diff', type: 400128954, sort: 'zhangf_desc' },
              { industry: '多元金融', 'class': 'bg-w', src: 'Diff', type: 400128971, sort: 'zhangf_desc' },
              { classify: 'F', industry: '房屋建设', src: 'Diff', type: 400128888, sort: 'zhangf_desc' },
              { industry: '纺织制造', 'class': 'bg-w', src: 'Diff', type: 400128925, sort: 'zhangf_desc' },
              { industry: '服装家纺', 'class': 'bg-w', src: 'Diff', type: 400128926, sort: 'zhangf_desc' },
              { industry: '房地产开发', 'class': 'bg-w', src: 'Diff', type: 400128966, sort: 'zhangf_desc' },
              { classify: 'G', industry: '钢铁', src: 'Diff', type: 400128880, sort: 'zhangf_desc' },
              { industry: '工业金属', 'class': 'bg-w', src: 'Diff', type: 400128881, sort: 'zhangf_desc' },
              { industry: '高低压设备', 'class': 'bg-w', src: 'Diff', type: 400128896, sort: 'zhangf_desc' },
              { industry: '港口', 'class': 'bg-w', src: 'Diff', type: 400128958, sort: 'zhangf_desc' },
              { industry: '高速公路', 'class': 'bg-w', src: 'Diff', type: 400128959, sort: 'zhangf_desc' },
              { industry: '公交', 'class': 'bg-w', src: 'Diff', type: 400128960, sort: 'zhangf_desc' },
              { industry: '光学光电子', 'class': 'bg-w', src: 'Diff', type: 400128944, sort: 'zhangf_desc' },
              { classify: 'H', industry: '化学原料', src: 'Diff', type: 400128875, sort: 'zhangf_desc' },
              { industry: '化学制品', 'class': 'bg-w', src: 'Diff', type: 400128876, sort: 'zhangf_desc' },
              { industry: '化学纤维', 'class': 'bg-w', src: 'Diff', type: 400128877, sort: 'zhangf_desc' },
              { industry: '航天装备', 'class': 'bg-w', src: 'Diff', type: 400128902, sort: 'zhangf_desc' },
              { industry: '航空装备', 'class': 'bg-w', src: 'Diff', type: 400128903, sort: 'zhangf_desc' },
              { industry: '化学制药', 'class': 'bg-w', src: 'Diff', type: 400128927, sort: 'zhangf_desc' },
              { industry: '互联网传媒', 'class': 'bg-w', src: 'Diff', type: 400128951, sort: 'zhangf_desc' },
              { industry: '环保工程及服务', 'class': 'bg-w', src: 'Diff', type: 400128957, sort: 'zhangf_desc' },
              { industry: '航空运输', 'class': 'bg-w', src: 'Diff', type: 400128961, sort: 'zhangf_desc' },
              { industry: '航运', 'class': 'bg-w', src: 'Diff', type: 400128963, sort: 'zhangf_desc' },
              { industry: '黄金', 'class': 'bg-w', src: 'Diff', type: 400128882, sort: 'zhangf_desc' },
              { classify: 'J', industry: '基础建设', src: 'Diff', type: 400128890, sort: 'zhangf_desc' },
              { industry: '家用轻工', 'class': 'bg-w', src: 'Diff', type: 400128914, sort: 'zhangf_desc' },
              { industry: '景点', 'class': 'bg-w', src: 'Diff', type: 400128937, sort: 'zhangf_desc' },
              { industry: '酒店', 'class': 'bg-w', src: 'Diff', type: 400128938, sort: 'zhangf_desc' },
              { industry: '计算机设备', 'class': 'bg-w', src: 'Diff', type: 400128947, sort: 'zhangf_desc' },
              { industry: '计算机应用', 'class': 'bg-w', src: 'Diff', type: 400128948, sort: 'zhangf_desc' },
              { industry: '机场', 'class': 'bg-w', src: 'Diff', type: 400128962, sort: 'zhangf_desc' },
              { industry: '金属非金属新材料', 'class': 'bg-w', src: 'Diff', type: 400128884, sort: 'zhangf_desc' },
              { industry: '金属制品', 'class': 'bg-w', src: 'Diff', type: 400128900, sort: 'zhangf_desc' },
              { classify: 'L', industry: '林业', src: 'Diff', type: 400128918, sort: 'zhangf_desc' },
              { industry: '旅游综合', 'class': 'bg-w', src: 'Diff', type: 400128939, sort: 'zhangf_desc' },
              { classify: 'M', industry: '煤炭开采', src: 'Diff', type: 400128871, sort: 'zhangf_desc' },
              { industry: '贸易', 'class': 'bg-w', src: 'Diff', type: 400128936, sort: 'zhangf_desc' },
              { classify: 'N', industry: '农产品加工', src: 'Diff', type: 400128920, sort: 'zhangf_desc' },
              { industry: '农业综合', 'class': 'bg-w', src: 'Diff', type: 400128921, sort: 'zhangf_desc' },
              { classify: 'Q', industry: '其他采掘', src: 'Diff', type: 400128872, sort: 'zhangf_desc' },
              { industry: '其他建材', 'class': 'bg-w', src: 'Diff', type: 400128887, sort: 'zhangf_desc' },
              { industry: '汽车整车', 'class': 'bg-w', src: 'Diff', type: 400128906, sort: 'zhangf_desc' },
              { industry: '汽车零部件', 'class': 'bg-w', src: 'Diff', type: 400128907, sort: 'zhangf_desc' },
              { industry: '汽车服务', 'class': 'bg-w', src: 'Diff', type: 400128908, sort: 'zhangf_desc' },
              { industry: '其他交运设备', 'class': 'bg-w', src: 'Diff', type: 400128909, sort: 'zhangf_desc' },
              { industry: '其他轻工制造', 'class': 'bg-w', src: 'Diff', type: 400128910, sort: 'zhangf_desc' },
              { industry: '其他休闲服务', 'class': 'bg-w', src: 'Diff', type: 400128941, sort: 'zhangf_desc' },
              { industry: '其他电子', 'class': 'bg-w', src: 'Diff', type: 400128946, sort: 'zhangf_desc' },
              { classify: 'R', industry: '燃气', src: 'Diff', type: 400128956, sort: 'zhangf_desc' },
              { classify: 'S', industry: '石油开采', src: 'Diff', type: 400128870, sort: 'zhangf_desc' },
              { industry: '石油化工', 'class': 'bg-w', src: 'Diff', type: 400128874, sort: 'zhangf_desc' },
              { industry: '塑料', 'class': 'bg-w', src: 'Diff', type: 400128878, sort: 'zhangf_desc' },
              { industry: '饲料', 'class': 'bg-w', src: 'Diff', type: 400128919, sort: 'zhangf_desc' },
              { industry: '水泥制造', 'class': 'bg-w', src: 'Diff', type: 400128885, sort: 'zhangf_desc' },
              { industry: '视听器材', 'class': 'bg-w', src: 'Diff', type: 400128911, sort: 'zhangf_desc' },
              { industry: '食品加工', 'class': 'bg-w', src: 'Diff', type: 400128924, sort: 'zhangf_desc' },
              { industry: '生物制品', 'class': 'bg-w', src: 'Diff', type: 400128929, sort: 'zhangf_desc' },
              { industry: '商业物业经营', 'class': 'bg-w', src: 'Diff', type: 400128935, sort: 'zhangf_desc' },
              { classify: 'T', industry: '通用机械', src: 'Diff', type: 400128897, sort: 'zhangf_desc' },
              { industry: '通信运营', 'class': 'bg-w', src: 'Diff', type: 400128952, sort: 'zhangf_desc' },
              { industry: '通信设备', 'class': 'bg-w', src: 'Diff', type: 400128953, sort: 'zhangf_desc' },
              { industry: '铁路运输', 'class': 'bg-w', src: 'Diff', type: 400128964, sort: 'zhangf_desc' },
              { classify: 'T', industry: '文化传媒', src: 'Diff', type: 400128949, sort: 'zhangf_desc' },
              { industry: '物流', 'class': 'bg-w', src: 'Diff', type: 400128965, sort: 'zhangf_desc' },
              { classify: 'X', industry: '橡胶', src: 'Diff', type: 400128879, sort: 'zhangf_desc' },
              { industry: '稀有金属', 'class': 'bg-w', src: 'Diff', type: 400128883, sort: 'zhangf_desc' },
              { classify: 'Y', industry: '园林工程', src: 'Diff', type: 400128892, sort: 'zhangf_desc' },
              { industry: '仪器仪表', 'class': 'bg-w', src: 'Diff', type: 400128899, sort: 'zhangf_desc' },
              { industry: '运输设备', 'class': 'bg-w', src: 'Diff', type: 400128901, sort: 'zhangf_desc' },
              { industry: '渔业', 'class': 'bg-w', src: 'Diff', type: 400128917, sort: 'zhangf_desc' },
              { industry: '饮料制造', 'class': 'bg-w', src: 'Diff', type: 400128923, sort: 'zhangf_desc' },
              { industry: '医药商业', 'class': 'bg-w', src: 'Diff', type: 400128930, sort: 'zhangf_desc' },
              { industry: '医疗器械', 'class': 'bg-w', src: 'Diff', type: 400128931, sort: 'zhangf_desc' },
              { industry: '医疗服务', 'class': 'bg-w', src: 'Diff', type: 400128932, sort: 'zhangf_desc' },
              { industry: '一般零售', 'class': 'bg-w', src: 'Diff', type: 400128933, sort: 'zhangf_desc' },
              { industry: '元件', 'class': 'bg-w', src: 'Diff', type: 400128943, sort: 'zhangf_desc' },
              { industry: '营销传播', 'class': 'bg-w', src: 'Diff', type: 400128950, sort: 'zhangf_desc' },
              { industry: '园区开发', 'class': 'bg-w', src: 'Diff', type: 400128967, sort: 'zhangf_desc' },
              { industry: '银行', 'class': 'bg-w', src: 'Diff', type: 400128968, sort: 'zhangf_desc' },
              { classify: 'Z', industry: '装修装饰', src: 'Diff', type: 400128889, sort: 'zhangf_desc' },
              { industry: '专业工程', 'class': 'bg-w', src: 'Diff', type: 400128891, sort: 'zhangf_desc' },
              { industry: '专用设备', 'class': 'bg-w', src: 'Diff', type: 400128898, sort: 'zhangf_desc' },
              { industry: '造纸', 'class': 'bg-w', src: 'Diff', type: 400128912, sort: 'zhangf_desc' },
              { industry: '种植业', 'class': 'bg-w', src: 'Diff', type: 400128916, sort: 'zhangf_desc' },
              { industry: '中药', 'class': 'bg-w', src: 'Diff', type: 400128928, sort: 'zhangf_desc' },
              { industry: '专业零售', 'class': 'bg-w', src: 'Diff', type: 400128934, sort: 'zhangf_desc' },
              { industry: '证券', 'class': 'bg-w', src: 'Diff', type: 400128969, sort: 'zhangf_desc' },
              { industry: '综合', 'class': 'bg-w', src: 'Diff', type: 400128972, sort: 'zhangf_desc' }
            ]
          }
        ]
      },
      {
        message: '排行',
        class: 'ph',
        tipMenuList: [
          {
            tipMenuContList: [
              { classify: 'C', industry: '创业板涨幅', src: 'Rank', type: 612, sort: 'zhangf_desc' },
              { industry: '创业板跌幅', 'class': 'bg-w', src: 'Rank', type: 612, sort: 'zhangf_asc' },
              { industry: '创业板成交额', 'class': 'bg-w', src: 'Rank', type: 612, sort: 'amount_desc' },
              { industry: '创业板成交量', 'class': 'bg-w', src: 'Rank', type: 612, sort: 'vol_desc' },
              { classify: 'H', industry: '沪A涨幅', src: 'Rank', type: 61, sort: 'zhangf_desc' },
              { industry: '沪A跌幅', 'class': 'bg-w', src: 'Rank', type: 61, sort: 'zhangf_asc' },
              { industry: '沪A成交额', 'class': 'bg-w', src: 'Rank', type: 61, sort: 'amount_desc' },
              { industry: '沪A成交量', 'class': 'bg-w', src: 'Rank', type: 61, sort: 'vol_desc' },
              { industry: '深A涨幅', 'class': 'bg-w', src: 'Rank', type: 63, sort: 'zhangf_desc' },
              { industry: '深A跌幅', 'class': 'bg-w', src: 'Rank', type: 63, sort: 'zhangf_asc' },
              { industry: '深A成交额', 'class': 'bg-w', src: 'Rank', type: 63, sort: 'amount_desc' },
              { industry: '深A成交量', 'class': 'bg-w', src: 'Rank', type: 63, sort: 'vol_desc' },
              { industry: '沪B涨幅', 'class': 'bg-w', src: 'Rank', type: 62, sort: 'zhangf_desc' },
              { industry: '沪B跌幅', 'class': 'bg-w', src: 'Rank', type: 62, sort: 'zhangf_asc' },
              { industry: '沪B成交额', 'class': 'bg-w', src: 'Rank', type: 62, sort: 'amount_desc' },
              { industry: '沪B成交量', 'class': 'bg-w', src: 'Rank', type: 62, sort: 'vol_desc' },
              { industry: '深B涨幅', 'class': 'bg-w', src: 'Rank', type: 64, sort: 'zhangf_desc' },
              { industry: '深B跌幅', 'class': 'bg-w', src: 'Rank', type: 64, sort: 'zhangf_asc' },
              { industry: '深B成交额', 'class': 'bg-w', src: 'Rank', type: 64, sort: 'amount_desc' },
              { industry: '深B成交量', 'class': 'bg-w', src: 'Rank', type: 64, sort: 'vol_desc' },
              { classify: 'Z', industry: '中小板涨幅', src: 'Rank', type: 69, sort: 'zhangf_desc' },
              { industry: '中小板跌幅', 'class': 'bg-w', src: 'Rank', type: 69, sort: 'zhangf_asc' },
              { industry: '中小板成交额', 'class': 'bg-w', src: 'Rank', type: 69, sort: 'amount_desc' },
              { industry: '中小板成交量', 'class': 'bg-w', src: 'Rank', type: 69, sort: 'vol_desc' }
            ]
          }
        ]
      }
    ]
  }
})()
