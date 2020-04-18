import { asyncRoutes, constantRouts } from '../../router'

/**
 * 判断当前用户是否有权限，根据meta.role判断
 * @param roles 所有的路由
 * @param route 当前路由
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.include(role))
  } else {
    return true
  }
}

/**
 * 根据角色，决定返回多少用户可以访问路由
 * @param routes 所有动态加载的路由表
 * @param role 用户的角色
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(routes, route)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

// 权限中需要共享的状态
const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES (state, routes) {
    state.addRoutes = routes
    // 基本路由，所有用户都可以访问，拼接上根据角色动态筛选的路由
    state.routes = constantRouts.concat(routes)
  }
}

// 在接口请求，拿到角色以后，我们需要分配用户可以访问的路由，就需要dispatch派发action更改路由
const actions = {
  // 生成路由表,然后更新vuex中的用户可以访问routes
  // roles是从 permission.js中通过获取角色信息的接口，拿到权限的
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      // 此时我们就有了用户访问的路由，那么左侧的就有数据了
      commit('SET_ROUTES', accessedRoutes)
      // 将拼接好的路由都返回回去
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
