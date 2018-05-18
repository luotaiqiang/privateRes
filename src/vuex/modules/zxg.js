/*
 * @Author: sunjiahui
 * @Date: 2018-05-08
 * @Description: 自选股VUEX
*/

import * as types from '../mutation-types'

const state = {
  zxgListAddWatch: ''
}

// getters
const getters = {
  zxgListAddWatch: state => state.zxgListAddWatch
}

// actions
const actions = {}

// mutations
const mutations = {
  [types.ZXG_LIST_ADD_WATCH] (state, val) {
    state.zxgListAddWatch = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
