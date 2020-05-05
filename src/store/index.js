import Vue from 'vue'
import Vuex from 'vuex'
import chartDOM from './modules/charts'
import app from './modules/app'
import miraiTable from './modules/mirai-table'
import positionForm from './modules/position'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    chartDOM,
    app,
    miraiTable,
    positionForm
  }
})
