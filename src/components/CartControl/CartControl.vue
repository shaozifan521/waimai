<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont iconjianhao" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont iconjiahao" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: Object
  },
  data () {
    return {

    }
  },
  methods: {
    updateFoodCount (isAdd) {
      this.$store.dispatch('updateFoodCount', { isAdd, food: this.food })
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 14px
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .iconjianhao
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .5s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .iconjiahao
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>
