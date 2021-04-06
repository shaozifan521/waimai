<template>
  <div class="footer-guider">
    <span class="guider-item" :class="{on: $route.path === '/msite'}" @click="goto('/msite')">
      <span>
        <i class="iconfont iconmsite"></i>
      </span>
      <span>首页</span>
    </span>
    <span class="guider-item" :class="{on: $route.path === '/search'}" @click="goto('/search')">
      <span>
        <i class="iconfont iconsearch"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guider-item" :class="{on: $route.path === '/order'}" @click="goto('/order')">
      <span>
        <i class="iconfont iconorder"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guider-item" :class="{on: $route.path === '/profile'}" @click="goto('/profile')">
      <span>
        <i class="iconfont iconprofile"></i>
      </span>
      <span>个人</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'FooterGuider',
  data () {
    return {

    }
  },
  methods: {
    // 路由跳转
    goto (path) {
      this.$router.replace(path)
    }
  }
}
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixins.styl'
  .footer-guider
    top-border-1px(#ccc)
    position fixed
    bottom 0
    left 0
    height 50px
    width 100%
    display flex
    background-color #fff
    .guider-item
      width 25%
      display: flex
      flex-direction: column
      align-items: center
      margin-top 4px
      &.on
        color $green
      .iconfont
        font-size 22px
        span
          font-size 12px
</style>
