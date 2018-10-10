import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'Vuex/dist/logger' // 日志插件
import App from './App'

Vue.use(Vuex)

const state = {
    count: 0
};

const mutations = {
    add(state, payload) { // state是自动放进去的，默认指的当前的state
        state.count += payload
    },
    minus(state) {
        state.count -= 1;
    }
}

const store = new Vuex.Store({
    state,
    strict: true, // 只能通过 mutation的方式来改变状态，mutation不支持异步
    mutations,
    plugins: [logger()]
})

// 练习vuex 状态管理
new Vue({
    el: '#app',
    ...App,
    store // store 被注册到实例上了，所有组件都会有一个属性, this.$store
})
