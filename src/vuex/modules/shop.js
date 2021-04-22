import Vue from 'vue'
import {
  reqShopInfo,
  reqShopRatings,
  reqShopGoods
} from '../../api'

const state = {
  goods: [], // 商品列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
  cartFoods: [] // 购物车所有food的数组
}

const mutations = {
  receiveInfo (state, info) {
    state.info = info
  },
  receiveRatings (state, ratings) {
    state.ratings = ratings
  },
  receiveGoods (state, goods) {
    state.goods = goods
  },
  addFoodCount (state, { food }) {
    if (!food.count) { // 第一次
      // 给food添加一个新的属性: 属性名为count, 值为1
      // food.count = 1 // 不会自动更新界面: 新增加的属性没有数据绑定
      // 为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
      // Vue.set( target, key, value )
      Vue.set(food, 'count', 1)
      // 将food添加的cartFoods
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },
  reduceFoodCount (state, { food }) {
    if (food.count > 0) {
      food.count--
      if (food.count === 0) {
        // 将food从cartFoods移除
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  clearCart (state) {
    // 删除购物车中所有food的count属性
    state.cartFoods.forEach(food => {
      food.count = 0
      // delete food.count
    })
    // 清除购物车数组中的foods
    state.cartFoods = []
  }
}

const actions = {
  // 异步获取商家信息
  async getShopInfo ({ commit }, cb) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit('receiveInfo', info)
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings ({ commit }, cb) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit('receiveRatings', ratings)
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },

  // 异步获取商家商品列表
  async getShopGoods ({ commit }, cb) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit('receiveGoods', goods)
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
      cb && cb()
    }
  },

  // 更新food数量的同步action
  updateFoodCount ({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit('addFoodCount', { food })
    } else {
      commit('reduceFoodCount', { food })
    }
  }
}
const getters = {
  // 计算购物车食品数量
  totalCount (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
  },
  // 计算购物车食品金额
  totalPrice (state) {
    return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
