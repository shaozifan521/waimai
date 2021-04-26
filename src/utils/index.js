import Vue from 'vue'
// 包含工具函数的模块

// 保存对应商家的购物车数据
export function saveCartFoods (shopId, cartFoods) {
  let obj = {}
  cartFoods.forEach(item => {
    obj[item.id] = item.count
  })
  sessionStorage.setItem(`${shopId + '_key'}`, JSON.stringify(obj))
}

// 读取对应商家的购物车数据
export function getCartFoods (shop) {
  let cartFoods = []
  let obj = JSON.parse(sessionStorage.getItem(shop.id + '_key')) || {}
  shop.goods.forEach(good => {
    good.foods.forEach(food => {
      let count = obj[food.id]
      if (count > 0) {
        Vue.set(food, 'count', count)
        cartFoods.push(food)
      }
    })
  })
  return cartFoods
}
