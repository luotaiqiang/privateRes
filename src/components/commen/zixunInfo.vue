/*
 * @Author:duyun
 * @Date: 2017-11-27
 * @Description: 个股页面-公告栏
*/

<template>
  <ul class="info">
    <li class="info-item" v-for="info in infoList" :key="info.id">
      <p class="info-title info-img" :class="info.titleClass" @click="linkToStock(info.newestInfoId)"><img :src="info.picPath">{{info.themeName}}</p>
      <p class="info-title" :class="info.titleClass" @click="linkToStock(info.newestInfoId)">{{info.newestInfoTitle}}</p>
      <p class="info-text" @click="linkToStock(info.newestInfoId)">{{info.newestInfoAbstract}}<a class="color-default" :href="info.newestInfoInfoContUrl"><i class="iconfont icon-link"></i>网页链接...</a></p>
      <div class="info-oparation clearfix">
        <div class="left">
          <i class="date">{{info.updateTime}}</i>
          <a class="info-stock" :href="info.stkUrl">{{info.themeStocks}} {{info.zf}}</a>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['infoList'],
  data () {
    return {
    }
  },
  methods: {
    linkToStock: function (infoId) {
      window.location.href = `./zxARFDetail.html?infoId=${infoId}`
    }
  }
}
</script>

<style lang="less">
@import '../../assets/less/commen/info.less';
</style>


