import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* 布局 */
import Layout from '@/layout'

/**
 * 路由模块
 */
import componentsRouter from './modules/components'

/**
 * 注意： 子菜单只有当 route 的children.length>=1 才会出现
 * https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * 路由属性说明
 *
 * hidden: true                     如果设置为true，则该路由不会在侧边栏展示,默认是false
 * alwaysShow: true                 如果设置为true，将总是展示在根菜单
 *                                  如果不设置alwaysShow属性，当前项的子路由超过1个，将变成嵌套路由，否则不展示根菜单
 *
 * redirect: noRedirect             如果设置redirect属性，在面包屑导航中，不会进行重定向
 * name: 'route-name'               路由的name，被用在keep-alive组件中，路由配置必须设置name属性
 * meta: {
 *    roles: ['admin', "editor"],   控制页面权限
 *    title: "title",               title属性会被用在侧边栏菜单和面包屑中，必须设置
 *    icon: 'svg-name',             左侧菜单的图标
 *    noCache: true,                如果设置为true，则表示当前页面不会被缓存，默认是false
 *    affix: true,                  如果设置为true，则点击当前的菜单，菜单名称会被附加在tag-view组件上展示
 *    breacrumb: false,             如果设置为false，将隐藏面包屑导航，默认是true，展示面包屑
 *    activeMenu: '/example/list'   设置路径，左侧菜单会有高亮效果
 * }
 */

/**
 * 所有用户都能访问的页面
 */
export const constantRouts = [
  /* {
    path: '/redirect',
    hidden: false
  }, */
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: false
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 当路由过多，可适当进行拆分
  componentsRouter
]

/**
 * 异步路由:这里的路由根据用户角色动态加载
 */
export const asyncRoutes = [

]

const createRouter = () => new Router({
  // mode: 'history' 这种需要对服务端进行配置
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouts
})

const router = createRouter()

/*
  重置路由
  https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
*/
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
