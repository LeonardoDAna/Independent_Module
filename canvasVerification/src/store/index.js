import Vue from 'vue'
import Vuex from 'vuex'
import loading from './modules/loading'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    loading
  },
  getters
})

export default store
