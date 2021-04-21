import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../../api'

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [] // 商家数组
}

const mutations = {
  getAddress (state, address) {
    state.address = address
  },
  getCategorys (state, categorys) {
    state.categorys = categorys
  },
  getShops (state, shops) {
    state.shops = shops
  }
}

const actions = {
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
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
