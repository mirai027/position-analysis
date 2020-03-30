const app = {
  state: {
    toggleSidebar: false,
    pagePoint: [],
    pagePointIdx: {
      idx: 0,
      status: true
    },
    pagePointTitle: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.toggleSidebar = !state.toggleSidebar
    },
    PAGE_POINT: (state, pointList) => {
      state.pagePoint = [...pointList]
    },
    PAGE_POINT_IDX: (state, index) => {
      /**
       * 因为存在滚动了页面，但想点击时页面滚动回描点位置。但因为 idx的值相同，所以 watch无法监听得到。所以添加一个 status并每次更改值使得 watch每次都能监听到变化，来执行操作
       * 每次点击都会更改 status的值，用于其他组件能使用 watch监听到变化（需要加 deep）
       */
      state.pagePointIdx.status = !state.pagePointIdx.status
      state.pagePointIdx.idx = index
      // let { idx, status } = state.pagePointIdx
      // idx = index
      // status = !status
    },
    PAGE_POINT_TITLE: (state, title) => {
      state.pagePointTitle.splice(0, 1)
      setTimeout(() => {
        state.pagePointTitle.push(title)
      }, 300)
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    pagePoint({ commit }, pointList) {
      commit('PAGE_POINT', pointList)
    },
    pagePointIdx({ commit }, index) {
      commit('PAGE_POINT_IDX', index)
    },
    pagePointTitle({ commit }, title) {
      commit('PAGE_POINT_TITLE', title)
    }
  },
  getters: {
    toggleSidebar: state => state.toggleSidebar,
    pagePoint: state => state.pagePoint,
    pagePointIdx: state => state.pagePointIdx,
    pagePointTitle: state => state.pagePointTitle
  }
}
export default app
