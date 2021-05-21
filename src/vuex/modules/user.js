import {
  reqAutoLogin
} from '../../api'

const state = {
  user: {},
  token: localStorage.getItem('token_key') || '' // 登陆token标识''
}

const mutations = {
  receiveUser (state, { user }) {
    state.user = user
  },
  receiveToken (state, { token }) {
    state.token = token
  },
  logout (state) {
    state.token = ''
    state.user = {}
  }
}

const actions = {
  // 保存用户的同步action
  saveUser ({ commit }, user) {
    // 将token保存local中
    const token = user.token
    localStorage.setItem('token_key', token)
    delete user.token
    commit('receiveUser', { user })
    commit('receiveToken', { token })
  },
  // 自动登陆的异步action
  async autoLogin ({ commit, state }) {
    if (!state.token || state.user._id) return
    const result = await reqAutoLogin()
    if (result.code === 0) {
      const user = result.data
      commit('receiveUser', { user })
    }
  },
  // 退出登陆
  logout ({ commit }) {
    // 清除local中的token
    localStorage.removeItem('token_key')
    // 清除state中user/token
    commit('logout')
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
