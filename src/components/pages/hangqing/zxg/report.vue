/*
 * @Author:litt
 * @Date: 2017-10-27
 * @Description: 资讯---热点
*/


<template>
  <li class="infor_item">
      <div class="blue">{{templateData.title}}</div>
      <p class="infor_content">{{templateData.content}}</p>
      <div class=" from_handle clearfix">
        <div class="f_left from">
            <span class="origin">来源：{{templateData.origin}}</span>
            <a class="hand" hrer="javascript:;">{{templateData.time}}</a>
        </div>
        <div class="f_right handle">
            <span @click="addAgree">{{agreeText}}({{agree}})</span>
            <span class="send" @click="addShare">{{shareText}}({{share}})</span>
            <span @click="addReceive">{{receive}}</span>
        </div>
      </div>
  </li>
</template>

<script>
export default {
  props: ['templateData'],
  data () {
    return {
      // 点赞数据
      agree: 0,
      agreeText: '赞',
      // 转发数据
      share: 0,
      shareText: '转发',
      // 收藏数据
      receive: '收藏'
    }
  },
  methods: {
    // 点赞
    addAgree: function () {
      if (this.agreeText === '赞') {
        this.agreeText = '已赞'
        this.agree++
      } else {
        alert('确定要取消赞吗？')
        this.agreeText = '赞'
        this.agree--
      }
    },
    // 转发
    addShare: function () {
      if (this.shareText === '转发') {
        alert('转发前要说两句吗？')
        this.share++
        this.shareText = '已转发'
      } else {
        alert('确定要取消转发吗？')
        this.share--
        this.shareText = '转发'
      }
    },
    // 收藏
    addReceive: function () {
      if (this.receive === '收藏') {
        alert('收藏成功')
        this.receive = '取消收藏'
      } else {
        alert('确定要取消收藏吗？')
        this.receive = '收藏'
      }
    }
  }
}
</script>

<style lang="less">
    
   
</style>





