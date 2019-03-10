/**
 * 配置编译环境和线上环境的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式 "hash" | "history"
 * imgBaseUrl: 图片所在的域名地址
 */

let baseUrl = "https://elm.cangdu.org"
let routerMode = "hash"
let imgBaseUrl = ""

if (process.env.NODE_ENV === "development") {
    imgBaseUrl = "/img/"
} else {
    baseUrl = "//ele.cangdu.org"
    imgBaseUrl = "//ele/cangdu.org/img"
}


export {
    baseUrl,
    routerMode,
    imgBaseUrl
}