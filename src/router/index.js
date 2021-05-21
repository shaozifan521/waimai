import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 功能: 进入a/b必须登陆, 如果没有登陆自动跳转到登陆
const paths = ['/a', '/b'] // 需要进行登陆检查的path的数组

// 定义全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log('全局前置', to, from)
  // 如果目标path在paths中, 但用户没有登陆, 自动跳转到login
  const path = to.path
  if (paths.indexOf(path) !== -1 && !store.state.user.token) {
    next('/login')
  } else {
    // 其它情况, 放行
    next()
  }
})

export default router
