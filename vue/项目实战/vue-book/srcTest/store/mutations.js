import * as Types from './mutationsType.js'

const mutations = {
    [Types.INCREMENT](state) { // state是自动放进去的，默认指的当前的state
      state.count += 1
    },
    [Types.DECREMENT](state) {
      state.count -= 1;
    }
}

export default mutations
