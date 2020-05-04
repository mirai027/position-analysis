const positionForm = {
  state: {
    positionForm: {
      region: '广东省',
      level: 2,
      position: '后端开发'
    },
    comparedLeftForm: {
      region: '广东省',
      level: 2,
      position: '后端开发'
    },
    comparedRightForm: {
      region: '广东省',
      level: 2,
      position: '前端开发'
    }
  },
  mutations: {
    GET_POSITION_FORM: (state, change) => {
      state.positionForm[change.key] = change.value
    },
    GET_COMPARED_LEFT_FORM: (state, change) => {
      state.comparedLeftForm[change.key] = change.value
    },
    GET_COMPARED_RIGHT_FORM: (state, change) => {
      state.comparedRightForm[change.key] = change.value
    }
  },
  actions: {
    setPositionForm({ commit }, change) {
      commit('GET_POSITION_FORM', change)
    },
    setComparedLeftForm({ commit }, change) {
      commit('GET_COMPARED_LEFT_FORM', change)
    },
    setComparedRightForm({ commit }, change) {
      commit('GET_COMPARED_RIGHT_FORM', change)
    }
  },
  getters: {
    positionForm: (state) => state.positionForm,
    comparedLeftForm: (state) => state.comparedLeftForm,
    comparedRightForm: (state) => state.comparedRightForm
  }
}
export default positionForm
