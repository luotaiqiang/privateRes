/*
 * @Author:duyun
 * @Date: 2017-09-21
 * @Description: 模板：公共页脚
*/

<template>
  <div class="gtja-footer">
    <div class="clearfix gtja-layout">
      <div class="footer-l">
        <div class="footer-select">
          <p>友情链接</p>
          <span class="iconfont icon-jiantou-copy-copy"></span>
          <div class="select-option">
            <div class="option-link">
              <a v-for="option in optionList" :href="option.src" :key="option.id" tag="li" target="_blank">{{option.msg}}</a>
              <i class="tips-arrow"></i>
            </div>
          </div>
        </div>
        <div class="footer-link">
          <a v-for="(link, index) in linkList" :href="link.src" :key="link.id"><img v-if="index === 3" src="../../assets/images/icons/shs.jpg">{{link.name}}</a>
          <br>
          <a v-for="link in linkList2" :href="link.src" :key="link.id">{{link.name}}</a>
        </div>
      </div>
      <div class="footer-r">
        <div class="gtja-contact">
          <h2 class="h-title">联系我们</h2>
          <i class="line-b"></i>
          <p v-for="icon in iconList" :key="icon.id"><span :class="icon.class"></span>{{icon.msg}}</p>
        </div>
        <div class="gtja-attention">
          <h2 class="h-title">关于我们</h2>
          <i class="line-b"></i>
          <div class="attention-icon">
            <ul>
              <li v-for="(share, index) in shareList" :key="share.id">
                <a :href="share.src" target="_blank" :class="share.linkclass">
                  <span :class="share.class"></span>
                  <div class="share-tip" :class="share.shareclass">
                    <img v-if="index === 1" src="../../assets/images/share-qr.jpg">
                    <p>{{share.msg}}</p>
                    <a v-if="index === 0" href="https://weibo.com/gtjazq" target="_blank">@GTJA</a>
                    <i class="tips-arrow"></i>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="gtja-copy-right gtja-layout">
      <span>Copyright © 1999-2018 国泰君安证券股份有限公司. </span>
      <span class="f-r">沪公网安备 31011502000377   沪ICP证B2-20040408-5 </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gtjaFooter',
  data () {
    return {
      linkList: [
        {name: '加入我们', src: 'https://hr.gtja.com'},
        {name: '软件下载', src: 'javascript:void(0)'},
        {name: '金融商城', src: 'https://mall.gtja.com/index.html?cid=www'},
        {name: '上海市互联网违法和不良信息举报中心', src: 'javascript:void(0)'}
      ],
      linkList2: [
        {name: '合法网站声明', src: '/content/default/notice/foot-hfwzsm.html'},
        {name: '营销及见证服务人员公示', src: 'javascript:;'},
        {name: '投诉与建议', src: 'javascript:;'},
        {name: '版权声明', src: 'javascript:;'},
        {name: '使用条款', src: 'javascript:;'},
        {name: '基金销售和基金从业信息', src: 'javascript:;'},
        {name: '分支机构', src: 'javascript:;'}
      ],
      iconList: [
        {class: 'iconfont icon-24xiaoshilvxingzixun', msg: '服务热线 : 95521'},
        {class: 'iconfont icon-wentidewen', msg: '在线咨询 ( 9:00 - 18:00 )'},
        {class: 'iconfont icon-dianhua', msg: '举报电话：400-8888-666'}
      ],
      shareList: [
        {src: 'javascript:void(0)', linkclass: 'share1', class: 'iconfont icon-weibo', msg: '点击关注国泰君安', shareclass: 'share-tip1'},
        {src: 'javascript:void(0)', linkclass: 'share2', class: 'iconfont icon-weixin2', msg: '扫描关注国泰君安', shareclass: 'share-tip2'}
      ],
      optionList: [
        {msg: '中国证监会', src: 'http://www.csrc.gov.cn/pub/newsite/'},
        {msg: '中国证券业协会', src: 'http://www.sac.net.cn/'},
        {msg: '上海证券交易所', src: 'http://www.sse.com.cn/'},
        {msg: '深圳证券交易所', src: 'https://www.szse.cn/'},
        {msg: '全国中小企业股份转让系统', src: 'http://www.neeq.com.cn/'},
        {msg: '上海证券交易所投资者教育', src: 'http://edu.sse.com.cn/'},
        {msg: '深圳证券交易所投资者教育', src: 'https://www.szse.cn/main/investor/'}
      ]
    }
  }
}
</script>

<style lang="less">
@import "../../assets/less/commen/footer.less";
@import "../../assets/fonts/iconfont/iconfont.css";
</style>



