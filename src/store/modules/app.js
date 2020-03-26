const app = {
  state: {
    toggleSidebar: true
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.toggleSidebar = !state.toggleSidebar
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    }
  },
  getters: {
    toggleSidebar: state => state.toggleSidebar
  }
}
export default app
