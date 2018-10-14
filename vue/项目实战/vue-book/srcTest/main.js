import Vue from 'vue'
import App from './App'
import store from './store/index'

const state = {
  count: 0
};

// 练习vuex 状态管理
new Vue({
    el: '#app',
    ...App,
    store // index 被注册到实例上了，所有组件都会有一个属性, this.$index
})
