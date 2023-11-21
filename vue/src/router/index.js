import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import {unauthorized} from "@/net";
import {ElMessage} from "element-plus";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: "",
          name: "index",
          component: () => import("@/components/home/IndexComponent.vue")
        },
        {
          path: "/liuyan",
          name: "liuyan",
          component: () => import("@/components/home/LiuyanComponent.vue")
        },
        {
          path: "/wenzhang",
          name: "wenzhang",
          component: () => import("@/components/home/WenzhangComponent.vue")
        }
      ]
    },
    {
      path: '/background',
      name: 'background',
      component: () => import("@/views/background.vue")
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

router.beforeEach((to, from, next) => {
  const isUnauthorized = unauthorized()
  if(to.name.startsWith('welcome-') && !isUnauthorized) {
    ElMessage.error("你已登录，不需在登录了")
    next('/')
  } else if(to.fullPath.startsWith('/background') && isUnauthorized) {
    ElMessage.error("请先登录，再进后台")
    next('/')
  } else {
    next()
  }
})

export default router
