import Vue from 'vue'
// 全部加载
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "./style/common.less"

// 按需引入
// import { Button, Layout } from 'ant-design-vue';

import App from './App.vue'
import VueRouter from 'vue-router'
import VueCompositionApi from '@vue/composition-api'
import router from './router'
import "./mock"

import Highlight from './directive'

// 按需引入
/* Vue.component(Button.name, Button)
Vue.component(Layout.name, Layout) */

Vue.config.productionTip = false

// 全部加载
Vue.use(Antd)
Vue.use(VueRouter)
Vue.use(VueCompositionApi)

// 代码高亮
Vue.use(Highlight)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
