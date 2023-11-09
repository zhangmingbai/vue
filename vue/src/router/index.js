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
          path: "",
          name: "index",
          component: () => import("../components/home/IndexComponent.vue")
        },
        {
          path: "/liuyan",
          name: "liuyan",
          component: () => import("../components/home/LiuyanComponent.vue")
        },
        {
          path: "/wenzhang",
          name: "wenzhang",
          component: () => import("../components/home/WenzhangComponent.vue")
        }
      ]
    },
    {
      path: '/background',
      name: 'background',
      component: () => import("../views/background.vue")
    }
  ]
})

export default router
