import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/',
    name: 'Mind',
    component: () => import(/* webpackChunkName: "about" */ '../views/Mind.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
