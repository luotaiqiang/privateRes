<!--
@Author:duyun
@Date:2017-11-23
@Description: 页面-指数个股页面
-->
<template>
  <div>
    <!--顶部菜单-->
    <theader :popZxg="popZxg"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix">
      <!-- 中间内容 -->
      <stock-info class="index-stock"></stock-info>
      <!-- 右侧公司介绍 -->
      <stock-pro></stock-pro>
    </div>
    <!-- 页脚 -->
    <gtjaFooter></gtjaFooter>
  </div>
</template>

<script>
import theader from '@/components/commen/theader.vue'
import topMenu from '@/components/commen/topMenu.vue'
import gtjaFooter from '@/components/commen/footer.vue'
import stockSidebar from '@/components/pages/stock/stockSidebar.vue'
import stockInfo from '@/components/pages/stock/stockInfo.vue'
import stockPro from '@/components/pages/stock/stockProSide.vue'
export default {
  name: 'index',
  components: {
    theader,
    topMenu,
    gtjaFooter,
    stockSidebar,
    stockInfo,
    stockPro
  },
  data () {
    return {
      popZxg: false
    }
  },
  methods: {
    istoLogin () {
      this.popZxg = true
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/normalize.less";
@import "../../assets/less/base.less";
.stock-cont.index-stock{
  width: 900px;
  padding-left: 0;
  .chart1{
    width: 100%;
  }
  .chart-right{
    display: none;
  }
}

</style>
