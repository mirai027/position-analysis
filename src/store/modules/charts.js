const chartDOM = {
  state: {
    chartDOM: [],
    currComponentName: [],
    showingName: [],
    changedPage: []
  },
  mutations: {
    GET_CHART_DOM: (state, chartDOM) => {
      state.chartDOM.push(...chartDOM)
      state.chartDOM = [...new Set(state.chartDOM)]
      // console.log(state.chartDOM)
    },
    GET_NAME: (state, currComponentName) => {
      state.currComponentName = currComponentName
    },
    GET_SHOWING_NAME: (state) => {
      state.showingName = state.chartDOM.filter(item => {
        return state.currComponentName.some(cItem => item.name === cItem)
      })
      // console.log(state.showingName)
    },
    GET_CHANGED_PAGE: (state, changedPage) => {
      state.changedPage = changedPage
      // console.log(state.changedPage)
    },
    DELETE_CHANGE_PAGE: (state, changedPage) => {
      const index = state.changedPage.indexOf(changedPage)
      state.changedPage.splice(index, 1)
    }
  },
  actions: {
    setChartDOM({ commit }, chartDOM) {
      commit('GET_CHART_DOM', chartDOM)
    },
    getName({ commit }, currComponentName) {
      commit('GET_NAME', currComponentName)
    },
    getShowingName({ commit }) {
      commit('GET_SHOWING_NAME')
    },
    getChangedPage({ commit }, changedPage) {
      commit('GET_CHANGED_PAGE', changedPage)
    },
    deleteChangePage({ commit }, changedPage) {
      commit('DELETE_CHANGE_PAGE', changedPage)
    }
  },
  getters: {
    chartDOM: state => state.chartDOM,
    showingName: state => state.showingName,
    changedPage: state => state.changedPage
  }
}
export default chartDOM
