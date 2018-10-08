import modal from "./notify.vue";

let notify = {	// 需要在此组件的对象上拥有一个install方法
	
}

notify.install = function(Vue,options={delay: 3000}) {
	// options取决于 App.vue 文件中 Vue.use(notify,2) 第二个参数
	//console.log(Vue,options);
	
	Vue.say = function() {
		alert(1);
	}
	
	Vue.prototype.$notify = function(msg,opt={}) {
		if(notify.el) {
			return;
		}
		
		
		// 用新的值，盖掉旧值   Vue.use(notify,{delay:2000}) 这里的{}中的参数会当前传递到当前函数的options中
		// 在使用notify插件的时候，是 this.$notify("吃饭了",{delay: 5000})  这里的参数会依次传递给msg,opt
		options = {...options,...opt};
		
		let V = Vue.extend(modal); // 返回一个Vue的构造函数的子类，extend的参数是包含组件选项的对象
		// 创建V的实例
		let vm = new V;
		
		vm.value = msg;
		
		let oDiv = document.createElement("div");	// 创建一个div，将实例挂载到元素上
		// 将实例V挂载到元素 oDiv上
		vm.$mount(oDiv);
		document.body.appendChild(vm.$el);	// 把当前实例这个真实对象扔到页面上
		
		notify.el = vm.$el;
		
		setTimeout(()=> {	// 延迟，移除dom元素
			document.body.removeChild(vm.$el);	// 将实例上的元素删除掉
			notify.el = null;
		},options.delay);
	}
}

// 导出这个对象，如果使用Vue.use(notify)，就会调用此方法
export default notify;
