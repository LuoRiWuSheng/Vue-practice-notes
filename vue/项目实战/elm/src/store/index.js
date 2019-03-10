import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

Vue.use(Vuex)


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    strict: process.env.NODE_ENV !== "production" // 开启严格模式，保证更改store仓库数据的时候，都是通过mutation的方式提交更新
})
