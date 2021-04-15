<template>
  <div>
    <ShopHeader></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/shop/goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/ratings" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/info" replace>商家</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from '../../components/ShopHeader/ShopHeader'
export default {
  data () {
    return {

    }
  },
  components: {
    ShopHeader
  }
}
</script>

<style scoped lang="stylus">

</style>
