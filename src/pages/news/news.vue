<!--
@Author:duyun
@Date:2018-01-30
@Description: 页面-资讯页面
-->
<template>
  <div>
    <!--顶部菜单-->
    <theader :popZxg="popZxg" @jsBtnClose="jsBtnClose"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix">
      <!-- 顶部指数 -->
      <index-value></index-value>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="猜你喜欢" name="cnxh">
          <cnxh-tab></cnxh-tab>
        </el-tab-pane>
        <el-tab-pane label="热点追踪" name="rdzz">
          <rdzz-tab></rdzz-tab>
        </el-tab-pane>
        <el-tab-pane label="周期轮动" name="zqld">
          <zqld-tab></zqld-tab>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 页脚 -->
    <gtjaFooter></gtjaFooter>
  </div>
</template>

<script>
import theader from '@/components/commen/theader.vue'
import topMenu from '@/components/commen/topMenu.vue'
import gtjaFooter from '@/components/commen/footer.vue'
import indexValue from '@/components/pages/news/indexValue.vue'
import cnxhTab from '@/components/pages/news/cnxh.vue'
import rdzzTab from '@/components/pages/news/rdzz.vue'
import zqldTab from '@/components/pages/news/zqld.vue'
export default {
  name: 'news',
  components: {
    theader,
    topMenu,
    gtjaFooter,
    indexValue,
    cnxhTab,
    rdzzTab,
    zqldTab
  },
  data () {
    return {
      activeName: 'cnxh',
      popZxg: false
    }
  },
  methods: {
    istoLogin () {
      this.popZxg = true
    },
    toClosePop () {
      this.pop = true
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
