export default {
  getAddress (state, address) {
    state.address = address
  },
  getCategorys (state, categorys) {
    state.categorys = categorys
  },
  getShops (state, shops) {
    state.shops = shops
  },
  receiveUser (state, { user }) {
    state.user = user
  },
  receiveToken (state, { token }) {
    state.token = token
  },
  receiveInfo (state, info) {
    state.info = info
  },
  receiveRatings (state, ratings) {
    state.ratings = ratings
  },
  receiveGoods (state, goods) {
    state.goods = goods
  }
}
