<!--
@Author:duyun
@Date:2017-11-23
@Description: 页面-个股页面
-->
<template>
  <div>
    <!--顶部菜单-->
    <theader :popZxg="popZxg" @jsBtnClose="jsBtnClose"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix">
      <!-- 左侧导航 -->
      <!-- <stock-sidebar></stock-sidebar> -->
      <!-- 中间内容 -->
      <div class="stock-cont">
        <!-- 个股介绍 -->
        <router-view name="stockintro" @toClosePop="toClosePop"></router-view>
        <!--<stock-info></stock-info>-->
      </div>
      <!-- 右侧公司介绍 -->
      <!-- <stock-pro></stock-pro> -->
    </div>
    <!-- 页脚 -->
    <gtjaFooter></gtjaFooter>
  </div>
</template>

<script>
import theader from '@/components/commen/theader.vue'
import topMenu from '@/components/commen/topMenu.vue'
import gtjaFooter from '@/components/commen/footer.vue'
// import stockSidebar from '@/components/pages/stock/stockSidebar.vue'
// import stockPro from '@/components/pages/stock/stockProSide.vue'
export default {
  name: 'index',
  components: {
    theader,
    topMenu,
    gtjaFooter
  },
  data () {
    return {
      popZxg: false
    }
  },
  methods: {
    // 判断是否登录
    toClosePop () {
      this.popZxg = true
    },
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
