/*
 * @Author: woden0415.wangdong
 * @Date: 2017-12-25 16:46:02
 * @Description: 过滤器
 * 使用方法 在需要使用该过滤器的页面注册
 * import filters from '../../filters/index.js'
 *  Object.keys(filters).forEach(key => {
 *    Vue.filter(key, filters[key])
 * })
 * 组件中   {{   变量 | numFix2}}
*/
let numFix0 = value => {
  if (!Number.isNaN(Number(value))) {
    return parseFloat(value).toFixed(0)
  } else {
    return '--'
  }
}
let numFix2 = value => {
  if (!Number.isNaN(Number(value))) {
    return parseFloat(value).toFixed(2)
  } else {
    return '--'
  }
}
let numFix4 = value => {
  if (!Number.isNaN(Number(value))) {
    return parseFloat(value).toFixed(4)
  } else {
    return '--'
  }
}
let dateFormat = value => {
  return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6)
}
let timeFormat = value => {
  if (value.substr(0, 1) === '0') {
    return '0' + value.substr(0, 1) + ':' + value.substr(1, 2) + ':' + value.substr(3, 2)
  } else {
    if (Number(value.substr(0, 2)) > 15) {
      var today = new Date()
      var h = today.getHours()
      var m = today.getMinutes()
      var s = today.getSeconds()
      return h + ':' + m + ':' + s
    } else {
      return value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.substr(4, 2)
    }
  }
}
let toPercent = value => {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}
export default{
  numFix0,
  numFix2,
  numFix4,
  dateFormat,
  timeFormat,
  toPercent
}
