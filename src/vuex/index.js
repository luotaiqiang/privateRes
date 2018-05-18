import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutaions'
import zxg from './modules/zxg'

Vue.use(Vuex)

const state = {
  count: 0
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    zxg
  }
})

export default store
