<template>
  <div id="app">
    <router-view></router-view>
    <footer-guider v-if="$route.meta.isShowFooter"></footer-guider>
  </div>
</template>

<script>
import FooterGuider from '@/components/FooterGuider/FooterGuider'

export default {
  mounted () {
    // 启动时获取地址
    this.$store.dispatch('getAddress')
    // 启动时，自动登录
    this.$store.dispatch('autoLogin')
  },
  components: {
    FooterGuider
  }
}
</script>

<style>
</style>
