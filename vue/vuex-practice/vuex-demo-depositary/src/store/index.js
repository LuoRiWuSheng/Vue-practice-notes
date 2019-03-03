import Vue from "vue"
import Vuex from "Vuex"
import {state, getters, actions} from "./store"
import mutations from "./mutations"

Vue.use(Vuex)

const store = new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})

// 这里导出的 store是注入到 main.js中的  new Vue({store})
export default store
