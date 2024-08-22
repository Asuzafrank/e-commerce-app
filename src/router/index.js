import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductPage from '@/views/ProductPage.vue'
import CartPage from '@/views/CartPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/product/:id',
      name: 'product-page',
      component: ProductPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    }
  ]
})

export default router
