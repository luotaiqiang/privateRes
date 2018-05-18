/*
 * @Description: 获取cookie，记录登录状态
 * 使用方法： this.$cookie.checkCookie(event) // event传入弹框显示判断条件
*/
export default {
  install: function (Vue, options) {
    // 获取当天相关信息
    function setCookie (cname, cvalue, exdays) {
      var d = new Date()
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
      var expires = 'expires=' + d.toUTCString()
      document.cookie = cname + '=' + cvalue + ';' + expires
    }
    function getCookie (cname) {
      var name = cname + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name) === 0) {
          return ''
        }
      }
    }
    // 判断当月一号是星期几，
    Vue.prototype.$cookie = {
      checkCookie (event) {
        var user = getCookie('username')
        if (user !== '') {
          event = true
        } else {
          event = true
          user = prompt('请输入你的名字：', '')
          if (user !== '' && user !== null) {
            setCookie('username', user, 30)
          }
        }
      }
    }
  }
}
