import About from '@/views/about/About.vue'
import Candidate from '@/views/candidate/Candidate.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Candidate,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
})

export default router
