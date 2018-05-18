/*
 * @Author:duyun
 * @Date: 2017-09-21
 * @Description: 模板：tabs页
*/

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="kline.klineLabel" :name="kline.klineName" v-for="kline in klineList" :key="kline.id">
        {{kline.klineName}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    props: ['klineList', 'activeName'],
    data () {
      return {
        klineListValue: [],
        activeName: 'one'
      }
    },
    methods: {
      handleClick (tab, event) {
        console.log(tab, event)
      }
    }
  }
</script>
