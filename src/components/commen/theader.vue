/*
 * @Author:duyun
 * @Date: 2017-09-20
 * @Description: 统一顶部栏
*/

<template>
  <div class="gtja-header">
    <div class="gtja-layout clearfix">
      <a class="gtja-gw-logo" href="http://www.gtja.com/i/" target="_blank">
        官网
      </a>
      <div class="gtja-header-menu">
        <span class="menu-link login" v-if="isLogin" @click="toPopup()">登录</span>
        <span class="menu-link login" v-if="!isLogin">欢迎您，用户{{login}}</span>
        <a class="menu-line" href="http://www.gtja.com/content/default/per/download/index1.html" target="_blank"><a class="iconfont icon-download"></a>软件下载</a>
        <a class="menu-line" href="https://kh.gtja.com/kh/busimanage/index.jsp?source=www" target="_blank"><a class="iconfont icon-icon-user-info"></a>快捷开户</a>
        <a class="menu-line" href="http://www.gtja.com/content/default/about_branch.html" target="_blank"><a class="iconfont icon-address"></a>线下营业厅</a>
      </div>
    </div>
    <gtja-login class="login1" v-if="popZxg" @jsBtnClose="jsBtnClose"  @toClosePop="toClosePop"></gtja-login>
  </div>
</template>

<script>
import gtjaLogin from '@/components/commen/login.vue'
export default {
  props: [
    'popZxg'
  ],
  components: {
    gtjaLogin
  },
  name: 'theader',
  data () {
    return {
      popZxg: false,
      login: '',
      isLogin: true
    }
  },
  mounted () {
    this.initial()
  },
  methods: {
    // 刚进页面判断是否有登录
    initial () {
      const mobile = localStorage.getItem('mobile')
      if (mobile !== null) {
        this.login = mobile.substr(0, 3) + '****' + mobile.substr(7, 4)
        this.isLogin = false
      }
    },
    toPopup () {
      this.popZxg = true
    },
    toClosePop (mobile) {
      this.popZxg = false
      this.login = mobile.substr(0, 3) + '****' + mobile.substr(7, 4)
      this.isLogin = false
    },
    jsBtnClose () {
      this.popZxg = false
      this.$emit('jsBtnClose')
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/commen/theader.less";
</style>


