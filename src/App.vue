<template>
  <div id="app">
    <router-view></router-view>
    <footer-guider v-if="$route.meta.isShowFooter"></footer-guider>
  </div>
</template>

<script>
import FooterGuider from '@/components/FooterGuider/FooterGuider'
export default {
  components: {
    FooterGuider
  }
}
</script>

<style>
</style>
