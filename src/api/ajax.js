/* 
封装axios的模块
*/
import axios from 'axios'
import qs from 'qs'

// 创建一个新的Axios的实例(功能上)
const instance = axios.create({
  baseURL: '/api', // 所有请求都有一个基础路径
  timeout: 20000 // 设置请求超时时间为10s
})

/* 
添加请求拦截器, 处理Post请求参数(从对象转换为urlencoding)(后台不支持post请求参数为json格式，一般公司支持)
*/
instance.interceptors.request.use(config => {
  let data = config.data
  // 处理Post请求参数(从对象转换为urlencoding)
  if (data instanceof Object) {
    data = qs.stringify(data) // 把对象参数转换成 username=tom&pwd=123
  }
  
  return config
  }, error => {
  
  return Promise.reject(error)
})

/* 
添加响应拦截器
    成功回调: 成功的结果不再是response, 而是response.data
    失败回调: 统一处理请求异常
*/
instance.interceptors.response.use(response => {
  
  return response.data
  },error => {

  alert('请求报错' + error.message)
  return new Promise(() => {}) // 返回一个pending状态的promise
})

export default instance