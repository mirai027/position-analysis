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
  // {
  //   path: '/province',
  //   name: 'Province',
  //   component: () => import('../views/province/index.vue'),
  //   meta: {
  //     title: '茵蒂克丝'
  //   },
  //   children: [
  //     {
  //       path: 'map',
  //       name: 'Map',
  //       component: () => import('../views/province/map.vue'),
  //       meta: { title: '地图模块' }
  //     },
  //     {
  //       path: 'test1',
  //       name: 'Test1',
  //       component: () => import('../views/province/test1.vue'),
  //       meta: { title: '测试一' }
  //     },
  //     {
  //       path: 'test2',
  //       name: 'Test2',
  //       component: () => import('../views/province/test2.vue'),
  //       meta: { title: '测试二' }
  //     }
  //   ]
  // },
  // {
  //   path: '/date',
  //   name: 'Date',
  //   component: () => import('../views/date/index.vue'),
  //   meta: {
  //     title: '时间刻度'
  //   },
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'Test1',
  //       component: () => import('../views/date/test1.vue'),
  //       meta: { title: '测试一' }
  //     },
  //     {
  //       path: 'test2',
  //       name: 'Test2',
  //       component: () => import('../views/date/test2.vue'),
  //       meta: { title: '测试二' }
  //     }
  //   ]
  // },
  // {
  //   path: '/position',
  //   name: 'Position',
  //   component: () => import('../views/position/index.vue'),
  //   meta: {
  //     title: '职位分析'
  //   },
  //   children: [
  //     {
  //       path: 'test1',
  //       name: 'Test1',
  //       component: () => import('../views/position/test1.vue'),
  //       meta: { title: '测试一' }
  //     },
  //     {
  //       path: 'test2',
  //       name: 'Test2',
  //       component: () => import('../views/position/test2.vue'),
  //       meta: { title: '测试二' }
  //     }
  //   ]
  // },
  {
    path: '/mirai',
    name: 'Mirai',
    component: () => import('../views/mirai/index.vue'),
    meta: {
      title: '实验室'
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('../views/mirai/mirai-table.vue'),
        meta: { title: 'Table表格' }
      }
    ]
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('../views/rank/index.vue'),
    meta: {
      title: '排行榜'
    },
    children: [
      {
        path: 'default',
        name: 'Default',
        component: () => import('../views/rank/main.vue'),
        meta: { title: 'Default' }
      },
      {
        path: 'language',
        name: 'Language',
        component: () => import('../views/rank/language.vue'),
        meta: { title: '编程语言排行榜' }
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
