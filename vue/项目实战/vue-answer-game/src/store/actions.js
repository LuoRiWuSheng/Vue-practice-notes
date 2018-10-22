import * as Types from './mutationType'

const actions = {
    initialzeData({commit}) {
        commit([Types.INIT_DATA])
    },
    record({commit, state}, id) {
        // 记录下用户的选项
        commit([Types.RECORD_ANSWER], id);

        // 是否到了最后一题，没到，当前题目的索引+1
        if(state.itemNum < state.questionList.length) {
            commit([Types.ADD_ITEM_NUM])
        }
    }
}

export default actions
