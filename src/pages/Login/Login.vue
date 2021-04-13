<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">X</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: isShowMsg}" @click="isShowMsg = true">短信登录</a>
          <a href="javascript:;" :class="{on: !isShowMsg}" @click="isShowMsg = false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: isShowMsg}">
            <section class="login_message">
              <input type="tel" name="phone" v-validate="'required|mobile'" maxlength="11" placeholder="手机号" v-model="iphone">
              <button :disabled="!isRightIphone || computedTime > 0" class="get_verification" :class="{is_right_phone: isRightIphone}" @click.prevent="sendCode">
                {{ computedTime > 0 ? `短信已发送${computedTime}` : '获取验证码'}}
              </button>
              <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
            </section>
            <section class="login_verification">
              <input v-model="code" name="code" v-validate="{required: true, regex: /^\d{6}$/}" type="tel" maxlength="8" placeholder="验证码">
              <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !isShowMsg}">
            <section>
              <section class="login_message">
                <input v-model="name" name="name" v-validate="'required'" type="tel" maxlength="11" placeholder="手机/邮箱/用户名">
                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </section>
              <section class="login_verification">
                <input v-model="pwd" name="pwd" v-validate="'required'" :type="isShowPwd ? 'text' : 'password'" maxlength="8" placeholder="密码">
                <div class="switch_button" :class="isShowPwd ? 'on' : 'off'" @click="isShowPwd = !isShowPwd">
                  <div class="switch_circle" :class="{right: isShowPwd}"></div>
                  <span class="switch_text">{{isShowPwd ? 'abc' : ''}}</span>
                </div>
                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
              </section>
              <section class="login_message">
                <input v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}" type="text" maxlength="11" placeholder="验证码">
                <!-- 这种是普通的http请求，不存在跨域的问题 -->
                <img ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="updataCaptcha">
                <!-- 这种是跨域请求图形验证码 -->
                <!-- <img class="get_verification" src="api/captcha" alt="captcha"> -->
                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
              </section>
            </section>
          </div>
          <button class="login_submit" @click="login">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back">
        <i class="iconfont iconzuojiantou" @click="$router.back()"></i>
      </a>
    </div>
  </section>
</template>

<script>
import { Toast, MessageBox } from 'mint-ui'
import { reqSendCode, reqPwdLogin, reqSmsLogin } from '@/api'

export default {
  data () {
    return {
      isShowMsg: true,
      iphone: '',
      isShowPwd: false,
      computedTime: 0,
      code: '', // 短信验证码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '' // 图形验证码
    }
  },
  mounted () {
    console.log(this.isRightIphone)
  },
  methods: {
    async sendCode () {
      this.computedTime = 10
      let intervalId = setInterval(() => {
        this.computedTime--
        if (this.computedTime === 0) {
          clearInterval(intervalId)
        }
      }, 1000)
      // 发送短信验证码
      let result = await reqSendCode(this.iphone)
      if (result.code === 0) {
        Toast('短信发送成功!')
      } else {
        // 停止计时
        this.computedTime = 0
        MessageBox('提示', result.msg)
      }
    },
    // 刷新图形验证码
    updataCaptcha () {
      // 动态获取图形验证码
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    },
    // 登陆
    async login () {
      // 进行前台表单验证
      let names
      if (this.isShowMsg) {
        names = ['phone', 'code']
      } else {
        names = ['name', 'pwd', 'captcha']
      }

      const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
      if (success) {
        const { phone, code, name, pwd, captcha } = this
        // 验证通过后发登陆的请求
        let result
        if (this.isShowMsg) {
          result = await reqSmsLogin({ phone, code })
          // 请求结束后, 停止计时
          this.computedTime = 0
        } else {
          result = await reqPwdLogin({ name, pwd, captcha })
          if (result.code !== 0) { // 登陆失败了
            this.updataCaptcha() // 更新图形验证码
            this.captcha = ''
          }
        }

        // 根据请求的结果进行处理
        if (result.code === 0) { // 登陆请求成功
          const user = result.data
          // 保存user到state
          this.$store.dispatch('saveUser', user)
          // 跳转到个人中心
          this.$router.replace('/profile')
        } else { // 登陆请求失败
          MessageBox.alert(result.msg)
        }
      }
    }
  },
  computed: {
    isRightIphone () {
      return /^1\d{10}$/.test(this.iphone)
    }
  }
}
</script>

<style scoped lang="stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.is_right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
