/*
 * @Author:litt
 * @Date: 2017-10-20
 * @Description: 我的自选股
*/

<template>
  <li class="clearfix" :class="{upFlag: templateData.numChange >= 0, downFlag: templateData.numChange < 0}">
    <a class="stock_item" @click="lintToStock(templateData.market, templateData.code)" target="_blank">{{templateData.name}}<span>{{templateData.code}}</span></a>
    <div class="stock_item">{{templateData.nowPrice | numFix2}}</div>
    <div class="stock_item">{{templateData.numChange | numFix2}}%({{templateData.percent | numFix2}}%)</div>
    <div class="stock_item">{{templateData.volume | numFix2}}万</div>
    <div class="stock_item">{{templateData.value | numFix2}}亿</div>
    <div class="stock_item">{{templateData.mark}}</div>
    <div class="stock_item more_handle">
      <i class="iconfont icon-gengduo hand" @click="showChange()" title="操作"></i>
      <ul class="stock_operate" v-if="showDone">
        <li @click="hideDone"><i class="iconfont icon-liebiao"></i> 分组</li>
        <li @click="deleteList(templateData)"><i class="iconfont icon-shanchu"></i> 移除</li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  props: ['templateData'],
  data () {
    return {
      showDone: false,
      delete: true,
      mobile: 13761902640
    }
  },
  mounted () {
    this.getData('01', 600519, SH, 1)
    this.getData('01', 600036, SH, 2)
    this.getData('01', 600030, SH, 3)
  },
  methods: {
    // 操作显示隐藏
    showChange () {
      this.showDone = !this.showDone
    },
    // 操作隐藏
    hideDone () {
      this.showDone = false
    },
    // 删除自选股
    deleteList (templateData) {
      this.showDone = false
      this.getData('02', templateData.code, templateData.market, 30)
    },
    // 添加、删除、查询接口获取
    getData (batchFlag, stockCode, market, order) {
      this.$http.getUpdateOptionalStock({
        mobile: this.mobile,
        batchFlag: batchFlag,
        stockCode: stockCode,
        market: market,
        order: order
      }).then(result => {
        if (result.data.success === 'true') {
          this.getZXGInfoList(this.mobile, 10)
        } else {
          console.log(result.data.message)
        }
      })
    },
    // 点击跳转
    lintToStock (templateData) {
      window.location.href = '/stock.html#/stock/' + templateData.market + templateData.stkCode
    }
  }
}
</script>

<style lang="less">
  .stock_item{
    display: inline-block;
    width: 16%;
    text-align: right;
    padding: 0 5px 5px;
    font-size: 14px;
    float: left;
  }
  .stock_item:nth-child(1), .stock_item:last-child{
    width: 10%;
  }
  div.stock_item{
    line-height: 30px;
  }
  a.stock_item{
    text-align: left;
    cursor: pointer;
  }
  a.stock_item span{
    display: block;
    color: #888;
    font-size: 12px;
  }
  .stock_operate {
    color: #666;
  }
  .more_handle{
    position: relative;
    ul{
      position: absolute;
      top: 25px;
      right: 0;
      z-index: 1000;
      background: #fff;
      border: 1px solid #ccc;
      li{
        padding: 0 10px 0 8px;
        text-align: right;
        font-size: 14px;
        cursor: pointer;
        .iconfont{
          font-size: 16px;
          vertical-align: middle;
        }
      }
      li:hover{
        background: #eee;
      }
    }
  }
  .stock-list{
    &.less{
      >li:nth-child(1),
      >li:nth-child(2),
      >li:nth-child(3),
      >li:nth-child(4),
      >li:nth-child(5),
      >li:nth-child(6),
      >li:nth-child(7),
      >li:nth-child(8),
      >li:nth-child(9),
      >li:nth-child(10){
        display: block;
      }
      >li{
        display: none;
      }
    }
    .upFlag{
      .stock_item:nth-child(3){
        color: #d53;
      }
    }
    .downFlag{
      .stock_item:nth-child(3){
        color: #390;
      }
    }
  }
</style>

