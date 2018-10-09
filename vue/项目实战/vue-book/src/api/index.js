import axios from 'axios'

// 增加默认的请求路径--如果你没指定，那么就必须在每次axios.get或者axios.post 写全地址，特别麻烦
axios.defaults.baseURL = 'http://localhost:3001'
// 增加拦截器，把结果处理成res.data
axios.interceptors.response.use((res)=> {
    return res.data
})

// 获取轮播图数据
export let getSliders = ()=> {
    // 返回的是Promise对象
    return axios.get('/sliders')
}

// 获取热门图书
export let getHotBook = ()=> {
    return axios.get('/hot')
}

// 获取全部图书
export let getBooks = ()=> {
    return axios.get('/book')
}

// 删除某一本图书
export let removeBook = (id)=> {
    return axios.delete(`/book?id=${id}`)
}

// 获取某一本书
export let findOneBook = (id)=> {
    return axios.get(`/book?id=${id}`)
}

/***
 * 修改图书信息
 * @param id 编号
 * @param data 请求体发送的数据
 * @returns {AxiosPromise<any>} 返回Promise对象
 */
export let updateBook = (id, data)=> {
  return axios.put(`/book?id=${id}`, data)
}
