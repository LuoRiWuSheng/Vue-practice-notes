import "./comment.css";

import Vue from "Vue";
// import这样引用,引用的并不是vue.js,引用的是vue的runtime文件  在dist/vue.runtime.common.js" 
// 可以看node_module/vue/package.json重的main
// vue = compiler（编译） + runtime（运行时） 组成 ，compliter可以编译模版

// complier有6k 如果你直接引入vue.js这个文件，而不是vue.runtime.commen.js这个文件，可以直接在Vue实例中使用template
// 则上面的import Vue from "Vue/dist/vue.js" 写成这样

/**
 * 直接使用 import Vue from "Vue" 只用了 vue.runtime.comment.js文件
 * 如果在Vue实例中使用template，就会报错
 * 
 * You are using the runtime-only build of Vue where the template compiler is not available. 
 * Either pre-compile the templates into render functions, or use the compiler-included build.
 * */

/*const vm = new Vue({
	
	//template: `<div>hello</div>`
	
	// render函数的作用是将虚拟的dom渲染成真实的dom
	render: (createElement) => {
		//createElement 返回的是虚拟的DOM
		return createElement("h1",[
			"h1中的内容",createElement("i","我是h1的子元素")
		])
	}
}).$mount("#app");
*/

// 下面的方式就是解决上面creteElement这种写法的复杂程度

import App from './App.vue';
console.log(App);
new Vue({
	// 箭头函数和上面的render写法一样，只不过这里是将组建App传进去
	render: (h) => h(App)
}).$mount("#app");

