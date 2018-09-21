import Vue from 'vue'
import Router from 'vue-router'
import whiteList from './whiteList'
import staticRouter from './staticRouter'
import {requestUserInfo} from '@/api/user'

Vue.use(Router)

const router = new Router({
    routes: staticRouter
})

// 利用router.meta保存数据级权限
const router_init = (permissions) => {
    permissions.forEach(v => {
        let routeItem = router.match(v.path)
        if (routeItem) {
            // 为这个meta元信息增加权限 有就添加，没有给空数组
            routeItem.meta.perssion = v.permission ? v.perssion : []
        }
    })
}

// 检测用户是否有权限访问页面-- to_path 就是要去的页面
const page_permission = (permissions, to_path, next) => {
    let allow_page = false

    permissions.forEach(v => {
        if (v.path === to_path) {
            allow_page = true
        }
    })

    // 允许访问，就进去，没有权限，就转到401界面
    allow_page ? next() : next({path: '/error/401'})
}

/**
 *  权限控制 -- 这是注册一个全局守卫
 *  to 即将要进入的路由对象
 *  from 当前导航正要离开的路由对象
 *  next 钩子函数
 * */
router.beforeEach((to, from, next) => {
    console.log('to将要去的路由-->', to)
    console.log('from从哪里来-->', from)

    // 忽略错误页面的权限判断
    if (to.meta.errorPage) {
        return next()
    }

    // 进入登录界面，将注销用户信息
    if (to.path === '/login') {
        console.warn('router/index-->>>>>>')
        sessionStorage.removeItem('user-info')
        localStorage.removeItem('user-token')
    }

    // 免登录界面
    if (whiteList.indexOf(to.fullPath) >= 0) {
        return next()
    }

    let user_info = JSON.parse(sessionStorage.getItem('user-info'))
    console.warn('从session中获取的用户信息是-->', user_info)

    // 上次会话结束，重新获取用户信息
    if (!user_info) {
        requestUserInfo({}).then(user_info => {
            const permissions = user_info.permissions || []
            router_init(permissions)
            page_permission(permissions, to.path, next)
        }).catch(err => {
            console.log(err)
        })
    } else {
        // 已经登录的，判断页面权限
        const permissions = user_info.permissions
        page_permission(permissions, to.path, next)
    }
})

export default router
