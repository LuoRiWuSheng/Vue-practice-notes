import Vue from 'vue'
import Router from 'vue-router'

/*import Home from '@/components/Home'
import Add from '@/components/Add'
import Collection from '@/components/Collection'
import List from '@/components/List'
import Detail from '@/components/Detail'*/

Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: ()=>import('@/components/Home'),
            meta: {
                keepAlive: true,
                title: '首页'
            }
        },
        {
            path: '/add',
            component: ()=>import('@/components/Add'),
            meta: {
                title: '新增'
            }
        },
        {
            path: '/collection',
            component: ()=>import('@/components/Collection'),
            meta: {
                title: '收藏'
            }
        },
        {
            path: '/list',
            component: ()=>import('@/components/List'),
            meta: {
                title: '列表'
            }
        },
        {
            path: '/detail/:bid',
            component: ()=>import('@/components/Detail'),
            name: "detail",
            meta: {
                title: '详情'
            }
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
