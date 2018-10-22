import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: ()=> import('../components/Home')
    },
    {
        path: '/item',
        component: ()=> import('../components/Item')
    },
    {
        path: '/score',
        component: ()=> import('../components/Score')
    }
]

const router = new VueRouter({
    routes
})

export default router