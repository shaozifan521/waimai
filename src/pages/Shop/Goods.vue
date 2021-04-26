<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <li class="menu-item" :class="{current: currentIndex === index}" v-for="(good, index) in goods" :key="good.name" @click="selectItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="good in goods" :key="good.name">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="food in good.foods" :key="food.name" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart></ShopCart>
    </div>
    <Food :food="food" ref="food"></Food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import Food from '@/components/Food/Food'
import ShopCart from '@/components/ShopCart/ShopCart'

export default {
  data () {
    return {
      tops: [], // 右侧所有分类的<li>的top的数组, 在列表显示之后更新一次
      scrollY: 0,
      food: {} // 需要显示的food
    }
  },
  mounted () {
    // 解决切换路由后，scroll滑动失效的bug
    if (this.goods.length > 0) {
      // 初始化 scroll
      this.initScroll()
      // 初始化右侧分类集合 tops
      this.initTops()
    }
  },
  methods: {
    // 点击左侧选择某个分类项
    selectItem (index) {
      // 得到对应的top
      const top = this.tops[index]
      // 立即将scrollY更新为最终的目标值
      this.scrollY = top
      // 让右侧列表滑动到对应的位置
      this.rightScroll.scrollTo(0, -top, 300)
    },
    initScroll () {
      // 当 BScroll 不存在时再创建，解决 BScroll 多次创建产生的bug
      if (!this.leftScroll) {
        this.leftScroll = new BScroll(this.$refs.left, {
          click: true // 分发click事件
        })
        // 右侧scroll对象
        this.rightScroll = new BScroll(this.$refs.right, {
          click: true, // 分发click事件
          probeType: 1 // 非实时 触摸
          // probeType: 2  // 实时 触摸
          // probeType: 3  // 实时 触摸/惯性/编码
        })
        // 绑定scroll监听
        this.rightScroll.on('scroll', ({ x, y }) => {
          this.scrollY = Math.abs(y)
        })

        // 绑定scrollEnd监听
        this.rightScroll.on('scrollEnd', ({ x, y }) => {
          this.scrollY = Math.abs(y)
        })
      }
    },
    initTops () {
      const tops = []
      let top = 0
      tops.push(top)
      // 把伪数组转成真数组
      const lis = Array.from(this.$refs.rightUl.children)
      lis.forEach(li => {
        top += li.clientHeight
        tops.push(top)
      })
      // 更新tops
      this.tops = tops
    },
    /* 显示指定food */
    showFood (food) {
      // 指定要显示的food数据
      this.food = food
      // 显示food组件界面
      this.$refs.food.toggleShow()

      // 子组件更新父组件的状态数据: 父组件向子组件标签传递函数属性
      // 父组件更新子组件的状态数据: 父组件通过ref得到子组件对象, 调用其更新状态数据的方法
    }
  },
  computed: {
    ...mapState({
      goods: state => state.shop.shop.goods || []
    }),
    // 获取当前分类的下标
    currentIndex () {
      const { scrollY, tops } = this
      const index = tops.findIndex((top, index) => scrollY >= top && scrollY < tops[index + 1])
      // 如果新的index与保存的index不一样
      if (this.leftScroll) {
        // 在当前分类变化时, 让左侧列表滑动到当前分类处
        const li = this.$refs.leftUl.children[index]
        this.leftScroll.scrollToElement(li, 300)
      }
      return index
    }
  },
  watch: {
    goods () {
      // 第二种解决异步请求数据，第三方框架不滚动滑不动的bug（第一种解决方式在 Msite 组件中）
      this.$nextTick(() => {
        // 初始化 scroll
        this.initScroll()
        // 初始化右侧分类集合 tops
        this.initTops()
      })
    }
  },
  components: {
    Food,
    ShopCart
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
