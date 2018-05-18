
<template>
  <div>
    <!--顶部菜单-->
    <theader :popZxg="popZxg" @jsBtnClose="jsBtnClose"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-main">
      <!--标题-->
      <contTitle :contTitle="hqContTitle"></contTitle>
      <!-- 中间主题部分 -->
      <div class="main-content gtja-layout clearfix">
        <!-- 左侧导航 -->
        <sidebar></sidebar>
        <!-- 右侧主题内容（切换部分） -->
        <router-view></router-view>
      </div>
    </div>
    <!-- 页脚 -->
    <gtjaFooter></gtjaFooter>
  </div>
</template>

<script>
import theader from '@/components/commen/theader'
import sidebar from '@/components/commen/sidebar'
import topMenu from '@/components/commen/topMenu'
import contTitle from '@/components/commen/contTitle'
import gtjaFooter from '@/components/commen/footer'
import initial from '@/components/pages/hangqing/hqzx/initial'
export default {
  name: 'index',
  components: {
    theader,
    sidebar,
    topMenu,
    contTitle,
    initial,
    gtjaFooter
  },
  data () {
    return {
      initial: true,
      hqContTitle: [
        {
          'text1': '行情',
          'text2': '行情中心',
          'src': './index.html'
        }
      ],
      popZxg: false
    }
  },
  created: function () {
    // 页面加载时跳转行情中心默认板块
    var currPath = this.$router.history.current.fullPath
    if (currPath === '/' || currPath === '/Initial') {
      this.$router.push('Initial')
    }
  },
  methods: {
    istoLogin () {
      this.popZxg = true
    },
    jsBtnClose () {
      this.popZxg = false
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/normalize.less";
@import "../../assets/less/base.less";
</style>
