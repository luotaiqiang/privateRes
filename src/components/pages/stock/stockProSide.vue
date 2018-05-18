/*
 * @Author:duyun
 * @Date: 2017-11-24
 * @Description: 个股页面:右侧简介
*/

<template>
  <div class="stock-pro">
    <!-- <div v-for="pro in proList" :key="pro.id"> -->
      <!-- 公司介绍 -->
      <div class="pro-item">
        <img class="pro-ad" src="../../../assets/images/pro-ad.png">
        <div class="pro-summary" :class="{ hide:summary }">
          <span class="bold">简介:</span>
          {{proList.proSummary}}
          <span class="color-default cursor-default" @click="hideSummary()"><i class="iconfont icon-jiantou"></i>展开</span>
        </div>
        <div class="pro-detail" :class="{ hide:detail }">
          <p>
            <span class="bold">简介:</span>
            {{proList.proDetail}}
          </p>
          <p><span class="bold">公司网站：</span><a class="color-default" target="_blank" :href="proList.proLink">{{proList.proLink}}</a></p>
          <p><span class="bold">公司地址：</span>{{proList.proAddress}}</p>
          <div class="color-default cursor-default" @click="hideDetail()"><i class="iconfont icon-arrow-up"></i>收起</div>
        </div>
      </div>

      <!-- 大事件 -->
      <div class="pro-item">
        <div class="pro-title">大事件</div>
        <ul class="pro-item-ul">
          <li v-for="item in proList.eventList" :key="item.id">{{item.event}}</li>
        </ul>
      </div>
      <!-- 行业标签 -->
      <div class="pro-item">
        <div class="pro-title">行业标签：{{proList.proLabel}}</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="非银金融" name="fyjr" >
            <stock-table :elTableList="syjyStockList" :lintToStock="lintToStock"></stock-table>
          </el-tab-pane>
          <el-tab-pane label="次新" name="cx" >
            <stock-table :elTableList="cxStockList" :lintToStock="lintToStock"></stock-table>
          </el-tab-pane>
          <el-tab-pane label="证券" name="zq" >
            <stock-table :elTableList="zqStockList" :lintToStock="lintToStock"></stock-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <img class="pro-ad" src="../../../assets/images/pro-ad.png">
    </div>
  <!-- </div> -->
</template>

<script>
import stockTable from '@/components/commen/elTable.vue'
export default {
  components: {
    stockTable
  },
  data () {
    return {
      detail: true,
      summary: false,
      proList: {},
      activeName: 'zq',
      // 非银金融数据
      syjyStockList: {},
      // 证券数据
      zqStockList: {},
      // 次新数据
      cxStockList: {}
    }
  },
  mounted () {
    this.$http.getStockPro().then(result => {
      this.proList = result.data.proList
      this.zqStockList = result.data.zqStockList
      this.syjyStockList = result.data.zqStockList
      this.cxStockList = result.data.zqStockList
      /* console.log(result.data) */
    })
  },
  methods: {
    hideSummary: function () {
      /* console.log(this.summary) */
      this.summary = true
      this.detail = false
    },
    hideDetail: function () {
      /* console.log(this.summary) */
      this.detail = true
      this.summary = false
    },
    lintToStock (row, event, column) {
      // window.location.href = '/stock.html#/stock/' + row.market + row.stkCode
    }
  }
}
</script>

<style lang="less">
</style>
