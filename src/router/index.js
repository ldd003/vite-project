import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/testAntDesignVue',
    name: 'testAntDesignVue',
    component: () => import('../views/TestAntDesignVue.vue')
  },
  {
    path: '/TestApi',
    name: 'TestApi',
    component: () => import('../views/TestApi.vue')
  }
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory('/'),
  routes
})

export default router
