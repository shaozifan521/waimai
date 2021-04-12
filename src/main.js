import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import 'lib-flexible'
import './validate'

import Header from './components/Header/Header'
import Star from './components/Star/Star'

Vue.component('Header', Header)
Vue.component('Star', Star)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
