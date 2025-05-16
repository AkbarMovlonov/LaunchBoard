import { createRouter, createWebHistory } from 'vue-router'
import LaunchesPage from '@/views/LaunchesPage.vue'
import AboutPage from '@/views/AboutPage.vue'

const routes = [
  { path: '/', name: 'Launches', component: LaunchesPage },
  { path: '/about', name: 'About', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
