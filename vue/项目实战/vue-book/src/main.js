// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入轮播图插件
import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=633224397,309590062&fm=26&gp=0.jpg',
    loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539167567354&di=4b755260b700b9d3ab175f4f069c74e2&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01a851599d4688a801201794912bf9.gif',
    attempt: 1
})

// 使用轮播图插件
Vue.use(VueAwesomeSwiper)

// 在进入路由之前，每一次都会执行此方法,全局钩子， 有拦截功能
router.beforeEach(function(from, to, next) {
    document.title = from.meta.title
    next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
