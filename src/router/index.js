import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/date',
    name: 'Date',
    component: () => import('../views/date/index.vue')
  },
  {
    path: '/position',
    name: 'Position',
    component: () => import('../views/position/index.vue')
  },
  {
    path: '/province',
    name: 'Province',
    component: () => import('../views/province/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
