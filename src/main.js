import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import 'lib-flexible'

import Header from './components/Header/Header'

Vue.component('Header', Header)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
