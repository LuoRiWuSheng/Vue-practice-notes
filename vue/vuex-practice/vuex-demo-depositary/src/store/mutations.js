/***
 * mutations的存在就是为了改变 state中的数据
 */
const mutations = {
	add(state) {
		state.count++
	},
	reduce(state, payload) {
		// 注意，这里不能直接写成 state.count - payload
		state.count -= payload
	}
	
}


export default mutations