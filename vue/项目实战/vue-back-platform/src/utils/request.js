import axios from 'axios'
import {MessageBox, Message} from 'element-ui'

axios.defaults.baseURL = ''

// 增加请求拦截器，就是在你请求之前，拦截，可能修改参数什么之类的
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = window.localStorage.getItem('user-token')
    return config
})

/**
 * 普通请求
 * url {String} 请求地址
 * params {Object} 请求参数
 *
*/
export const request = (url, params, config = {}, auto_error_res = true, auto_error_data = true) => {
    // 合并参数
    const args = Object.assign({
        'method': 'post',
        'url': url,
        'data': params
    }, config)

    // console.log(args)

    return axios(args).then((res) => {
        if (!res.data.success) { // 前后台约定，请求是否成功
            res.data.error = res.data.error || {} // 拿到后台的错误码信息
            // console.error(res.data.error)

            // token 失效
            if (res.data.error.code === 1000) {
                Message({
                    message: '登录失败，请重新登录',
                    type: 'error'
                })
                window.location.hred = '/#/login'
                return Promise.reject(res.data.error)
            }

            if (auto_error_data) { // 是否自动处理后台结果
                const err_msg = res.data.error.message || '未知的服务器错误，请联系管理员'
                const err_cod = res.data.error.code || -1

                MessageBox.alert(err_msg, '请求失败：' + err_cod, { confirmButtonText: '确定' })
            }

            return Promise.reject(res.data.error)
        }
        // 获取到数据
        return res.data.result
    }, (error) => {
        console.error(error)

        if (auto_error_res) {
            const err_status = error.response.status || -100
            MessageBox.alert('网络请求异常，请联系管理员！', '请求异常:', err_status, { confirmButtonText: '确定' })
        }

        return Promise.reject(error)
    }).catch(err => {
        console.log('request捕获到的错误-->', err)
    })
}

/** 使用sessionStorage缓存请求 **/
export const sessionRequest = (url, params, out_time = -1, config = {}, auto_error_res = true, auto_error_data = true) => {
    const item_key = url + '#' + JSON.stringify(params)
    let item_val = sessionStorage.getItem(item_key)
    const now_time = new Date().getTime()

    if (item_val) { // 从缓存中拿到数据
        item_val = JSON.parse(item_val)

        const over_time = now_time - item_val.last_time

        if (over_time < 0 || over_time < out_time * 1000) { // 缓存超时了
            return Promise.resolve(item_val.data)
        }
    }

    // 缓存一开始没有数据，直接存入，并增加一个标志位，过期时间
    return request(url, params, config, auto_error_res, auto_error_data).then(data => {
        sessionStorage.setItem(item_key, JSON.stringify({
            'last_time': now_time,
            'data': data
        }))

        return data
    })
}

/** 使用localStorage缓存请求 **/
export const localStorage = (url, params, out_time = 604800, config = {}, auto_error_res = true, auto_error_data = true) => {
    const item_key = url + '#' + JSON.stringify(params)
    let item_val = localStorage.getItem(item_key)
    const now_time = new Date().getTime()

    if (item_val) { // 有缓存，从localStorage中获取
        item_val = JSON.parse(item_val)
        const over_time = now_time - item_val.last_time

        if (over_time < 0 || over_time < item_val.last_time * 1000) {
            return Promise.resolve(item_val.data)
        }
    }

    // 没有localStorage 进行存储
    return request(url, params, config, auto_error_res, auto_error_data).then(data => {
        localStorage.setItem('item_key', {
            'last_time': now_time,
            'data': data
        })

        return data
    })
}
