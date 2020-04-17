import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'

import ElementUI from 'element-ui'
import './styles/element-variables.scss'

// 全局样式
import './styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

/**
 * 如果不想在webpack中使用 mock-devserver模拟接口服务，想要在前端直接使用Mockjs
 * 就执行 mockXHR()
 *
 * 当前的mockjs是用在开发环境
 * 上线环境请移除
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 导入并全局注册svg组件
import './icons'

Vue.use(ElementUI, {
  // 设置element默认的大小
  size: Cookies.get('size') || 'medium'
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
