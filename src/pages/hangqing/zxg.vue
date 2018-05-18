
<template>
  <div id="zxg" class="page">
    <!--顶部菜单-->
    <theader :popZxg="popZxg" @jsBtnClose="jsBtnClose"></theader>
    <!--顶部菜单导航-->
    <topMenu @istoLogin="toLogin" :tipsShow="tipsShow"></topMenu>
    <div class="gtja-main">
      <!--标题-->
      <contTitle :contTitle="zxgContTitle"></contTitle>
      <!-- 自选股 -->
      <div class="main-part clearfix">
        <!-- 左侧布局 -->
        <div class="left-part">
          <!-- 同步我的自选股/添加自选股 -->
          <div class="get-share clearfix">
            <div class="sync-share">
              <i class=" iconfont icon-tongbu"></i>
              <span>我的自选股</span>
            </div>
            <!-- <div class="add-share">
              <input type="text" placeholder="添加自选股" v-model="searchInput"  @keyup="promptShow">
              <i class="iconfont icon-search"></i>
              <ul class="prompt" :class="{'none' : isShow === false }">
                <li class="prompt-item" v-for="dataMedium in promptData" :key="dataMedium.id" @click="tipClick">{{dataMedium}}</li>
              </ul>
            </div> -->
          </div>
          <!-- 四大指数 -->
          <current-index></current-index>
          <!-- 自选股列表 -->
          <zxg-list></zxg-list>
          <!-- 相关资讯板块 -->
          <div class="infomation">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="实时" name="real" >
                <info :infoList="realList"></info>
              </el-tab-pane>
              <el-tab-pane label="研报" name="research" >
                <info :infoList="researchList"></info>
              </el-tab-pane>
              <el-tab-pane label="宏观" name="announce" >
                <info :infoList="announceList"></info>
              </el-tab-pane>
              <el-tab-pane label="小君茶馆" name="xjTea" >
                <info :infoList="xjTeaList"></info>
              </el-tab-pane>
              <el-tab-pane name="live">
                <span slot="label"><i class="iconfont icon-live"></i> 股市直播</span>
                <live v-for="dataMedium in liveList" :key="dataMedium.id" :live="dataMedium"></live>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 右侧布局 -->
        <zxgRight></zxgRight>
      </div>
    </div>
    <!-- 页脚 -->
    <gtja-footer></gtja-footer>
  </div>
</template>

<script>
  import theader from '@/components/commen/theader'
  import topMenu from '@/components/commen/topMenu'
  import contTitle from '@/components/commen/contTitle'
  import gtjaFooter from '@/components/commen/footer'
  import currentIndex from '@/components/pages/hangqing/zxg/currentIndex'
  import zxgList from '@/components/pages/hangqing/zxg/zxgList'
  import info from '@/components/commen/info'
  import live from '@/components/pages/hangqing/zxg/live'
  import zxgRight from '@/components/pages/hangqing/zxg/zxgRight'
  export default {
    name: 'zxg',
    components: {
      theader,
      topMenu,
      contTitle,
      gtjaFooter,
      currentIndex,
      zxgList,
      info,
      live,
      zxgRight
    },
    data () {
      return {
        // 标题初始化
        zxgContTitle: [],
        isActive: 0,
        isTrue: false,
        isShow: true,
        isHide: false,
        // 公告栏初始显示为热点板块
        activeName: 'real',
        // 热点数据初始化
        // hotList: [],
        // 实时数据初始化
        realList: [],
        // 研报数据初始化
        researchList: [],
        // 公告数据初始化
        announceList: [],
        // 小君茶馆数据初始化
        xjTeaList: [],
        // 股票直播数据初始化
        liveList: [],
        // 搜索v-module初始化
        searchInput: '',
        // 搜索智能提示数据初始化
        // promptDatapromptData: [],
        result: [],
        popZxg: false,
        mobile: ''
      }
    },
    created () {
      this.mobile = localStorage.getItem('mobile')
    },
    mounted () {
      this.initial()
      // 获取标题数据
      this.$http.getContTitle().then(result => {
        this.zxgContTitle = result.data.zxgContTitle
      })
      // 获取公告栏热点数据
      this.$http.getZXGInfoValue().then(result => {
        this.xjTeaList = result.data.xjTeaList
        this.liveList = result.data.liveList
      })
      // 自选股公告栏 实时数据
      this.$http.getZXGInfoData({
        themeCode: '',
        typeCode: '9001|9007',
        startIndex: 0,
        endIndex: 10,
        desiredInfoContLen: -1
      }).then(result => {
        this.realList = result.data.itemList
      })
      // 自选股公告栏 研报
      this.$http.getZXGInfoData({
        themeCode: '',
        typeCode: '9213|9214',
        startIndex: 0,
        endIndex: 10,
        desiredInfoContLen: -1
      }).then(result => {
        this.researchList = result.data.itemList
      })
      // 自选股公告栏 宏观
      this.$http.getZXGInfoData({
        themeCode: '',
        typeCode: '9003|9004',
        startIndex: 0,
        endIndex: 10,
        desiredInfoContLen: -1
      }).then(result => {
        this.announceList = result.data.itemList
      })
    },
    methods: {
      // 判断是否登录，没登陆直接出登录弹框
      initial () {
        if (this.mobile === null) {
          this.popZxg = true
        }
      },
      toggle: function () {
        this.isActive = 5
        this.isTrue = true
      },
      addClass: function (index) {
        this.isActive = index
        this.isTrue = false
      },
      toLogin () {
        this.popZxg = true
      },
      jsBtnClose () {
        this.popZxg = false
      }
    }
  }
</script>
<style lang="less">
  @import "../../assets/less/base.less";
  @import "../../assets/less/pages/page.zxg.less";
  @import "../../assets/fonts/iconfont/iconfont.css";
</style>

