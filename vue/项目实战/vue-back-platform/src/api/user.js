// 用户登录接口

import {request} from '../utils/request'

export const requestLogin = params => {
    return request('/api/user/login', params).then(data => {
        localStorage.setItem('user-token', JSON.stringify(data.token))
        return data
    }).catch(err => {
        console.log('api/user.js中报错', err)
    })
}

export const requestRegister = params => {
    return request('/api/user/register', params)
}

export const requestUserInfo = params => {
    console.log('进入user.js')
    return request('/api/user/info', params).then(data => {
        console.log(data)
        sessionStorage.setItem('user-info', JSON.stringify(data))
        return data
    })
}
