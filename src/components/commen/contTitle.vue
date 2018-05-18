/*
 * @Author:duyun
 * @Date: 2017-09-21
 * @Description: 模板：标题
*/

<template>
  <div class="gtja-layout">
    <div class="cont-title" v-for="item in contTitle" :key="item.id">
      <i class="iconfont icon-home"></i>
      {{item.text1}} /
      <a class="color-default" :href="item.src">
        {{item.text2}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['contTitle']
}
</script>

<style lang="less">
 @import '../../assets/less/commen/contTitle.less';
</style>
