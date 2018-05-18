<!--
@Author:duyun
@Date:2017-11-23
@Description: 页面-股本结构页面
-->

<template>
  <div class="page">
    <!--顶部菜单-->
    <theader :popZxg="popZxg"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <!-- 主题内容 -->
    <div class="gtja-layout clearfix">
      <!-- 左侧侧边栏 -->
      <stock-sidebar></stock-sidebar>
      <!-- 右侧表格内容 -->
      <div class="pro-introl">
        <h1 class="pro-title">{{stkName}}(SH:{{stkCode}})</h1>
        <pro-table :elTableList="proTableList"></pro-table>
      </div>
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
import proTable from '@/components/commen/elTable.vue'
export default {
  components: {
    theader,
    topMenu,
    gtjaFooter,
    stockSidebar,
    proTable
  },
  data () {
    return {
      stkName: '',
      stkCode: '',
      proTableList: [],
      popZxg: false
    }
  },
  mounted () {
    this.$http.getCompanyPro().then(result => {
      this.proTableList = result.data.proTableList
      this.stkName = result.data.stkName
      this.stkCode = result.data.stkCode
      console.log(result.data)
    })
  },
  methods: {
    // 判断是否登录
    toClosePop () {
      this.popZxg = true
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/normalize.less";
@import "../../assets/less/base.less";
@import "../../assets/less/pages/page.pro.less";
</style>
