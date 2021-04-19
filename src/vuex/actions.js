import { reqAddress, reqCategorys, reqShops, reqShopInfo, reqShopRatings, reqShopGoods } from '../api'

export default {
  // 获取当前位置信息
  async getAddress ({ commit, state }) {
    let result = await reqAddress(state.latitude, state.longitude)
    if (result.code === 0) {
      commit('getAddress', result.data)
    }
  },

  // 获取食品分类列表
  async getCategorys ({ commit, state }) {
    let result = await reqCategorys()
    if (result.code === 0) {
      commit('getCategorys', result.data)
    }
  },

  // 获取商铺分类列表
  async getShops ({ commit, state }) {
    let result = await reqShops(state.longitude, state.latitude)
    if (result.code === 0) {
      commit('getShops', result.data)
    }
  },

  // 保存用户的同步action
  saveUser ({ commit }, user) {
    // 将token保存local中
    const token = user.token
    localStorage.setItem('token_key', token)
    delete user.token
    commit('receiveUser', { user })
    commit('receiveToken', { token })
  },

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
  }
}
