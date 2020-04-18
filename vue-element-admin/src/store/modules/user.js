// 包含用户的信息, 登录等
import { login, logout, getInfo } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import router, { resetRouter } from '../../router'

const state = {
  // 从cookie中拿到token，并存储到vuex中,在登录的时候，就会种下cookie
  // src/store/modules/user/login异步中
  token: getToken(),
  name: '',
  // 头像
  avatar: '',
  // 简介
  introduction: '',
  // 角色列表
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME (state, name) {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录
  login ({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      // 调用接口，获取token
      login({ username: username.trim(), password: password })
        .then(response => {
          const { data } = response
          // 登录接口会获取到后台生成的token, 更新vuex中的token，后面需要鉴权的都会用到
          commit('SET_TOKEN', data.token)
          // 将token存储到cookie中, 防止页面刷新，vuex中的数据丢失问题
          setToken(data.token)

          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },

  // 获取用户信息，调用这个接口，vuex中一定是存在token的，所以需要使用state去访问vuex中的token，作为接口参数
  // 因为获取用户信息是异步的，所以是store.dispatch('user/getInfo') 派发异步的action
  // 异步的action获取到用户信息以后，再使用同步的commit去提交mutation
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 调用接口，这里token一定是存在的
      getInfo(state.token)
        .then(response => {
          const { data } = response

          if (!data) {
            reject('验证失败,请重新登录')
          }

          const { avatar, introduction, name, role } = data
          if (!role || role.length <= 0) {
            reject('getInfo: 角色权限必须是一个数组')
          }

          // 更新vuex中的store
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_INTRODUCTION', introduction)
          commit('SET_ROLES', role)

          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 退出
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // 调用接口
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])

        // 重置之前浏览过的内容
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])

      // 从cookie中清除token
      removeToken()

      resolve()
    })
  },

  // 动态修改权限
  changeRoles ({ commit, dispatch }, role) {
    return new Promise(resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { role } = dispatch('getInfo')

      resetRouter()

      // 根据角色，生成可以访问的路由表
      const accessRoutes = dispatch('permission/generateRoutes', role, { root: true })

      // 使用vuex提供的接口，动态添加路由表
      router.addRoutes(accessRoutes)

      // 重置浏览过的视图和缓存标签
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
