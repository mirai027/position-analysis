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
    },
    forwardList: []
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
    },
    GET_FORWARDLIST: (state, list) => {
      state.forwardList = list
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
    },
    setForwardList({ commit }, list) {
      commit('GET_FORWARDLIST', list)
    }
  },
  getters: {
    positionForm: (state) => state.positionForm,
    comparedLeftForm: (state) => state.comparedLeftForm,
    comparedRightForm: (state) => state.comparedRightForm,
    forwardList: (state) => state.forwardList
  }
}
export default positionForm
