<!--
@Author:duyun
@Date:2018-01-30
@Description: 页面-投资日历页面
-->
<template>
  <div>
    <!--顶部菜单-->
    <theader :popZxg="popZxg" @jsBtnClose="jsBtnClose"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix">
      <!-- 顶部指数 -->
      <index-value :index="time" :valueList="valueList"></index-value>
      <el-tabs v-model="activeName" type="card" class="calendar-tab">
        <el-tab-pane label="月" name="month">
          <month-tab></month-tab>
        </el-tab-pane>
        <el-tab-pane label="周" name="week">
          <week-tab></week-tab>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- <full-calendar :events="fcEvents" locale="zh"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
    </full-calendar> -->
    <div v-if="pop">
      <h3>日历标题</h3>
      <el-table
        :data="rlData"
        stripe>
        <el-table-column v-for="pro in rlList" :key="pro.id" :prop="pro.prop" :label="pro.label" :width="pro.width"></el-table-column>
      </el-table>
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
import monthTab from '@/components/pages/news/monthCalendar.vue'
import weekTab from '@/components/pages/news/weekCalendar.vue'
export default {
  name: 'news',
  components: {
    theader,
    topMenu,
    gtjaFooter,
    indexValue,
    monthTab,
    weekTab
  },
  data () {
    return {
      activeName: 'month',
      time: {},
      valueList: [],
      fcEvents: [],
      rlData: [],
      rlList: [],
      pop: false,
      popZxg: false
    }
  },
  mounted () {
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
.calendar-tab{
  .el-tabs__nav{
    float: right;
  }
}
.news-top {
  margin: 25px 0 0!important;
}
.calendar-tab {
  margin-top: -25px;
}
.riPop{
  display: none;
}
</style>

