import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: "/index",
          name: "index",
          component: () => import("../components/home/IndexComponent.vue")
        }
      ]
    },
    {
      path: "/index", // 这里是全局前置守卫的路径配置
      redirect: "/" // 这里是重定向的路径配置
    }
  ]
})

export default router
