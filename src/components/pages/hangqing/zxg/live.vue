/*
 * @Author:litt
 * @Date: 2017-10-27
 * @Description: 资讯---热点
*/


<template>
  <li class="infor-item clearfix live">
    <div class="a-live-date"><span>{{live.day}}</span>{{live.month}}月</div>
    <div v-for="item in live.eventList" :key="item.id">
      <div class="time">{{item.time}}</div>
      <div class="break-dot"><span></span></div>
      <div class="infor-content">{{item.content}}</div>  
    </div>
  </li>
</template>

<script>
export default {
  props: ['live']
}
</script>

<style lang="less">
  
</style>





