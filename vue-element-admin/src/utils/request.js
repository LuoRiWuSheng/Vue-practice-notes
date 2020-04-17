import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from './auth'

// 创建axios实例
const service = axios.create({
  // 通过vue配置拿到请求地址
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 让请求携带token
    // X-Token是自定义请求头
    // 后台需要根据实际情况自行修改成一样的，才能获取到该请求头字段的值
    config.headers['X-Token'] = getToken()
  }

  return config
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 如果想要拿到更多的响应信息，直接将response对象返回

  const res = response.data

  // 前后端约定,如果状态不是20000， 就认为是错误
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })

    // 50008 -- 非法的token
    // 50012 -- 其他客户登录
    // 50014 -- token过期
    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      MessageBox.confirm('您已退出,您可以停留在当前页面,或者重新登录', '确认退出', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }

    return Promise.reject(new Error(res.message || 'Error'))
  }

  // 正常状态
  return res
}, error => {
  console.log('err-->', error)
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
})

export default service
