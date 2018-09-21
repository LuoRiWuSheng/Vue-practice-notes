// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router'

// 启用模拟数据
import Mock from './mock/index'
import VueScroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.scss'
import './assets/css/base.scss'
// 引入 font-awesome图标库
import 'font-awesome/scss/font-awesome.scss'

Mock.mockData()

Vue.config.productionTip = false
Vue.use(ElementUI)
/* vuescroll */
Vue.use(VueScroll, {
    ops: {
        bar: {background: '#C0C4CC'}
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
