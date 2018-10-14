import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)
import logger from 'Vuex/dist/logger' // 日志插件

// 容器是唯一的
const state = {
  count: 0
};
const getters = {
    val(state) {
        if(state.count === 0) return 0
        return state.count % 2 == 0? '偶数': '奇数'
    }
}

import mutations from './mutations'

export default new Vuex.Store({
  state,
  getters,
  strict: true, // 只能通过 mutation的方式来改变状态，mutation不支持异步
  mutations,
  plugins: [logger()]
})

