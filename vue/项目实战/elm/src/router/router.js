import App from "../App"

// 路由懒加载功能
const home = ()=> import("../pages/home/Home")
const city = ()=> import("../pages/city/City")
const msite = ()=> import("../pages/msite/Msite")

const routes = [
    {
        path: "/",
        component: App, // 顶层路由，对应index.html
        children: [
            {
                path: '',
                redirect: "home"
            },
            // 首页城市列表页面
            {
                path: "home",
                component: home
            },
            // 城市
            {
                path: "city/:cityid",
                component: city
            },
            // 商品页
            {
                path: "msite",
                component: msite
            }
        ]
    }
]

export default routes