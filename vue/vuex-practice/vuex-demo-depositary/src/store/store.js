const state = {
	count: 1,
	actionCount: 2
}

const getters = {
	count3: state => {
		return state.count
	}
}

/***
 * action提交的也是mutations，而不是直接操作 state
 * actions可以包含异步操作，mutations只能是同步操作
 * 
 * 在.vue的模版中使用actions中的方法
 */
const actions = {
	addAction(context) {
		// context是一个与 store具有相同方法和属性的对象，也就是说 store有的，context都有
		// 比如store提交一个mutations 去更新 state  $store.commit("add")， context也可以 context.commit("add")
		// context获取 state中的数据： context.state.count    context.getters.count
		
		/***
		 * context是一个 对象 {}
		 * 	{
		 * 		commit: XXXX,
		 * 		state: XXX,
		 * 		getters: XXX
		 * }
		 * 所以，你在创建一个actions时，如果只用到context中的一个东西， 又不想写成 context.commit 这么长，那就对象解构赋值
		 * increment({commit}) {
		 * 	commit("add")
		 * }
		 */
		context.commit("reduce", 120)
	},
	addAction2({ commit }) {
		console.log("触发 dispatch--")
		// 此时异步了，这里可以模拟 ajax请求 fetch等等
		setTimeout(()=> {
			commit("reduce", 50)
		}, 5000)
	}
}

// 如果要将 getters定义在这里，那么需要导出一个对象 就用 export  而不是 export default {state, getters}
export {state, getters, actions}
