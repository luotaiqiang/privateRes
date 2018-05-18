/*
 * @Description: 获取日期相关信息
 * 使用方法： this.$date.dayInMonth(2018, 3) // 判断当前月有多少天
 * 使用方法： this.$date.dataInfo() // 当天的所有信息年/月/日/星期
 *
 * 为方便计算month按照0~11返回
*/
export default {
  install: function (Vue, options) {
    // 获取当天相关信息
    function getDateInfo () {
      var curDate = new Date()
      return {
        fullYear: curDate.getFullYear(),
        month: curDate.getMonth(),
        date: curDate.getDate(),
        day: curDate.getDay()
      }
    }
    // 判断当月一号是星期几，
    Vue.prototype.$date = {
      // 每月有几天
      daysInMonth (month, year) {
        return new Date(year, month + 1, 0).getDate()
      },
      // 当前天的具体信息
      dateInfo () {
        return getDateInfo()
      },
      firstDay (month) {
        let day = new Date(getDateInfo().fullYear, month, 1).getDay()
        if (day === 0) {
          return 7
        } else {
          return day
        }
      },
      numFormat (num) {
        return (num < 10) ? '0' + num.toString() : num.toString()
      }
    }
  }
}
