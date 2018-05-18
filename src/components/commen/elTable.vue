/*
 * @Author:duyun
 * @Date:2017-11-23
 * @Description: 公共模板-el-table
*/

<template>
  <div>
    <div v-for="item in elTableList" :key="item.id">
      <el-table      
        :data="item.elTableData"
        stripe
        :show-header="item.showHeader"
        :border="item.border"
        @row-click="lintToStock">
        <el-table-column  v-for="pro in item.stockList" :key="pro.id"  :prop="pro.prop" :label="pro.label" :width="pro.width"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['elTableList', 'lintToStock'],
  data () {
    return {
    }
  }
}
</script>

