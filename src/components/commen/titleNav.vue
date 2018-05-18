/*
 * @Author:duyun
 * @Date: 2017-10-20
 * @Description: 公共模板：标题导航
*/

<template>
  <li :key="nav.id">
    {{nav.name}}
  </li>
</template>

<script>
export default {
  props: ['nav']
}
</script>

<style lang="less">
@import '../../assets/less/commen/titleNav.less';
</style>
