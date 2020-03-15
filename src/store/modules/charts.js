const chartDOM = {
  state: {
    chartDOM: []
  },
  mutations: {
    GET_CHART_DOM: (state, chartDOM) => {
      state.chartDOM.push(...chartDOM)
    }
  },
  actions: {
    setChartDOM({ commit }, chartDOM) {
      return commit('GET_CHART_DOM', chartDOM)
    }
  },
  getters: {
    gChartDOM: state => state.chartDOM
  }
}
export default chartDOM
