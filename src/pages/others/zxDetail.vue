<!--
@Author:duyun
@Date:2018-01-30
@Description: 页面-资讯详情页
-->

<template>
  <div>
    <!--顶部菜单-->
    <theader :popZxg="popZxg"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="istoLogin"></topMenu>
    <div class="gtja-layout clearfix">
      <!-- 资讯详情页 -->
      <div class="info-detail" v-for="item in infoDetail" :key="item.id">
        <div class="info-title">{{item.title}}</div>
        <p class="title-tips">
          <span>{{item.pubTime}}</span>
          <span>来自{{item.source}}</span>
        </p>
        <p class="info-cont"><i>摘要：</i>{{item.abstract}}</p>
        <img>
        <p class="info-cont"><i>内容：</i>{{item.abstract}}</p>
        <div class="info-done">
          <span>阅读（{{item.clickNum}}）</span>
          <span>转发（{{item.forwardNum}}）</span>
        </div>
      </div>
    </div>
    <!-- 页脚 -->
    <gtjaFooter></gtjaFooter>
  </div>
</template>

<script>
import theader from '@/components/commen/theader.vue'
import topMenu from '@/components/commen/topMenu.vue'
import gtjaFooter from '@/components/commen/footer.vue'
export default {
  name: 'index',
  components: {
    theader,
    topMenu,
    gtjaFooter
  },
  data () {
    return {
      infoDetail: [],
      popZxg: false
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    istoLogin () {
      this.popZxg = true
    },
    getData: function () {
      this.$http.getNewsDetail({
        infoId: this.urlPars().infoId
        // 数据完善后用这个参数
        // infoId: this.urlPars().infoId
      }).then(result => {
        this.infoDetail = result.data.itemList
      })
    },
    // 解析location search
    urlPars () {
      var qs = location.search.length > 0 ? location.search.substr(1) : ''
      var args = {}
      var items = qs.length > 0 ? qs.split('&') : []
      var item = null
      var name = null
      var value = null
      var len = items.length
      for (var i = 0; i < len; i++) {
        item = items[i].split('=')
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])
        if (name.length) {
          args[name] = value
        }
      }
      return args
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/normalize.less";
@import "../../assets/less/base.less";
.info-detail{
  margin: 50px auto;
  width: 60%;
  .info-title{
    text-align: left;
    font-size: 28px;
    line-height: 1.5em;
    font-weight: bold;
  }
  .title-tips{
    padding: 10px 0;
    border-bottom: 1px solid #EDEDED;
    margin-bottom: 25px;
    color: #999;
    font-size: 14px;
    span{
      padding-right: 25px;
    }
  }
  .info-cont{
    font-size: 16px;
    line-height: 1.9em;
    text-align: justify;
    i{
      font-weight: bold;
    }
  }
  .info-done{
    text-align: right;
    margin: 25px 0;
    span{
      margin-left: 25px;
    }
  }
}
</style>
