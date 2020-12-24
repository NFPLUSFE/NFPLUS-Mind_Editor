import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    linePoint: []
  },
  mutations: {
    updateLinePoint: function (state, e) {
      state.linePoint = e
    }
  },
  actions: {
  },
  modules: {
  }
})
