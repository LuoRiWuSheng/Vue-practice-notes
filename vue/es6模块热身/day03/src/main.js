import Vue from "Vue";

import App from "./App.vue";
import router from "./router/router.js";
import notify from "./plugin/notify.js";

// 使用带有install的插件
Vue.use(notify,{
	delay: 2000
});

new Vue({
	el: "#app",
	router,
	render: (h)=> h(App)
});
