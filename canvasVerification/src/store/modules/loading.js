import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isLoading: false,
}

const mutations = {
  changeisLoading(state, data) {
  	state.isLoading = data
  }
}

export default {
  state,
  mutations
}
