import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

// 因为在 webpack.config.js中配置了别名 alise @ 值的就是src目录
Vue.use(Router)
    /*import Home from "@/components/Home"
    import List from "@/components/List"
    import Detail from "@/components/Detail"
    import Add from "@/components/Add"
    import Collection from "@/components/Collection"
    */
export default new Router({
    mode: 'history',
    routes: [{
            path: '*/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: () =>
                import ('@/components/Home'),
            meta: {
                keepAlive: true
            }
        }, {
            path: '/list',
            name: 'list',
            component: () =>
                import ('@/components/List')

        },
        {
            path: '/add',
            name: 'add',
            component: () =>
                import ("@/components/Add")

        },
        {
            path: '/collection',
            name: 'collection',
            component: () =>
                import ("@/components/Collection")

        },
        {
            path: '/detail/:bid', // 路径参数，要求必须有，但可以随机
            name: 'detail',
            component: () =>
                import ("@/components/Detail")

        }
    ]
})