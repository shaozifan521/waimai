import ajax from './ajax'

// 根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(`position/${longitude},${latitude}`)

// 获取食品分类列表
export const reqCategorys = () => ajax('/index_category', {
  // 请求这个接口是否需要携带token的标识
  headers: {
    checkToken: true
  }
})

// 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax('/shops', {
  params: {
    longitude,
    latitude
  },
  // 请求这个接口是否需要携带token的标识
  headers: {
    checkToken: true
  }
})

// 发送短信验证码
export const reqSendCode = (phone) => ajax({
  url: '/sendcode',
  params: {
    phone
  }
})

// 用户名密码登陆
export const reqPwdLogin = ({ name, pwd, captcha }) => ajax.post('/login_pwd', { name, pwd, captcha })

// export const reqPwdLogin = ({ name, pwd, captcha }) => ajax({
//   url: '/login_pwd',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   data: {
//     name,
//     pwd,
//     captcha
//   }
// })

// 手机号验证码登陆
export const reqSmsLogin = ({ phone, code }) => ajax({
  url: '/login_sms',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data: {
    phone,
    code
  }
})

// 自动登陆
export const reqAutoLogin = () => ajax('/auto_login', {
  headers: {
    checkToken: true
  }
})

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
* 获取商家评价数组
*/
export const reqShopRatings = () => ajax('/ratings')

/**
* 获取商家商品数组
*/
export const reqShopGoods = () => ajax('/goods')

// 根据商家id请求对应的商家数据
export const reqShop = (id) => ajax('/shop/' + id)
