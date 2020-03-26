import Vue from 'vue'
import Vuex from 'vuex'
import chartDOM from './modules/charts'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chartDOM,
    app
  }
})
