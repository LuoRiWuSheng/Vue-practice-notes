import * as Types from './mutationsType'

const mutations = {
    [Types.ADD_CART](state, book) {
        let product = state.cartList.find(item=> {
            return item.bookId === book.bookId
        })


        if(product) { // 购物车有这本书
            book.bookCount += 1  // 数量加1
            state.cartList = [...state.cartList]
        } else {
            book.bookCount = 1
            state.cartList = [...state.cartList, book]
        }

    }
}

export default mutations
