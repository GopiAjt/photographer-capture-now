import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import ForgotPassword from '@/components/dashboardComponents/ForgotPassword.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/dashboard', name: 'dashboard', component: Dashboard},
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {path: '/register', name:'Register', component: Register},
    {path: '/forgot-password', name:'ForgotPassword', component: ForgotPassword}
  ]
})

export default router
