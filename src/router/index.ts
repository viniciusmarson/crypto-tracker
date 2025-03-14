import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/authenticated/HomeView.vue'
import WalletView from '@/views/authenticated/WalletView.vue'
import ProfileView from '@/views/authenticated/ProfileView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const isAuthenticated = () => {
  return !!localStorage.getItem('userToken')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'authentication',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          component: LoginView,
        },
        {
          path: '/register',
          component: RegisterView,
        },
      ],
    },
    {
      path: '/',
      name: 'authenticated',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/',
          component: HomeView,
        },
        {
          path: '/wallet',
          component: WalletView,
        },
        {
          path: '/profile',
          component: ProfileView,
        },
      ],
    },
  ],
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login') // Redirect to login if not authenticated
  } else {
    next() // Proceed to the route
  }
})

export default router
