/*
 * @Author:duyun
 * @Date: 2018-01-31
 * @Description: 个股页面模板:买卖情况
*/
<template>
  <ul class="chart-right" :class="{chartUp: item.zd >= 0, chartDown: item.zd < 0}">
    <li class="color-range">
      <span>卖5</span>
      <span>{{item.sellPrice5 | numFix2}}</span>
      <span>{{item.sellVol5 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>卖4</span>
      <span>{{item.sellPrice4 | numFix2}}</span>
      <span>{{item.sellVol4 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>卖3</span>
      <span>{{item.sellPrice3 | numFix2}}</span>
      <span>{{item.sellVol3 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>卖2</span>
      <span>{{item.sellPrice2 | numFix2}}</span>
      <span>{{item.sellVol2 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>卖1</span>
      <span>{{item.sellPrice1 | numFix2}}</span>
      <span>{{item.sellVol1 | numFix0}}</span>
    </li>
    <li class="table-bg cel2 color-range">
      <span>当前价</span>
      <span>{{item.price | numFix2}}</span>
    </li>
    <li class="color-range">
      <span>买1</span>
      <span>{{item.buyPrice1 | numFix2}}</span>
      <span>{{item.buyVol1 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>买2</span>
      <span>{{item.buyPrice2 | numFix2}}</span>
      <span>{{item.buyVol2 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>买3</span>
      <span>{{item.buyPrice3 | numFix2}}</span>
      <span>{{item.buyVol3 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>买4</span>
      <span>{{item.buyPrice4 | numFix2}}</span>
      <span>{{item.buyVol4 | numFix0}}</span>
    </li>
    <li class="color-range">
      <span>买5</span>
      <span>{{item.buyPrice5 | numFix2}}</span>
      <span>{{item.buyVol5 | numFix0}}</span>
    </li>
    <li class="cel2">
      <span>委比 {{item.wb * 100 | numFix2}}%</span>
      <span>委差 {{item.wc | numFix0}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="less">
.chart-right.chartUp {
  li.color-range {
    span:nth-child(2) {
      color: #e63f52
    }
  }
}
.chart-right.chartDown {
  li.color-range {
    span:nth-child(2) {
      color: #390
    }
  }
}
</style>

