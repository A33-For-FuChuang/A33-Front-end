import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './user'
import common from './common'
export default new Vuex.Store({
  modules:{
    user,
    common
  }
})
