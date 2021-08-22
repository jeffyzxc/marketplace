import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Buy from '../views/Buy.vue'
import Sell from '../views/Sell.vue'
import TransactionHistory from '../views/TransactionHistory.vue'


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Buy',
    component: Buy
  },
  {
    path: '/sell',
    name: 'Sell',
    component: Sell
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
