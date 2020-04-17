const state = {
  // 已经浏览过的历史记录
  visitedViews: [],
  cachedViews: []
}

// 下面的更新视图的mutation和action以及包含promise的都没看懂

const mutations = {
  // 新增已浏览视图
  ADD_VISITED_VIEWS: (state, view) => {
    // 已经浏览过的视图中，存在
    if (state.visitedViews.some(v => v.path === view.path)) return

    state.visitedViews.push(
      Object.assign({}, view, {
        // 给视图添加标签
        title: view.meta.title || 'none-name'
      })
    )
  },
  // 添加缓存页面
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return

    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },

  // 删除缓存视图
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.split(index, 1)
  },

  // 一键清空所有浏览过的页面
  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = []
  },

  // 清空所有的缓存页面
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },

  // 更新浏览过的页面
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },

  // 删除其他的标签页
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  // 删除其他的缓存页面
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name)

    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // 如果index = -1 表示没有缓存tag页面
      state.cachedViews = []
    }
  }
}

const actions = {
  addView ({ dispath }, view) {
    dispath('addVisitedView', view)
    dispath('addCachedView', view)
  },
  addVisitedView ({ commit }, view) {
    commit('ADD_VISITED_VIEWS', view)
  },
  addCachedView ({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  delView ({ dispatch, commit }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)

      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)

      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERSVISITEDVIEWS', view)

      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)

      resolve([...state.cachedViews])
    })
  },
  delAllViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)

      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView ({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
