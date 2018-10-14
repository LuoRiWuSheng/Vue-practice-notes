import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'Vuex/dist/logger'

Vue.use(Vuex)

// 状态
const state = {
    cartList: []
}

import getters from './getters'
import mutations from './mutations'


export default new Vuex.Store({
    state,
    getters,
    mutations,
    strict:true,
    plugin: [logger()]
})

