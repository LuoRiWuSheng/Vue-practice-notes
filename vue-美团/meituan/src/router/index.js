// 路由
import Vue from "vue"
import Router from "vue-router"

import Main from "@/pages/Main"
import Home from "@/pages/Home/Home"
import Recent from "@/pages/Recent/Recent"
import Order from "@/pages/Order/Order"
import Me from "@/pages/Me/Me"
import Meishi from "@/pages/Meishi"

Vue.use(Router)

let routes = [
    {
        path: "/",
        component: Main,
        children: [
            {
                path: '',
                name: "main",
                component: Home
            },
            {
                path: "/home",
                name: "home",
                component: Home
            },
            {
                path: "/recent",
                name: "recent",
                component: Recent
            },
            {
                path: "/order",
                name: "order",
                component: Order
            },
            {
                path: "/me",
                name: "me",
                component: Me
            }
        ]
    },
    {
        path: "/meishi",
        name: "meishi",
        component: Meishi
    }
]

let router = new Router(routes)

export default router
