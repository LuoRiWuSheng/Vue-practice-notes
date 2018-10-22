import * as Types from './mutationType'

const mutations = {
    // 题目序号递增
    [Types.ADD_ITEM_NUM](state) {
        state.itemNum++
    },
    // 记录用户答题索引
    [Types.RECORD_ANSWER](state, index) {
        state.answerArr.push(index)
    },
    // 计时器
    [Types.RECORD_TIME](state) {
        state.timer = setInterval(()=> {
            state.allTime++
        }, 1000)
    },
    // 数据初始化
    [Types.INIT_DATA](state) {
        state.allTime = 0;
        state.timer = null;
        state.answerArr = [];
        state.itemNum = 1;
    }
}

export default mutations