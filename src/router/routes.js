import MSite from '@/pages/MSite/MSite'
import Order from '@/pages/Order/Order'
import Profile from '@/pages/Profile/Profile'
import Search from '@/pages/Search/Search'
import Login from '@/pages/Login/Login'
import Shop from '@/pages/Shop/Shop.vue'
import Goods from '@/pages/Shop/Goods.vue'
import Ratings from '@/pages/Shop/Ratings.vue'
import Info from '@/pages/Shop/Info.vue'

// 路由守卫测试组件
import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

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
    path: '/shop/:id',
    name: 'shop',
    props: true, // 将动态路由的参数已组件标签的形式（props形式）传递给子组件
    component: Shop,
    children: [
      {
        path: 'goods',
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
        redirect: 'goods'
      }
    ]
  },
  {
    path: '/a',
    component: A
  },
  {
    path: '/b',
    component: B,
    children: [
      {
        path: '/b/b1',
        component: B1
      },
      {
        path: '/b/b2',
        component: B2
      }
    ]
  }
]
