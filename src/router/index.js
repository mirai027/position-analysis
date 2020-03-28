import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: () => import('../views/position/index.vue')
    component: () => import('../views/home/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/province',
    name: 'Province',
    component: () => import('../views/province/index.vue'),
    meta: {
      title: '茵蒂克丝'
    },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('../views/province/test1.vue'),
        meta: { title: '测试一' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('../views/province/test2.vue'),
        meta: { title: '测试二' }
      }
    ]
  },
  {
    path: '/date',
    name: 'Date',
    component: () => import('../views/date/index.vue'),
    meta: {
      title: '时间刻度'
    },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('../views/date/test1.vue'),
        meta: { title: '测试一' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('../views/date/test2.vue'),
        meta: { title: '测试二' }
      }
    ]
  },
  {
    path: '/position',
    name: 'Position',
    component: () => import('../views/position/index.vue'),
    meta: {
      title: '职位分析'
    },
    children: [
      {
        path: 'test1',
        name: 'Test1',
        component: () => import('../views/position/test1.vue'),
        meta: { title: '测试一' }
      },
      {
        path: 'test2',
        name: 'Test2',
        component: () => import('../views/position/test2.vue'),
        meta: { title: '测试二' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
  // mode: 'history'
  // base: '/'
})

export default router
