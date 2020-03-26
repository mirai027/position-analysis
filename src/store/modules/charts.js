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
      commit('GET_CHART_DOM', chartDOM)
    }
  },
  getters: {
    chartDOM: state => state.chartDOM
  }
}
export default chartDOM
