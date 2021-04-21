import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import VueI18n from 'vue-i18n'
import { Button } from 'mint-ui'

import 'lib-flexible'
import './validate'
import '@/mock/mockServer.js'

import Header from './components/Header/Header'
import Star from './components/Star/Star'
import CartControl from '@/components/CartControl/CartControl'

// 通过插件的形式挂载
Vue.use(VueI18n)

Vue.component(Button.name, Button)
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)

Vue.config.productionTip = false

const i18n = new VueI18n({
  // 语言标识（默认中文，如果localStorage有值，则取localStorage里的默认值）
  locale: localStorage.getItem('locale_key') || 'zh',
  // this.$i18n.locale
  // 通过切换locale的值来实现语言切换
  messages: {
    // 中文语言包
    'zh': require('./common/lang/zh.json'),
    // 英文语言包
    'en': require('./common/lang/en.json')
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
