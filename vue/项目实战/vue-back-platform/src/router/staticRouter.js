import AppLogin from '@/pages/login/AppLogin'
import HelloWorld from '@/pages/components/HelloWorld'
import AppRegister from '@/pages/login/AppRegister'

/** 静态路由 **/
const staticRouter = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/login',
        name: '登录',
        component: AppLogin
    },
    {
        path: '/register',
        name: '注册',
        component: AppRegister
    },
    {
        path: '/index',
        name: '首页',
        component: HelloWorld
    }
]

export default staticRouter
