let getters = {
    // 箭头函数的话，简写是不用reutn
    count(state) {
        return state.cartList.reduce((prev, next)=> {
            return prev + next.bookCount
        },0)
    }
}

export default getters
