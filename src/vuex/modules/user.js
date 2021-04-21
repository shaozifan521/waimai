const state = {
  user: {},
  token: ''
}

const mutations = {
  receiveUser (state, { user }) {
    state.user = user
  },
  receiveToken (state, { token }) {
    state.token = token
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
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
