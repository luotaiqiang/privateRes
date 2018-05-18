/*
 * @Author:duyun
 * @Date: 2017-09-21
 * @Description: 顶部菜单栏
*/

<template>
  <div class="top-menu jsScroll" :class="{fixd:topMenuFixed}">
    <div class="gtja-layout clearfix">
      <div class="img gtja-logo"></div>
      <ul class="top-menu-ul">
        <li v-for="(topMenu, index) in topMenus" class="top-menu-li"  :key="topMenu.id">
          <span>{{topMenu.message}}</span>
          <ul class="dropDown">
            <li v-for="(dropDown, index) in topMenu.dropDownList" :key="dropDown.id">
              <a :href="dropDown.src" target="_blank">{{dropDown.message}}</a>
            </li>
          </ul>
        </li>
        <li class="top-menu-search"><inputsearch @istoLogin="toLogin"></inputsearch></li>
      </ul>
    </div>
  </div>
</template>

<script>
import inputsearch from '@/components/commen/inputSearch.vue'
import { topMenusBuild as TOPMENUS } from '../../config/topMenus.js'
export default {
  components: {
    inputsearch
  },
  data () {
    return {
      topMenus: TOPMENUS,
      topMenuFixed: false
    }
  },
  mounted () {
    // 监听窗口滑动事件
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 菜单栏滑动到顶部固定不动
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      var offsetTop = document.querySelector('.jsScroll').offsetTop
      if (scrollTop > offsetTop) {
        this.topMenuFixed = true
      } else {
        this.topMenuFixed = false
      }
    },
    toLogin () {
      this.$emit('istoLogin')
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/commen/topmenu.less";
@import "../../assets/fonts/iconfont/iconfont.css";
</style>


