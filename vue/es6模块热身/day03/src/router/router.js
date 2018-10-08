import Vue from "vue";
import VueRouter from "Vue-router";
import Home from "../components/Home.vue";
import List from "../components/List.vue";

// 和以前不一样的地方，引入router必须use一下
// use就相当于注册一些全局组件，不然你的  router-view在App.vue中无法使用，报错，没注册router-view
Vue.use(VueRouter);

const routes = [
	{path: "/home", component: Home},
	{path: "/list",component: List}
]
let router = new VueRouter({
	routes
});

export default router;