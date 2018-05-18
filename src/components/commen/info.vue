/*
 * @Author:duyun
 * @Date: 2017-11-27
 * @Description: 个股页面-公告栏
*/

<template>
  <ul class="info">
    <li class="info-item" v-for="info in infoList" :key="info.id">
      <div @click="linkTo(info.infoId)">
        <p class="info-title" :class="info.titleClass">{{info.secuSht}}</p>
        <p class="info-title" :class="info.titleClass">{{info.title}}</p>
        <p class="info-text">{{info.abstract}}<a class="color-default" :href="info.contentUrl"><i class="iconfont icon-link"></i>网页链接...</a></p>
      </div>
      <div class="info-oparation clearfix">
        <div class="right">
          <i class="date">{{info.pubTime}}</i>
          <span>来自{{info.typeName}}</span>
        </div>
        <!-- <div class="right">
          <span>赞<i>{{info.doneRaise}}</i><i class="section-line">|</i></span>
          <span>转发<i class="section-line">|</i></span>
          <span>收藏</span>
        </div> -->
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['infoList', 'infoTo'],
  data () {
    return {
    }
  },
  methods: {
    // 公告栏点击跳转
    linkTo: function (infoId) {
      window.location.href = `zxDetail.html?infoId=` + infoId
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/less/commen/info.less';
</style>


