import { reqAddress, reqCategorys, reqShops } from '../api'

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
  }
}
