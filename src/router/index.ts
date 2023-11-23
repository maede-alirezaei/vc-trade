import HomeViewVue from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [  {
    path: '/',
    name: 'home',
    component: HomeViewVue,
    props: (route) => ({ gender: route.query.gender })
  },]
})

export default router
