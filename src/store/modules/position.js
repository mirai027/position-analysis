const positionForm = {
  state: {
    positionForm: {
      region: '广东省',
      level: 2,
      position: '后端开发'
    }
  },
  mutations: {
    GET_POSITION_FORM: (state, change) => {
      state.positionForm[change.key] = change.value
    }
  },
  actions: {
    setPositionForm({ commit }, change) {
      commit('GET_POSITION_FORM', change)
    }
  },
  getters: {
    positionForm: (state) => state.positionForm
  }
}
export default positionForm
