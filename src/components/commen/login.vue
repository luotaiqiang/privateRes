/*
 * @Author: duyun 
 * @Date: 2018-03-22 16:49:44 
 * @Description:   模板：登录框 
*/

<template>
  <div class="pop-bg">
    <el-form class="gtja-login pop-content">
      <div class="pop-close" @click="closePop"></div>
      <el-form-item>
        <el-input v-model="userMobile" class="form-mobile" type="text" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item class="clearfix">
        <el-input v-model="picCode" class="form-code" type="text" placeholder="请输入图形验证码"></el-input>
        <img class="form-right" :src="picSrc" @click="getSRC()"></img>
      </el-form-item>
      <el-form-item class="clearfix">
        <el-input v-model="code" class="form-code" type="text" placeholder="请输入手机验证码"></el-input>
        <el-button v-if="codeJudge" type="primary"  class="form-right" @click="sendSms()">获取验证码</el-button>
        <el-button v-if="!codeJudge" type="info" disabled class="form-right">倒计时（{{count}}）s</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-button" @click="submit()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 手机号初始化
      userMobile: '',
      // 验证码初始化
      picCode: '',
      code: '',
      // 验证码图片初始化
      picSrc: 'https://i.gtja.com/evercos/CheckCode.svl?v=' + Math.random(),
      // 获取验证码初始化
      codeJudge: true,
      // 倒计时初始化
      count: '',
      timer: null
    }
  },
  mounted () {
  },
  methods: {
    closePop () {
      this.$emit('jsBtnClose')
    },
    getSRC () {
      this.picSrc = 'https://i.gtja.com/evercos/CheckCode.svl?v=' + Math.random()
    },
    // 获取验证码
    sendSms () {
      if (this.userMobile.length === 0 || this.userMobile.length < 11 || this.userMobile.length > 11 || !/^0?[1][0-9]{10}$/.test(this.userMobile)) {
        this.$alert('请输入正确的手机号码', {
          confirmButtonText: '确定'
        })
      } else if (this.picCode.length === 0 || this.picCode.length < 4 || this.picCode.length > 4) {
        this.$alert('请输入正确的验证码', {
          confirmButtonText: '确定'
        })
      } else {
        this.$http.getSendSms({
          mobile: this.userMobile,
          captchaName: this.picCode
        }).then(result => {
          if (result.data.success === false) {
            this.$alert(result.data.message, '错误消息', {
              confirmButtonText: '确定',
              callback: action => {
                this.getSRC()
              }
            })
          } else {
            const TIME_COUNT = 60
            if (!this.timer) {
              this.count = TIME_COUNT
              this.codeJudge = false
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--
                } else {
                  this.codeJudge = true
                  clearInterval(this.timer)
                  this.timer = null
                }
              }, 1000)
            }
          }
        })
      }
    },
    // 提交
    submit (sms) {
      if (this.userMobile.length === 0 || this.userMobile.length < 11 || this.userMobile.length > 11 || !/^0?[1][0-9]{10}$/.test(this.userMobile)) {
        this.$alert('请输入正确的手机号码', {
          confirmButtonText: '确定'
        })
      } else if (this.code.length === 0 || this.code.length < 4 || this.code.length > 4) {
        this.$alert('请输入正确的验证码', {
          confirmButtonText: '确定'
        })
      } else {
        this.$http.getGencode({
          mobile: this.userMobile,
          sms: this.code
        }).then(result => {
          if (result.data.success === true) {
            const mobile = String(result.data.mobile)
            // const mobile = '17621485825'
            localStorage.setItem('_tcs', result.data._tcs)
            localStorage.setItem('_tcs-tm', result.data['_tcs-tm'])
            localStorage.setItem('mobile', mobile)
            this.$emit('toClosePop', mobile)
            console.log('登录中')
          } else if (result.data.success === false) {
            this.$alert(result.data.message, '错误消息', {
              confirmButtonText: '确定',
              callback: action => {
                this.getSRC()
              }
            })
          }
        })
      }
    }
  }
}
</script>


 <style lang="less">
@import "../../assets/less/commen/popStyle.less";
.gtja-login{
  width: 400px;
  margin: 0 auto;
  color: #333;
  font-size: 16px;
  padding-top: 50px !important;
  label{
    margin-bottom: 7px;
    display: block;
  }
  input{
    height: 45px;
    line-height: 45px;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding-left: 10px;
  }
  .form-mobile{
    width: 100%;
  }
  .form-code{
    width: 65%;
    float: left;
  }
}
.form-right{
  width: 33%;
  height: 45px;
  float: right;
}
.login-button{
  display: block;
  width: 100%;
  height: 45px;
  margin-top: 35px;
}
.fall-tips{
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 378px;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  p{
    position: relative;
    top: 30%;
    background: aliceblue;
    text-align: center;
    color: red;
    width: 80%;
    margin: 0 auto;
    border-radius: 3px;
  }
  .pop-close{
    top: 12px;
    right: 12px;
  }
}
 </style>
 
