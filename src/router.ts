import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import ColumnDetail from './views/ColumnDetail.vue'
import CreatePost from './views/CreatePost.vue'
import store from './store'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      //   meta: { redirectAlreadyLogin: true }
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   console.log(to.meta)
//   if (to.meta.requiredLogin && !store.state.user.isLogin) {
//     next({ name: 'login' })
//   } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
//     next('/')
//   } else {
//     next()
//   }
// })
// beforeEach全局前置守卫
// to 即将进入的目标，from正在离开的路由
router.beforeEach((to, from, next) => {
  console.log(to, 'to')
  console.log(from, 'from')
  console.log(store.state.user.isLogin)
  // 执行next 完成跳转
  //   next()
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    debugger
    // { name: 'home' }
    next('/')
  } else {
    next()
  }
})

export default router
