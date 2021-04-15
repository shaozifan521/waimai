import MSite from '@/pages/MSite/MSite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop.vue'
import Goods from '@/pages/Shop/Goods.vue'
import Ratings from '@/pages/Shop/Ratings.vue'
import Info from '@/pages/Shop/Info.vue'

export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/', // 路由重定向
    redirect: '/msite'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shop',
    component: Shop,
    children: [
      {
        path: '/shop/goods',
        component: Goods
      },
      {
        path: 'ratings', // 二级路由的第二种写法
        component: Ratings
      },
      {
        path: 'info',
        component: Info
      },
      {
        path: '',
        redirect: '/shop/goods'
      }
    ]
  }
]
