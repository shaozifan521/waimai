<template>
  <div id="app">
    <router-view></router-view>
    <footer-guider v-if="$route.meta.isShowFooter"></footer-guider>
  </div>
</template>

<script>
import FooterGuider from '@/components/FooterGuider/FooterGuider'
import { reqAddress } from '@/api'
export default {
  async mounted () {
    const result = await reqAddress(40.10038, 116.36867)
    console.log(result)
  },
  components: {
    FooterGuider
  }
}
</script>

<style>
</style>
