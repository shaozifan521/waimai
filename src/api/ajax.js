// 封装axios的模块
import axios from 'axios'
import qs from 'qs'
import { Indicator, MessageBox, Toast } from 'mint-ui'
import store from '../vuex/store'
import router from '../router'

// 创建一个新的Axios的实例(功能上)
const instance = axios.create({
  baseURL: '/api', // 所有请求都有一个基础路径
  timeout: 20000 // 设置请求超时时间为10s
})

// 添加请求拦截器, 处理Post请求参数(从对象转换为urlencoding)(后台不支持post请求参数为json格式，一般公司支持)
instance.interceptors.request.use(config => {
  let data = config.data
  // 统一处理请求加载loading
  Indicator.open()
  // 处理Post请求参数(从对象转换为urlencoding)
  if (data instanceof Object) {
    config.data = qs.stringify(data) // 把对象参数转换成 username=tom&pwd=123
  }
  // 获取token
  const token = store.state.user.token
  // 如果浏览器端保存的有token则发送请求的时候，自动在请求头携带token
  if (token) {
    config.headers['Authorization'] = token
  } else {
    // 如果没有token但请求必须要token
    if (config.headers.checkToken) {
      // throw 一个错误的主要目的是，错误会进入失败流程，这样需要携带token的请求在没有token的情况下就不会发送了
      throw new Error('没有token， 不发请求，请您登陆！')
    }
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
//     成功回调: 成功的结果不再是response, 而是response.data
//     失败回调: 统一处理请求异常
instance.interceptors.response.use(response => {
  // 统一处理请求加载loading
  Indicator.close()
  return response.data
}, error => {
  // 统一处理请求加载loading
  Indicator.close()
  // 1. 没有token直接发请求的错误
  if (!error.response) {
    if (router.currentRoute.path !== '/login') {
      Toast(error.message)
      // 跳转到登陆页面
      router.replace('/login')
    }
  } else {
    // 2. 发了请求, 但token失效了
    if (error.response.status === 401) {
      // 退出登陆
      store.dispatch('logout')
      // 如果当前没有在登陆界面, 自动跳转到登陆页面
      if (router.currentRoute.path !== '/login') {
        Toast(error.message)
        // 跳转到登陆页面
        router.replace('/login')
      }
    } else if (error.response.status === 404) { // 3. 404错误
      Toast('此资源不存在')
    }
    // 4. 其它
    MessageBox('提示', error.message)
  }
  return new Promise(() => {}) // 返回一个pending状态的promise
})

export default instance
