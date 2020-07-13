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
      title: '地区详情'
    }
  },
  {
    path: '/position',
    name: 'Position',
    component: () => import('../views/position/index.vue'),
    meta: {
      title: '职位前景'
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('../views/position/analysis.vue'),
        meta: { title: '职位分析' }
      },
      {
        path: 'compared',
        name: 'Compared',
        component: () => import('../views/position/compared.vue'),
        meta: { title: '职位对比' }
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
        path: 'dateTime',
        name: 'DateTime',
        component: () => import('../views/date/date-time.vue'),
        meta: { title: 'DateTime' }
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
  },
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
      },
      {
        path: 'vcl',
        name: 'Vcl',
        component: () => import('../views/mirai/vcl.vue'),
        meta: { title: '数据可视化' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
  // mode: 'history'
  // base: '/'
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router
