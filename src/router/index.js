import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductPage from '@/views/ProductPage.vue'
import CartPage from '@/views/CartPage.vue'
import Register from '@/views/Register.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import AddProductPage from '@/views/AddProductPage.vue'
import AllProducts from '@/views/AllProducts.vue'

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
    ,
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/add',
      name: 'addProduct',
      component: AddProductPage
    },
    {
      path: '/all',
      name: 'AllProducts',
      component: AllProducts
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFoundPage',
      component: NotFoundPage
    }
  ]
})

export default router
