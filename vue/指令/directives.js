import Vue from "../js/vue";

Vue.directive("focus",{
	inserted(el) {
		el.focus();
		
		el.setAttribute("placeholder","自定义内容");
	}
})

console.log(Vue);
exports(Vue);
