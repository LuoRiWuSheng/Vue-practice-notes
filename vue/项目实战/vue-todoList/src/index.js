// vue的入口文件
import Vue from "vue"
import App from "./App.vue"
import "./asserts/styles/test.css"
import "./asserts/styles/test-stylus.styl"
import "./asserts/images/1.jpg"

const root = document.createElement("div")
document.body.appendChild(root)


new Vue({
    render: (h)=> h(App)
}).$mount(root)