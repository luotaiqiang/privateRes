/*
 * @Author:duyun
 * @Date: 2017-09-20
 * @Description: 公共模板:侧边栏
*/

<template>
  <ul class="sidebar">
    <li class="sidebar-li sidebar-title"><i class="iconfont icon-fenlei"></i>分类浏览</li>
    <li class="sidebar-li">
      <router-link to="/Shyl">深沪一览</router-link>
    </li>
    <li class="sidebar-li" v-for="sidebar in sidebarList" :key="sidebar.id">
      <a href="javascript:void(0);">{{sidebar.message}}</a>
      <span class="iconfont icon-icon_righttoparrow"></span>
      <div class="tip-menu clearfix" :class="sidebar.class">
        <ul v-for="tipMenu in sidebar.tipMenuList" :key="tipMenu.id">
          <li tag="li" v-for="item in tipMenu.tipMenuContList" :key="item.id" @click="linkTo(item.src, item.type, item.pageSize, item.page, item.sort)">
            <span :class="item.class">{{item.classify}}</span>
            <a :title="item.industry" href="javascript:void(0);">{{item.industry}}</a>
          </li>
        </ul>
      </div>
    </li>
    <li class="sidebar-li">
      <router-link to="/Shares">新股上市</router-link>
    </li>
    <li class="sidebar-li">
      <router-link to="/Billboard">龙虎榜</router-link>
    </li>
    <!-- <li class="sidebar-li">
      <router-link to="/AhPremium">AH股溢价</router-link>
    </li> -->
  </ul>
</template>

<script>
import { sidebarList as SIDEBARLIST } from '@/config/sidebar.js'
export default {
  name: 'sidbar',
  data () {
    return {
      sidebarList: SIDEBARLIST
    }
  },
  mounted () {
  },
  methods: {
    linkTo (linkPath, linkType, linkPageSize, linkPage, linkSortRule) {
      this.$router.push({
        name: linkPath,
        params: {
          type: linkType,
          pageSize: linkPageSize,
          page: linkPage,
          sortRule: linkSortRule
        }
      })
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/commen/sidebar.less";
</style>

