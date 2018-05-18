/*
 * @Author:duyun
 * @Date: 2017-11-24
 * @Description: 个股页面模板:侧边栏
*/

<template>
  <div class="stock-sidebar">
    <ul v-for="item in stockSidebar" :key="item.id">
      <li class="stock-title">{{item.title}}</li>
      <li v-for="stock in item.stockList" :key="stock.id">
        <a :href="stock.src">{{stock.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { stockSidebar as STOCKSIDEBAR } from '@/config/stockSidebar.js'
export default {
  data () {
    return {
      stockSidebar: []
    }
  },
  created () {
    this.stockSidebar = STOCKSIDEBAR
  }
}
</script>

<style lang="less">
@import "../../../assets/less/commen/stockSidebar.less";
</style>



