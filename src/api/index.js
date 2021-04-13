import ajax from './ajax'

// 根据经纬度获取位置详情
export const reqAddress = (longitude, latitude) => ajax(`position/${longitude},${latitude}`)

// 获取食品分类列表
export const reqCategorys = () => ajax('/index_category')

// 根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax('/shops', {
  params: {
    longitude,
    latitude
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

// 手机号验证码登陆
export const reqSmsLogin = ({ phone, code }) => ajax({
  url: '/login_sms',
  method: 'POST',
  data: {
    phone,
    code
  }
})
