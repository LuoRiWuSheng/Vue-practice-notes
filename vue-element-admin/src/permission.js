import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 从cookie中获取token
import { getToken } from './utils/auth'
import getPageTitle from './utils/get-page-title'
import chalk from 'chalk'
const log = console.log

// 禁用进度环
NProgress.configure({ showSpinner: false })

// 白名单
const whiteList = ['/login', '/auth-redirect']

// 全局解析守卫--在beforeEach之前
router.beforeResolve((to, from, next) => {
  log('beforeResolve--全局解析守卫')
  next()
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  log('to-->', to)
  log('from-->', from)
  log('beforeEach--全局前置守卫')

  // 开启进度条
  NProgress.start()

  // 设置页面标题，此时已经知道我们要进入的是哪一个路由, 这里的标题是根据路由表的约定来的，也可以是其他属性名
  document.title = getPageTitle(to.meta.title)

  // 从cookie中获取token,判断用户是否登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果是已经登录过的，但是当前手动跳转到login路由的，则应该重定向到首页
      log(chalk.red('已经登录过,重定向到首页'))
      next({ path: '/' })

      // 停止进度条
      NProgress.stop()
    } else {
      // 从vuex中获取角色列表，从而知道它有没有用户信息
      const hasRoles = store.getters.roles && store.getters.roles.length > 0

      if (hasRoles) {
        // 有权限，有角色（说明已经调用过getInfo接口，getToken接口），直接让其通过，进入下一个路由
        next()
      } else {
        try {
          // 获取用户信息， 之前登录的时候，已经获取到token,存储到vuex和cookie中，存储到cookie中是防止刷新，vuex数据丢失问题
          // 获取用户信息是异步的，调用接口，所以要派发action
          const { role } = await store.dispatch('user/getInfo')

          // 根据角色遍历路由表，生成可访问的路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', role)

          // 动态添加路由表--vue-router API
          // https://router.vuejs.org/zh/api/#router-addroutes
          router.addRoutes(accessRoutes)

          // 这里设置为true，是希望路由在跳转以后，不会留下历史记录，那么用户就不能通过前进后退触发额外的问题
          // 这里的next传参，实际是 router-link传参一样的
          // https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB
          next({ ...to, replace: true })
        } catch (error) {
          // 获取用户信息失败，报错，重置token，可能是token过期，因为在request.js中封装的API是 状态不是 20000 就抛异常，这里则会被捕获
          await store.dispatch('user/resetToken')
          Message.error(error || '发生错误')

          // 这里记录我们即将去的path，是为了在重定向到login页面以后，获取新的token，直接跳到to.path， 而不是从首页开始进
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token的情况

    // 判断是不是在不需要用户登录的白名单路由
    if (whiteList.indexOf(to.path) !== -1) {
      // 免登录，直接跳转
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  log(chalk('router.agerEach导航---'))
  // 结束进度条
  NProgress.done()
})
