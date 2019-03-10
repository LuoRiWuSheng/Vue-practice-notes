import Vue from 'vue'
import VueRouter from "vue-router"
import App from "./App"
import routes from "./router/router"
import store from "./store"
import { routerMode } from "./config/env"
import "./config/rem"
import FastClick from "fastclick"

Vue.config.productionTip = false

if ("addEventListener" in document) { // 标准浏览器
    // 检测浏览器是否支持 DOMContentLoaded事件，该事件是在 load事件之后触发
    // 当DOM加载完，就触发该事件，该事件不会等图片，音频，视频等资源是否加载完毕
    document.addEventListener("DOMContentLoaded", function() {
        // 引入 FastClick库是为了解决移动端300ms延迟问题
        FastClick.attach(document.body)
    }, false)
}

// 注入路由
Vue.use(VueRouter)

// 使用路由
const router = new VueRouter({
    routes,
    mode: routerMode, // 路由模式 （"hash"|"history"|"abstract"）
    strict: process.env.NODE_ENV === "production",
    scrollBehavior(to, from, savePositon) { // 滚动行为--控制路由在跳转的时候，页面停在哪个位置
        if(savePositon) {
            return savePositon
        } else {
            if(from.meta.keepAlive) {
                from.meta.savePositon = document.body.scrollTop
            }

            return {x: 0, y: to.meta.savePositon || 0}
        }

    }
})

new Vue({
    router,
    store,
    render: (h)=> h(App)
}).$mount('#app')