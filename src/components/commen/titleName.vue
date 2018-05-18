/*
 * @Author:duyun
 * @Date: 2017-09-27
 * @Description: 模板：标题名字
*/

<template>
  <div class="title-name">
    {{title.titleName}}
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>


<style lang="less" >
.title-name{
  font-size: 1.6rem;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #f4f4f4;
}
</style>

