import request from '../utils/request'

// 登录接口
export function login (data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

// 退出接口，自动会在请求头中有token，后台自然就知道应该退出哪个用户
export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getInfo (token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
