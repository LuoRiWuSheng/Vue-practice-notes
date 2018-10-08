// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router' // 这里的全称应该是 ./router/index.js  因为会默认去找index.js，所以省略
import VueAwesomeSwiper from "vue-awesome-swiper" // 导出轮播图插件
/**
 * 参考链接
 * https://github.com/hilongjw/vue-lazyload
 */
import VueLazyLoad from "vue-lazyload" // 引入图片懒加载插件

Vue.use(VueAwesomeSwiper); // 注册插件
Vue.use(VueLazyLoad, {
    preload: 1.3,
    error: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1160684446,1076555601&fm=27&gp=0.jpg',
    loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
    attempt: 1
});

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})