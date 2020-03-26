import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: () => import('../views/position/index.vue')
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
  routes,
  mode: 'history',
  base: '/dist/',
  scrollBehavior(to, from, savedPosition) {
    // 如果你的連結是帶 # 這種
    // to.hash 就會有值(值就是連結)
    // 例如 #3
    console.log(to)
    if (to.hash) {
      return {
        // 這個是透過 to.hash 的值來找到對應的元素
        // 照你的 html 來看是不用多加處理這樣就可以了
        // 例如你按下 #3 的連結，就會變成 querySelector('#3')，自然會找到 id = 3 的元素
        selector: to.hash
      }
    }
  }
})

export default router
