import axios from 'axios'
// 增加默认的请求路径
axios.defaults.baseURL = 'http://localhost:8011';

// 增加统一的拦截器，只返回后台的data数据，像xhr对象，status都被拦截了，调用下面api，就不用再解构赋值
// 如果这里后台返回一些 状态，比如，-1，0，1等分别在这里代表不同的状态，可以在拦截器中统一处理
axios.interceptors.response.use((res) => {
    return res.data;
})


// 获取轮播图数据
export let getSliders = () => {
    console.log("获取轮播图");
    // 可以返回一个Promise对象,这里不去管具体Promise之后的then该怎么写，达到高内聚，低耦合
    return axios.get("/sliders");
}

// 获取热门图书接口
export let getHotBook = () => {
    console.log("获取热门图书");
    return axios.get("/hot");
}

// 获取全部图书
export let getBooks = () => {
    return axios.get('/book');
}

// 删除某一本图书
export let removeBook = (id) => {
    return axios.delete(`/book?id=${id}`);
}

// 获取某一本书
export let findOneBook = (id) => {
    return axios.get(`/book?id=${id}`);
}

/**
 * 修改图书
 * @param {String} id 书的编号
 * @param {Object} data 修改的内容，请求体发送的内容
 * @returns {Object} AxiosPromise
 */
export let updateBook = (id, data) => {
    return axios.put(`/book?id=${id}`, data);
}

// 新增图书
export let addBook = (data) => {
    return axios.post("/book", data);
}

export let getAll = () => {
    return axios.all([getSliders(), getHotBook()]);
}

// List页面的分页 -- 根据偏移量，返回对应的数据
export let pagination = (offset) => {
    return axios.get(`/page?offset=${offset}`);
}