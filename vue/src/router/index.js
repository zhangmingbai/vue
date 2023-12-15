import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {unauthorized} from "@/net";
import {ElMessage} from "element-plus";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/index',
      name: 'homeView',
      component: HomeView,
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/components/home/IndexComponent.vue")
        },
        {
          path: "liuyan",
          name: "liuyan",
          component: () => import("@/components/home/LiuyanComponent.vue")
        },
        {
          path: "wenzhang",
          name: "wenzhang",
          component: () => import("@/components/home/WenzhangComponent.vue")
        }
      ]
    },
    {
      path: '/',
      name: 'manager',
      component: () => import("@/views/Manager.vue"),
      children: [
        { path: 'home', name: 'Home', meta: { name: '系统首页' }, component: () => import('../components/manager/Home.vue') },
        { path: 'user', name: 'User', meta: { name: '用户信息' }, component: () => import('../components/manager/User.vue') },
        { path: 'UserPerson', name: 'UserPerson', meta: { name: '个人信息' }, component: () => import('../components/manager/UserPerson.vue') },
        { path: 'notice', name: 'Notice', meta: { name: '公告信息' }, component: () => import('../components/manager/Notice.vue') },
        { path: 'category', name: 'Category', meta: { name: '博客分类' }, component: () => import('../components/manager/Category.vue') },
      ]
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/WelcomeView.vue'),
      children: [
        {
          path: '',
          name: 'welcome-login',
          component: () => import('@/views/welcome/LoginPage.vue')
        },
        {
          path: '/register',
          name: 'welcome-register',
          component: () => import('@/views/welcome/RegisterPage.vue')
        },
        {
          path: '/forget',
          name: 'welcome-forget',
          component: () => import('@/views/welcome/ForgetPage.vue')
        }
      ]
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   const isUnauthorized = unauthorized()
//   if (to.name && to.name.startsWith('welcome') && !isUnauthorized) {
//     ElMessage.warning('您已经登录，无法访问登录页面')
//     next('/index')
//   } else if (to.name && to.name.startsWith('manager') && isUnauthorized) {
//     ElMessage.warning('您还没有登录，请先登录')
//     next('/welcome')
//   } else {
//     next()
//   }
// })

export default router
