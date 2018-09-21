// 用户登录接口

import {request} from '../utils/request'

export const requestLogin = params => {
    return request('/api/user/login', params).then(data => {
        // 获取request这个promise返回的数据，这里的then是 Promise状态由pending--> resolve状态
        localStorage.setItem('user-token', JSON.stringify(data.token))
        // 这里将数据返回后，去看AppLogin.vue中的逻辑
        return data
    }).catch(err => {
        console.log('api/user.js中报错', err)
    })
}

export const requestRegister = params => {
    return request('/api/user/register', params)
}

export const requestUserInfo = params => {
    return request('/api/user/info', params).then(data => {
        console.log(data)
        sessionStorage.setItem('user-info', JSON.stringify(data))
        return data
    })
}

export const getIndexData = () => {
    return request('/api/index', {}).then(data => {
        return data
    })
}
