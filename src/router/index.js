import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    // 如果父路由有默认子路由 那它的 name 没有意义
    // name: 'layout',
    component: () => import('@/views/layout/'),
    children: [
      {
        // 默认子路由,只能有一个
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 开启 props 传参，说白了就是把路由参数映射到组件的 props 数据中
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  }
]

const router = new VueRouter({
  routes
})

export default router
